import React from "react";

import "./TextBubble.css";
import PersonIcon from "@mui/icons-material/Person";
import { chatbotMain } from "../assets";

const TextBubble = ({ text, isUser }) => {
  let box = isUser ? (
    <div className="message-container user">
      <div className="message user-message">{text}</div>
      <div className="icon-container user">
        <PersonIcon
          className="icon"
          style={{ color: "white", fontSize: "1.6rem" }}
        />
      </div>
    </div>
  ) : (
    <div className="message-container bot">
      <div className="icon-container bot">
        <img src={chatbotMain} alt="bot-icon" className="icon" />
      </div>
      <div className="message bot-message">{text}</div>
    </div>
  );

  return box;
};

export default TextBubble;
