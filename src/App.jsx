import { Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MarketFeed from "./pages/MarketFeed";
import Home from "./pages/home";
import Menu from "./pages/menu";
import About from "./pages/about";
import Header from "./components/Header";
import UserProfileEdit from "./pages/UserProfileEdit";
import SignIn from "./pages/SignIn";
import Signup from "./pages/signup";
import PostProduct from "./pages/PostProduct";
import SavedItems from "./pages/SavedItems";
import SellerDashboard from "./pages/dashboard";

function App() {
  return (
    <>
      <nav
        style={{
          padding: "1rem",
          backgroundColor: "#f3f3f3",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/signin">Sign in</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/post-product">Post Product</Link>
        <Link to="/saved-items">Saved Items</Link>
        <Link to="/seller-dashboard">Seller Dashboard</Link>
      </nav>
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
        <Route path="/saved-items" element={<SavedItems />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
