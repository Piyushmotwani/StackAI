import React, { useEffect, useRef } from "react";

import "./ChatAI.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { ChatAiInput } from "../../components/ChatAI/ChatAiInput";
import { ChatViewer } from "../../components/ChatAI/ChatViewer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const ChatAI = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prop1 = queryParams.get("prop1");

  const currentUser = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const isNavigate = useRef(false);

  useEffect(() => {
    if (!prop1) {
      isNavigate.current = true;
      navigate("/auth");
      alert("login to access Chat AI");
    }
  }, [navigate, currentUser]);

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <h1>Chat AI</h1>
        <div className="chat-container">
          <div className="chat-message-container">
            <ChatViewer />
          </div>
          <ChatAiInput />
        </div>
      </div>
    </div>
  );
};
