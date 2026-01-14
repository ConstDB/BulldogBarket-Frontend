import { useBuyerCancelOfferMutation } from "@/hooks/useBuyerCancelOfferMutation";
import {
  useCancelledBuyerOrdersQuery,
  useCompletedBuyerOrdersQuery,
  usePendingBuyerOrdersQuery,
} from "@/hooks/useFetchBuyerOrdersQuery";
import { useFetchBuyerPendingOffersQuery } from "@/hooks/useFetchBuyerPendingOffersQuery";
import { Package } from "lucide-react";
import { useState } from "react";
import "../styles/MyPurchases.css";

const API_BASE_URL = "http://127.0.0.1:3000/api/v1";

const StatusBadge = ({ type, status, paymentMethod }) => {
  const getClassName = () => {
    if (type === "completed") return "status-badge delivered";
    if (type === "cancelled") return "status-badge cancelled";
    if (type === "pending") {
      return paymentMethod === "Cash on Meetup" ? "status-badge waiting" : "status-badge waiting";
    }
    if (type === "toReceive") {
      return paymentMethod === "Cash on Meetup" ? "status-badge meetup" : "status-badge accepted";
    }
  };

  const getText = () => {
    if (type === "completed") return "DELIVERED • DEC 6";
    if (type === "cancelled") {
      return status === "cancelled_by_buyer" ? "CANCELLED BY YOU" : "CANCELLED";
    }
    if (type === "pending") return "WAITING APPROVAL";
    if (type === "toReceive") {
      return paymentMethod === "Cash on Meetup" ? "TO MEETUP" : "REQUEST ACCEPTED";
    }
  };

  return <span className={getClassName()}>{getText()}</span>;
};

// PurchaseCard Component
const PurchaseCard = ({
  order,
  type,
  onCancelOrder,
  onOrderReceived,
  onRateSeller,
  onViewDetails,
  onChat,
}) => {
  const { id, listing, quantity, totalPrice, status, paymentMethod } = order;

  const getCancelReason = () => {
    if (status === "cancelled_by_seller") {
      return <p className="cancel-reason">Reason: Seller declined request (Item unavailable)</p>;
    }
    if (status === "cancelled_by_buyer") {
      return <p className="cancel-reason">Reason: You cancelled the request</p>;
    }
    return null;
  };

  const getActions = () => {
    if (type === "completed") {
      return (
        <div className="card-actions">
          <button className="btn-secondary rate-seller" onClick={() => onRateSeller(id)}>
            Rate Seller
          </button>
          <button className="btn-tertiary" onClick={() => onViewDetails(id)}>
            View Details
          </button>
        </div>
      );
    }
    if (type === "cancelled") {
      return (
        <div className="card-actions">
          <button className="btn-tertiary" onClick={() => onViewDetails(id)}>
            View Details
          </button>
        </div>
      );
    }
    if (type === "pending") {
      return (
        <div className="card-actions">
          <button className="btn-danger" onClick={() => onCancelOrder(id)}>
            Cancel Request
          </button>
        </div>
      );
    }
    if (type === "toReceive") {
      return (
        <div className="card-actions">
          <button className="btn-secondary cancel-order" onClick={() => onCancelOrder(id)}>
            Cancel Order
          </button>
          <button
            className="btn-secondary chat"
            onClick={() => onChat(listing.sellerMessengerLink)}
          >
            Chat
          </button>
          <button className="btn-primary" onClick={() => onOrderReceived(id)}>
            Order Received
          </button>
        </div>
      );
    }
  };

  return (
    <div className={`purchase-card ${type === "cancelled" ? "cancelled-card" : ""}`}>
      <div className="card-header">
        <span className="seller-label">
          Seller: <strong>{listing.sellerName}</strong>
        </span>
        <StatusBadge type={type} status={status} paymentMethod={paymentMethod} />
      </div>

      <div className="card-body">
        <div className="item-image">
          {listing.images && listing.images.length > 0 ? (
            <img src={listing.images[0]} alt={listing.name} className="item-img" />
          ) : (
            <div className="image-placeholder"></div>
          )}
        </div>

        <div className="item-details">
          <h3 className="item-name">{listing.name}</h3>
          <p className="item-info">Type: {listing.type}</p>
          <p className="item-info">Qty: {quantity}</p>
          {type === "pending" && <p className="queue-info">You are in the queue for this item</p>}
          {getCancelReason()}
        </div>

        <div className="item-price">
          <span className="price">₱{totalPrice.toFixed(2)}</span>
          {paymentMethod && <p className="payment-method">{paymentMethod}</p>}
        </div>
      </div>

      {getActions()}
    </div>
  );
};

// TabNavigation Component
const TabNavigation = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    { id: "toReceive", label: "To Receive", count: counts.toReceive },
    { id: "pending", label: "Pending Requests", count: counts.pending },
    { id: "cancelled", label: "Cancelled", count: counts.cancelled },
    { id: "completed", label: "Completed", count: counts.completed },
  ];

  return (
    <div className="tab-navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
};

function FallbackOrderImg() {
  return (
    <div className="size-20 rounded-lg bg-blue-800/40 flex justify-center items-center">
      <Package className="size-5 text-[#2A326B]" />
    </div>
  );
}

function PendingOfferCard({ offer }) {
  const { listing, id } = offer;
  const { name, condition, images, price, sellerName } = listing;

  const { mutate: cancelOffer } = useBuyerCancelOfferMutation();

  return (
    <div className="w-full rounded-lg border border-gray-100 overflow-hidden shadow">
      <div className="p-4 bg-gray-50 border-b border-b-gray-100 flex justify-between">
        <div className="text-gray-500 font-bold">
          Seller: <span className="text-black">{sellerName}</span>
        </div>
      </div>

      <div className="bg-white p-4 flex justify-between">
        <div className="flex space-x-3 ">
          <div className="">
            {images && images.length > 0 ? (
              <img src={images[0]} alt={name} className="size-20 rounded-lg object-cover" />
            ) : (
              <FallbackOrderImg />
            )}
          </div>

          <div className="space-y-2">
            <p className="text-black text-sm font-bold">{name}</p>
            <p className="text-gray-500 text-xs">Condition: {condition}</p>
            <p className="text-gray-400 italic text-xs">You are in the queue for this item</p>
          </div>
        </div>

        <div className="text-brand-primary font-bold text-xl self-center">₱{price}</div>
      </div>

      <div className="bg-gray-50 border-t border-t-gray-100 flex justify-end p-6">
        <button className="text-red-500 font-bold" onClick={() => cancelOffer(id)}>
          Cancel Request
        </button>
      </div>
    </div>
  );
}

// Main MyPurchases Component
const MyPurchases = () => {
  const [activeTab, setActiveTab] = useState("completed");

  const { data: pendingOrders = [] } = usePendingBuyerOrdersQuery();
  const { data: completedOrders = [] } = useCompletedBuyerOrdersQuery();
  const { data: cancelledOrders = [] } = useCancelledBuyerOrdersQuery();
  const { data: pendingOffers = [] } = useFetchBuyerPendingOffersQuery();

  const handleCancelOrder = async () => {
    try {
      console.log("cancel order implementation");
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel order. Please try again.");
    }
  };

  const handleOrderReceived = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to mark order as received");
      }

      // Refresh orders after completion
      // await fetchOrders();
      alert("Order marked as received successfully");
    } catch (err) {
      console.error("Error marking order as received:", err);
      alert("Failed to mark order as received. Please try again.");
    }
  };

  const handleRateSeller = (orderId) => {
    // Navigate to rating page or open rating modal
    console.log("Rate seller for order:", orderId);
    alert("Rating feature will be implemented");
  };

  const handleViewDetails = (orderId) => {
    // Navigate to order details page
    console.log("View details for order:", orderId);
    alert("View details feature will be implemented");
  };

  const handleChat = (messengerLink) => {
    if (messengerLink) {
      window.open(messengerLink, "_blank");
    } else {
      alert("Messenger link not available");
    }
  };

  const counts = {
    toReceive: pendingOrders.length,
    pending: pendingOffers.length,
    cancelled: cancelledOrders.length,
    completed: completedOrders.length,
  };

  const getCurrentTabItems = () => {
    switch (activeTab) {
      case "toReceive":
        return pendingOrders;
      case "pending":
        return pendingOffers;
      case "cancelled":
        return cancelledOrders;
      case "completed":
        return completedOrders;
      default:
        return [];
    }
  };

  const items = getCurrentTabItems();
  const isPendingTab = activeTab === "pending";
  const isEmpty = items.length === 0;

  return (
    <div className="my-purchases">
      <header className="page-header">
        <button className="back-button" onClick={() => window.history.back()}>
          My Purchases
        </button>
      </header>

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} counts={counts} />

      <div className="purchases-content">
        {isPendingTab ? (
          items.map((offer) => <PendingOfferCard key={offer.id} offer={offer} />)
        ) : isEmpty ? (
          <div className="empty-state">No orders in this category</div>
        ) : (
          items.map((order) => (
            <PurchaseCard
              key={order.id}
              order={order}
              type={activeTab}
              onCancelOrder={handleCancelOrder}
              onOrderReceived={handleOrderReceived}
              onRateSeller={handleRateSeller}
              onViewDetails={handleViewDetails}
              onChat={handleChat}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyPurchases;
