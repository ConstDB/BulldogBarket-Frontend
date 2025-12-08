import { useState, useEffect } from "react";
import FilterButton from "../components/MarketFeed/FilterButton";
import QuickPost from "../components/MarketFeed/QuickPost";
import SingleItemPost from "../components/MarketFeed/SingleItemPost";
import MultipleItemPost from "../components/MarketFeed/MultipleItemPost";

export default function MarketFeed() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts(activeFilter);
  }, [activeFilter]);

  async function fetchPosts(filter) {
    setLoading(true);
    setError(null);

    try {
      const url = filter === "all" 
        ? "/api/products" 
        : `/api/products?category=${filter}`;

      const res = await fetch(url);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed to fetch: ${res.status}`);
      }

      const data = await res.json();
      // Assume backend returns { products: [...] } or just [...]
      setPosts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      setError(err?.message || "Failed to load posts");
      setPosts([]);
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
        // Determine type from post data (assume backend includes 'category' or 'type')
        const postType = post.category || post.type || "market";

        return postType === "market" ? (
          <SingleItemPost key={post.id} post={post} />
        ) : (
          <MultipleItemPost key={post.id} post={post} />
        );
      })}
    </div>
  );
}
