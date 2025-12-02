import "../styles/FilterButton.css";

export default function FilterButtons({ active, onChange }) {
  const buttons = [
    { label: "All Posts", value: "all" },
    { label: "General Market", value: "market" },
    { label: "Food Court", value: "food" }
  ];

  return (
    <div className="filter-buttons-container">
      {buttons.map((btn) => (
        <button
          key={btn.value}
          className={`filter-button ${active === btn.value ? "active" : ""}`}
          onClick={() => onChange(btn.value)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
