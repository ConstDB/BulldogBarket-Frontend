import { useState } from "react";
import FilterButton from "../components/MarketFeed/FilterButton";
import QuickPost from "../components/MarketFeed/QuickPost";
import SingleItemPost from "../components/MarketFeed/SingleItemPost";
import MultipleItemPost from "../components/MarketFeed/MultipleItemPost";

export default function MarketFeed() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock posts list
  const posts = [
    { type: "market", id: 1 },
    { type: "market", id: 2 },
    { type: "food", id: 3 },
    { type: "food", id: 4 },
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px", // spacing between posts
        marginTop: "212px", // start posts from top 270px
      }}
    >
      <QuickPost />

      <FilterButton active={activeFilter} onChange={setActiveFilter} />

      {posts.map((post) => {
        // Show all posts if 'all' filter is active
        if (activeFilter === "all") {
          return post.type === "market" ? (
            <SingleItemPost key={post.id} />
          ) : (
            <MultipleItemPost key={post.id} />
          );
        }

        // Show only the filtered type
        if (activeFilter === post.type) {
          return post.type === "market" ? (
            <SingleItemPost key={post.id} />
          ) : (
            <MultipleItemPost key={post.id} />
          );
        }

        return null;
      })}
    </div>
  );
}
