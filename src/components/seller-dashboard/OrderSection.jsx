import React, { useState } from "react";
import { FaUser, FaBox } from "react-icons/fa";

// Import the CSS (Make sure this file exists from the previous step)
import "../../styles/SellerDashboard/OrderSection.css";
import { useGetSellerPendingOffer } from "@/hooks/useOfferApi";
import { useGetSellerPendingOrder } from "@/hooks/useOrderApi";

export default function OrderSection() {
  // --- MOCK DATA: TO MEETUP / SHIP ---
  const [meetups, setMeetups] = useState([
    {
      id: 7173,
      orderId: "Order #7173",
      items: "2x Graham Balls • ₱100",
      buyerInfo: "Buyer: Danfred Martin • GCash Paid",
      avatarColor: "#F59E0B",
      initials: "DM",
    },
    {
      id: 193,
      orderId: "Order #193",
      items: "2x Graham Balls • ₱100",
      buyerInfo: "Buyer: Nonie Andrew • Cash on Meetup",
      avatarColor: "#EC4899",
      initials: "NA",
    },
  ]);

  const { data: orders = [] } = useGetSellerPendingOrder();
  const { data: offers = [] } = useGetSellerPendingOffer();

  return (
    <div className="orders-container">
      <div className="order-card">
        <div className="order-header blue">
          <div className="flex items-center font-bold gap-2">
            <FaUser /> Requests (Approval Needed)
          </div>
          <div className="header-badge blue">{offers.length}</div>
        </div>

        {offers.map((req) => (
          <div key={req?._id} className="order-row">
            <div className="user-group">
              <div className="w-11">
                <img
                  src={req?.buyer?.avatarUrl}
                  className="rounded-full border"
                />
              </div>
              <div className="text-group">
                <div className="text-sm font-bold">{req?.buyer?.name}</div>
                <div className="w-80 text-xs text-neutral-500">
                  Wants:{" "}
                  <span className="text-black font-bold">
                    {req?.listing?.name}
                  </span>
                  <br />
                  <span>Note: </span>
                  <span className="wrap-break-word">{req?.buyerNote}</span>
                </div>
              </div>
            </div>

            <div className="action-group">
              <button className="btn btn-reject">Reject</button>
              <button className="btn btn-accept">Accept Deal</button>
            </div>
          </div>
        ))}

        {offers.length === 0 && (
          <div
            style={{ padding: "24px", color: "#6B7280", fontStyle: "italic" }}
          >
            No pending requests.
          </div>
        )}
      </div>

      <div className="order-card">
        <div className="order-header green">
          <div className="flex items-center font-bold gap-2">
            <FaBox /> To Meetup / Ship
          </div>
          <div className="header-badge bg-green-600">{orders.length}</div>
        </div>

        {orders.map((order) => (
          <div key={order?.id} className="order-row">
            <div className="user-group">
              <div className="user-avatar">
                <img
                  src={order?.buyer?.avatarUrl}
                  className="w-11 rounded-full"
                />
              </div>
              <div className="text-group">
                <div className="text-sm font-bold">
                  Order #{order?.id.slice(-4).toUpperCase()}
                </div>
                <div className="flex gap-1.5 items-center text-xs text-neutral-500">
                  <span>{order?.quantity}X</span>
                  <span>{order?.listing?.name}</span>
                  <span className="text-sm">•</span>
                  <span>₱{order?.totalPrice}</span>
                  <br />
                </div>
                <div className="flex gap-1.5 items-center text-[10px] text-[#9CA3AF]">
                  <span>Buyer:</span>
                  <span>{order?.buyer?.name}</span>
                  <span className="text-sm">•</span>
                  <span>{order?.paymentMethod}</span>
                </div>
              </div>
            </div>

            <div className="action-group">
              <span className="no-show-text">Buyer No-Show</span>
              <button className="btn border-none bg-green-600 text-white">
                Mark Completed
              </button>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div
            style={{ padding: "24px", color: "#6B7280", fontStyle: "italic" }}
          >
            No pending meetups.
          </div>
        )}
      </div>
    </div>
  );
}
