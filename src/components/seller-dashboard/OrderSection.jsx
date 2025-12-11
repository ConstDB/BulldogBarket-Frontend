import React, { useState } from "react";
import { FaUser, FaBox } from "react-icons/fa";

// Import the CSS (Make sure this file exists from the previous step)
import "../../styles/SellerDashboard/OrderSection.css";

export default function OrderSection() {
  // --- MOCK DATA: REQUESTS ---
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Edrich Darren Santuyo",
      item: "PE Uniform",
      meetupDetails: "Meetup: Garden, 2pm today",
      avatarColor: "#8B5CF6", // Purple
      initials: "ES",
    },
    
  ]);

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

  return (
    <div className="orders-container">
      
      <div className="order-card">
        <div className="order-header blue">
          <div className="header-title">
            <FaUser /> Requests (Approval Needed)
          </div>
          <div className="header-badge blue">{requests.length}</div>
        </div>

        {requests.map((req) => (
          <div key={req.id} className="order-row">
            <div className="user-group">
              <div className="user-avatar" style={{ backgroundColor: req.avatarColor }}>
                {req.initials}
              </div>
              <div className="text-group">
                <div className="main-text">{req.name}</div>
                <div className="sub-text">
                  Wants: <span className="highlight-bold">{req.item}</span>
                  <br />
                  {req.meetupDetails}
                </div>
              </div>
            </div>

            <div className="action-group">
              <button className="btn btn-reject">Reject</button>
              <button className="btn btn-accept">Accept Deal</button>
            </div>
          </div>
        ))}
        
        {requests.length === 0 && (
          <div style={{ padding: "24px", color: "#6B7280", fontStyle: "italic" }}>
            No pending requests.
          </div>
        )}
      </div>

      <div className="order-card">
        <div className="order-header green">
          <div className="header-title">
            <FaBox /> To Meetup / Ship
          </div>
          <div className="header-badge green">{meetups.length}</div>
        </div>

        {meetups.map((order) => (
          <div key={order.id} className="order-row">
            <div className="user-group">
              <div className="user-avatar" style={{ backgroundColor: order.avatarColor }}>
                {order.initials}
              </div>
              <div className="text-group">
                <div className="main-text">{order.orderId}</div>
                <div className="sub-text">
                  {order.items}
                  <br />
                  {order.buyerInfo}
                </div>
              </div>
            </div>

            <div className="action-group">
              <span className="no-show-text">Buyer No-Show</span>
              <button className="btn btn-delivered">Mark Delivered</button>
            </div>
          </div>
        ))}

        {meetups.length === 0 && (
          <div style={{ padding: "24px", color: "#6B7280", fontStyle: "italic" }}>
            No pending meetups.
          </div>
        )}
      </div>
    </div>
  );
}