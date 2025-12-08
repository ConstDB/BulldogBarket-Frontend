import React from "react";
import SigninHeroPanel from "../components/Sign-In/SigninHeroPanel"; 
import SigninForm from "../components/Sign-In/SigninForm";

export default function SignIn() {
  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F3F4F6", 
      fontFamily: "'Inter', sans-serif",
      padding: "20px",
    },
    card: {
      display: "flex",
      width: "1440px",
      height: "524px",
      backgroundColor: "#FFFFFF",
      borderRadius: "16px",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <SigninHeroPanel />
        <SigninForm />
      </div>
    </div>
  );
}
