import "./SignIn.css";
import SigninHeroPanel from "../../components/Sign-In/SigninHeroPanel";
import SigninForm from "../../components/Sign-In/SigninForm";

export default function SignIn() {
  return (
    <div className="signin-page">
      <div className="signin-card">
        <div className="hero-section">
          <SigninHeroPanel />
        </div>

        <div className="form-section">
          <SigninForm />
        </div>

      </div>
    </div>
  );
}