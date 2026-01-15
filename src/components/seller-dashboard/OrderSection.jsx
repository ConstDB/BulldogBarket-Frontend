import React, { useState } from "react";
import { FaUser, FaBox } from "react-icons/fa";

// Import the CSS (Make sure this file exists from the previous step)
import "../../styles/SellerDashboard/OrderSection.css";
import {
  useApprovePendingOffer,
  useGetSellerPendingOffer,
  useRejectPendingOffer,
} from "@/hooks/useOfferApi";
import {
  useGetSellerPendingOrder,
  useMarkOrderAsComplete,
  useSellerCancelOrder,
} from "@/hooks/useOrderApi";

export default function OrderSection() {
  const { data: orders = [] } = useGetSellerPendingOrder();
  const { data: offers = [] } = useGetSellerPendingOffer();

  const { mutate: accept } = useApprovePendingOffer();
  const { mutate: reject } = useRejectPendingOffer();
  const { mutate: complete } = useMarkOrderAsComplete();
  const { mutate: cancel } = useSellerCancelOrder();

  const handleCancelOrder = (orderId) => {
    cancel(
      {
        orderId: orderId,
        cancelReason: "Buyer didn't show up to the meetup place.",
      },
      {
        onSuccess: () => {
          console.log("Cancelling order is successful");
        },
        onError: (err) => {
          console.error(`Unexpected Error ${err}`);
        },
      }
    );
  };
  const handleOrderComplete = (orderId) => {
    complete(orderId, {
      onSuccess: () => {
        console.log("Marking order as complete is successful");
      },
      onError: (err) => {
        console.error(`Unexpected Error: ${err}`);
      },
    });
  };
  const handleApproveOffer = (offerId) => {
    accept(offerId, {
      onSuccess: () => {
        console.log("Approving offer is successful");
      },
      onError: (err) => {
        console.error(`Unexpected Error: ${err}`);
      },
    });
  };

  const handleRejectOffer = (offerId) => {
    reject(offerId, {
      onSuccess: () => {
        console.log("Rejecting offer is Successful");
      },
      onError: (err) => {
        console.error(`Unexpected Error ${err}`);
      },
    });
  };
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
          <div key={req?.id} className="order-row">
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
              <button
                className="btn btn-reject"
                onClick={() => handleRejectOffer(req?.id)}
              >
                Reject
              </button>
              <button
                className="btn btn-accept"
                onClick={() => handleApproveOffer(req?.id)}
              >
                Accept Deal
              </button>
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
              <span
                className="no-show-text"
                onClick={() => handleCancelOrder(order?.id)}
              >
                Buyer No-Show
              </span>
              <button
                className="btn border-none bg-green-600 text-white"
                onClick={() => handleOrderComplete(order?.id)}
              >
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
