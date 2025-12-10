import { useState, useEffect } from "react";
import FilterButton from "../components/MarketFeed/FilterButton";
import QuickPost from "../components/MarketFeed/QuickPost";
import SingleItemPost from "../components/MarketFeed/SingleItemPost";
import MultipleItemPost from "../components/MarketFeed/MultipleItemPost";

const API_BASE = "http://127.0.0.1:3000/api/v1";

export default function MarketFeed() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchListings(1, true);
  }, []);

  // fetchListings: pageNum - which page to fetch, replace - whether to replace current posts
  async function fetchListings(pageNum = 1, replace = false) {
    setLoading(true);
    setError(null);

    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzMwY2QxOWYxZGUyMTNmNzg4NDgzZiIsImlhdCI6MTc2NTI4Mjk2MCwiZXhwIjoxNzY1NTQyMTYwfQ.LR37muTT28TWNsIhMsweZlZ-H4KPco50LM77JPgH-fE";
      const sort = "recent"; // backend supports recent|popular
      const limit = 20;
      const url = `${API_BASE}/listings?page=${pageNum}&limit=${limit}&sort=${sort}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || "Fetch failed, fix your backend or your query.");
      }

      const data = await res.json();
      const listings = Array.isArray(data) ? data : [];

      // backend may return less than limit when no more items
      setHasMore(listings.length === limit);

      setPosts((prev) => (replace ? listings : [...prev, ...listings]));
    } catch (err) {
      setError(err?.message || "Failed to load posts");
      if (replace) setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        marginTop: "212px",
      }}
    >
      <QuickPost />

      <FilterButton active={activeFilter} onChange={setActiveFilter} />

      {error && (
        <div style={{ color: "#DC2626", fontSize: 14, marginTop: 16 }}>
          {error}
        </div>
      )}

      {loading && (
        <div style={{ color: "#64748B", fontSize: 14, marginTop: 16 }}>
          Loading posts...
        </div>
      )}

      {!loading && posts.length === 0 && !error && (
        <div style={{ color: "#64748B", fontSize: 14, marginTop: 16 }}>
          No posts found
        </div>
      )}

      {posts.map((post) => {

        const postType = post.type || "single";

        return postType === "bulk" ? (
          <MultipleItemPost key={post._id} post={post} />
        ) : (
          <SingleItemPost key={post._id} post={post} />
        );
      })}
    </div>
  );
}
