import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Menu from "./pages/menu";
import About from "./pages/about";
import Signup from "./pages/signup";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <nav style={{ padding: "1rem", backgroundColor: "#f3f3f3", display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/signin">Sign in</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
