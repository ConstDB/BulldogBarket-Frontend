import { useState } from "react";
import FilterButton from "../components/FilterButton";
import QuickPost from "../components/QuickPost";
import SingleItemPost from "../components/SingleItemPost";

export default function MarketFeed() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >

      <QuickPost />

      <FilterButton active={activeFilter} onChange={setActiveFilter} />

      {activeFilter === "market" && <SingleItemPost />}

      {activeFilter === "all" && <SingleItemPost />}

      {activeFilter === "food" && <p>Showing food court posts...</p>}
    </div>
  );
}
