import { Routes, Route, Link } from "react-router-dom";

import MarketFeed from "./pages/MarketFeed";
import Home from "./pages/home";
import Menu from "./pages/menu";
import About from "./pages/about";
import Header from "./components/Header";
import UserProfileEdit from "./pages/UserProfileEdit";
import SignIn from "./pages/Signin";
import Signup from "./pages/signup";
import PostProduct from "./pages/PostProduct";
import SellerDashboard from "./pages/dashboard"; 



function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/marketfeed" element={<MarketFeed />} />
          <Route path="/profile" element={<UserProfileEdit />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post-product" element={<PostProduct />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
    </>
  );
}

export default App;