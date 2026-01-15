import { useState, useEffect } from "react";
import FilterButton from "../components/MarketFeed/FilterButton";
import QuickPost from "../components/MarketFeed/QuickPost";
import SingleItemPost from "../components/MarketFeed/SingleItemPost";
import MultipleItemPost from "../components/MarketFeed/MultipleItemPost";
import Header from "@/components/Header";

const API_BASE = import.meta.env.VITE_API_URL;

export default function MarketFeed() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchListings(1, true);
  }, []);

 
  async function fetchListings(pageNum = 1, replace = false) {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const sort = "recent";
      const limit = 20;
      const url = `${API_BASE}/api/v1/listings?page=${pageNum}&limit=${limit}&sort=${sort}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(
          text || "Fetch failed, fix your backend or your query."
        );
      }

      const data = await res.json();

      setPosts(data);
    } catch (err) {
      setError(err?.message || "Failed to load posts");
      if (replace) setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="w-fit flex self-center flex-col items-center gap-5 mt-[78px] relative">
        <QuickPost />
        <FilterButton active={activeFilter} onChange={setActiveFilter} />

        {error && <div className="text-red-500">{error}</div>}

        {loading && <div className="text-blue-400 mt-4">Loading posts...</div>}
        {!loading && posts.length === 0 && !error && (
          <div className="text-blue-400 mt-4">No posts found</div>
        )}

        {posts.length !== 0 &&
          posts.map((post) => {
            const postType = post.type || "single";

            return postType === "bulk" ? (
              <MultipleItemPost key={post._id} post={post} />
            ) : (
              <SingleItemPost key={post._id} post={post} />
            );
          })}
      </div>
    </div>
  );
}