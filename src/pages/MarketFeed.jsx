import { useState } from "react";
import FilterButton from "../components/MarketFeed/FilterButton";
import QuickPost from "../components/MarketFeed/QuickPost";
import SingleItemPost from "../components/MarketFeed/SingleItemPost";
import MultipleItemPost from "../components/MarketFeed/MultipleItemPost";

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

      {activeFilter === "food" && <MultipleItemPost />}
    </div>
  );
}
