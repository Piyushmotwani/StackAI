import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./OTP.css";

const OTPVerification = () => {
    const currentUser = useSelector((state) => state.currentUserReducer)?.result;
  const emailId = currentUser.email;
  const url = `/api/generate-otp?emailId=${encodeURIComponent(emailId)}`;
  const [otp, setOTP] = useState("");
  const [isOTPGenerated, setIsOTPGenerated] = useState(false);
  const handleGetOTP = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        
        const data = await response.json();
        setIsOTPGenerated(true);
        setOTP(data.otp);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching OTP:", error);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    // Perform input validation if required

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        const queryParams = new URLSearchParams();
        queryParams.append("prop1", "ok"); // Add your desired props as query parameters
        const queryString = queryParams.toString();

        window.location.href = `/ChatAiVerified?${queryString}`; // Redirect to the Chat Page with query parameters
        console.log("OTP verification successful");
      } else {
        // OTP verification failed, handle the error
        // You can show an error message or perform any other actions here
        alert("OTP Toh sahi daal bhai kya kar raha hai")
        console.log("OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="otp-verification-container">
      <h2>OTP Verification</h2>
      {!isOTPGenerated ? (
        <button className="otp-btn get-otp-btn" onClick={handleGetOTP}>
          Get OTP
        </button>
      ) : (
        <form className="otp-form" onSubmit={handleVerifyOTP}>
          <input
            type="text"
            className="otp-input"
            onChange={(e) => setOTP(e.target.value)}
            placeholder="Enter OTP"
          />
          <button type="submit" className="otp-btn verify-btn">
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default OTPVerification;
