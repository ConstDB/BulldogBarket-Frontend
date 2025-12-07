import React from "react";
import BarkKartPanel from "../components/signup/barkkart_panel";
import SignupForm from "../components/signup/signup_form";
import "../styles/signup/signup.css";

export default function Signup() {
  return (
    <div className="signup-page-container">
      <div className="signup-card">
        <BarkKartPanel />
        <SignupForm />
      </div>
    </div>
  );
}
