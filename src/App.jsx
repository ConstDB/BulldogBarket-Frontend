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
import SellerDashboard from "./pages/dashboard"; 


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;