import React from 'react';

import "./Header.css";
import { chatbotMain } from "../assets";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const Header = () => {
  return (
          <div className="chatbox__header">
            <div className="chatbox__image--header">
            <img src={chatbotMain} alt="chatbot-icon" className="chatbot-icon" />
            </div>
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">Chatbot</h4>
            </div>
          </div>
  );
};



export default Header;