import { useFetchDashboardSummary } from "@/hooks/useFetchDashboardSummary";
import "../../styles/SellerDashboard/SellerStats.css";

export default function SellerStats() {
  const { data, isPending } = useFetchDashboardSummary();

  if (isPending) {
    return <div>...Loading</div>;
  }

  const { totalEarnings, itemsSold, toMeetup, rating } = data;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-label">TOTAL EARNINGS</div>
        <div className="stat-value">₱ {totalEarnings}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">ITEMS SOLD</div>
        <div className="stat-value">{itemsSold}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">TO MEETUP</div>
        <div className="stat-value">{toMeetup}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">RATING</div>
        <div className="stat-value">{rating}</div>
      </div>
    </div>
  );
}
