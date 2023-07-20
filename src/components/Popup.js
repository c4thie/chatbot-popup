import React, { useState, useEffect } from "react";
import { send } from "../assets";
import "./Popup.css";
import Header from "./Header"; // Import the Header component

const localBackendURL = "http://127.0.0.1:5001";
const remoteBackendURL = "http://192.168.1.129:5001";

let url;

if (process.env.NODE_ENV === "development") {
  url = localBackendURL;
} else {
  url = remoteBackendURL;
}

const Popup = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [active, setActive] = useState(false);
  let userId = Math.random(10);

  useEffect(() => {
    initializeChat(userId);
    setActive((prevState) => !prevState);
    console.log("Chatbot initiated.");
  }, []);

  async function initializeChat(userId) {
    try {
      await fetch(`${url}/initialize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });

      return "Chat session initialized successfully";
    } catch (error) {
      console.error("Error initializing chat session:", error);
      return "Sorry, there was an error initializing the chat session.";
    }
  }

  // Function to send the user's message and receive the chatbot's response
  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    console.log(inputText);

    const requestedData = {
      message: inputText,
      user_id: userId,
    };

    // Make an API call to backend server to get the AI chatbot response
    try {
      const response = await fetch(`${url}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      setMessages([...messages, { text: inputText, isUserMessage: true }]);
      setMessages([...messages, { text: data.answer, isUserMessage: false }]);
      setInputText("");

      console.log("sent", data.answer);
    } catch (error) {
      console.error("Error fetching chatbot response", error);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Header */}
      <Header />

      {/* Chat messages */}
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.isUserMessage ? "user-message" : "bot-message"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={sendMessage}>
          <img src={send} alt="send" onClick={sendMessage} />
        </button>
      </div>
    </div>
  );
};

export default Popup;
