import React, { useState, useEffect } from "react";
import { send } from "../assets";
import "./Popup.css";
import Header from "./Header"; // Import the Header component
import TextBubble from "./TextBubble";

const url = process.env.REACT_APP_SERVER_URL; // this is http://35.183.95.206
console.log(url);

// Make an API call to server to initialize chatbot
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
    throw error;
  }
}

const Popup = ({ isVisible }) => {
  // conversation array
  const [messages, setMessages] = useState([]);
  // current user input
  const [inputText, setInputText] = useState("");
  // chatbot status
  const [isActive, setIsActive] = useState(false);

  // mock user ID
  let userId = 1;

  useEffect(() => {
    initializeChat(userId)
      .then(() => {
        setIsActive(true);
        console.log("Chatbot initiated.");
      })
      .catch((error) => {
        setIsActive(false);
        console.error(error);
      });
  }, []);

  // Function to send the user's message and receive the chatbot's response
  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const requestedData = {
      message: inputText,
      user_id: userId,
    };

    // Make an API call to server to get the AI chatbot response
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
      setMessages([
        ...messages,
        { text: inputText, isUserMessage: true },
        { text: data.answer, isUserMessage: false },
      ]);

      console.log("conversation messages:", messages);
      console.log("chatbot response:", data.answer);
    } catch (error) {
      setIsActive(false);
      console.error("Error fetching chatbot response", error);
    }

    setInputText("");
  };

  // Sends message during key down event
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={`chatbot-container ${isVisible ? "show" : "hidden"}`}>
      {/* Header */}
      <Header active={isActive} />

      {/* Chat messages */}
      <div className="chat-window">
        {messages.map((message, index) => (
          <TextBubble
            key={index}
            text={message.text}
            isUser={message.isUserMessage}
          >
            {message.text}
          </TextBubble>
        ))}
      </div>

      {/* Divider */}
      <hr />

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
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
