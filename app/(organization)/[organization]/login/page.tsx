"use client";

import { useState } from "react";
import { LoginForm, OTPVerificationForm } from "@/components/auth";

const OrgLoginPage = () => {
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  const handleLoginSuccess = () => {
    setShowOTPVerification(true);
  };

  const handleOTPVerificationSuccess = () => {
    // Here you would typically redirect to the main app or dashboard
    console.log("OTP verified successfully. Redirect to dashboard.");
  };

  return (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
      {showOTPVerification && (
        <OTPVerificationForm
          onVerificationSuccess={handleOTPVerificationSuccess}
        />
      )}
    </div>
  );
};

export default OrgLoginPage;
