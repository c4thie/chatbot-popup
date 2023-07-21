import React, { useState } from "react";

import "./Chatbutton.css";

import { chatbotMain } from "../assets";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Renders main button: chatbot icon when collapsed and arrow when expanded
const Chatbutton = ({ onClick, isToggled }) => {
  return (
    <button onClick={onClick} className="chatbot">
      {isToggled && (
        <ExpandMoreIcon
          className="chatbot-icon rotate-right-in"
          style={{ marginTop: "4px", fontSize: "2rem" }}
        />
      )}
      {!isToggled && (
        <img src={chatbotMain} alt="chatbot-icon" className="chatbot-icon" />
      )}
    </button>
  );
};

export default Chatbutton;
