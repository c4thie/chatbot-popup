import React from 'react';

import "./TextBubble.css";

const TextBubble = ({ text, isUser }) => {
  return (
    <div className={`text-bubble ${isUser ? 'user' : 'chatbot'}`}>
      {text}
    </div>
  );
};

export default TextBubble;
