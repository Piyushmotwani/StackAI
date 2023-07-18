import React from "react";
import Auth from "./Pages/Auth/Auth";
import { Routes, Route } from "react-router-dom";
import Questions from "./Pages/Questions/Questions";
import Home from "./Pages/Home/Home";
import Tags from "./Pages/Tags/Tags";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Users from "./Pages/Users/Users";
import { ChatAI } from "./Pages/ChatAI/ChatAi";
import OTPVerification from "./Pages/OTP";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route path="/Questions" element={<Questions />} />
      <Route path="/Questions/:id" element={<DisplayQuestion />} />
      <Route path="/Tags" element={<Tags />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/Users/:id" element={<UserProfile />} />
      <Route path="/ChatAi" element={<OTPVerification />} />
      <Route path="/ChatAiVerified" element={<ChatAI />} />

    </Routes>
  );
};

export default AllRoutes;
