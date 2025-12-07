import { Routes, Route, Link } from "react-router-dom";
import MarketFeed from "./pages/MarketFeed";
import Menu from "./pages/menu";
import About from "./pages/about";
import Header from "./components/Header";
import UserProfileEdit from "./pages/UserProfileEdit";
import './index.css';


function App() {
  return (
    <>
      <Header /> 

      <Routes>
        <Route path="/marketfeed" element={<MarketFeed />} />
        <Route path="/profile" element={<UserProfileEdit />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
