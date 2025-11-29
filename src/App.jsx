import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/menu";
import About from "./pages/About";

function App() {
  return (
    <>
      <nav style={{ padding: "1rem", backgroundColor: "#f3f3f3", display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
      </nav>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
