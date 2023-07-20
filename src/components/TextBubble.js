import React from "react";

import "./TextBubble.css";

const TextBubble = ({ text, isUser }) => {
  return (
    <div className={`message ${isUser ? "user" : "bot"}-message`}>{text}</div>
  );
};

export default TextBubble;
