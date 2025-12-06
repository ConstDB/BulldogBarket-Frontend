import React from "react";
import BarkKartPanel from "../components/signup/barkkart_panel";
import SignupForm from "../components/signup/signup_form";

export default function SignUp() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#F9FAFB",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "70%",
          maxWidth: "1200px",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <BarkKartPanel />
        <SignupForm />
      </div>
    </div>
  );
}
