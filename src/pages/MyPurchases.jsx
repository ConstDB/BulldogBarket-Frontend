import React, { useState, useEffect } from 'react';
import '../styles/MyPurchases.css';
 
const API_BASE_URL = 'http://127.0.0.1:3000/api/v1';
 
const StatusBadge = ({ type, status, paymentMethod }) => {
  const getClassName = () => {
    if (type === 'completed') return 'status-badge delivered';
    if (type === 'cancelled') return 'status-badge cancelled';
    if (type === 'pending') {
      return paymentMethod === 'Cash on Meetup' ? 'status-badge waiting' : 'status-badge waiting';
    }
    if (type === 'toReceive') {
      return paymentMethod === 'Cash on Meetup' ? 'status-badge meetup' : 'status-badge accepted';
    }
  };
 
  const getText = () => {
    if (type === 'completed') return 'DELIVERED • DEC 6';
    if (type === 'cancelled') {
      return status === 'cancelled_by_buyer' ? 'CANCELLED BY YOU' : 'CANCELLED';
    }
    if (type === 'pending') return 'WAITING APPROVAL';
    if (type === 'toReceive') {
      return paymentMethod === 'Cash on Meetup' ? 'TO MEETUP' : 'REQUEST ACCEPTED';
    }
  };
 
  return <span className={getClassName()}>{getText()}</span>;
};
 
// PurchaseCard Component
const PurchaseCard = ({ order, type, onCancelOrder, onOrderReceived, onRateSeller, onViewDetails, onChat }) => {
  const { id, listing, quantity, totalPrice, status, paymentMethod } = order;
 
  const getCancelReason = () => {
    if (status === 'cancelled_by_seller') {
      return <p className="cancel-reason">Reason: Seller declined request (Item unavailable)</p>;
    }
    if (status === 'cancelled_by_buyer') {
      return <p className="cancel-reason">Reason: You cancelled the request</p>;
    }
    return null;
  };
 
  const getActions = () => {
    if (type === 'completed') {
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
    if (type === 'cancelled') {
      return (
        <div className="card-actions">
          <button className="btn-tertiary" onClick={() => onViewDetails(id)}>
            View Details
          </button>
        </div>
      );
    }
    if (type === 'pending') {
      return (
        <div className="card-actions">
          <button className="btn-danger" onClick={() => onCancelOrder(id)}>
            Cancel Request
          </button>
        </div>
      );
    }
    if (type === 'toReceive') {
      return (
        <div className="card-actions">
          <button className="btn-secondary cancel-order" onClick={() => onCancelOrder(id)}>
            Cancel Order
          </button>
          <button className="btn-secondary chat" onClick={() => onChat(listing.sellerMessengerLink)}>
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
    <div className={`purchase-card ${type === 'cancelled' ? 'cancelled-card' : ''}`}>
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
          {type === 'pending' && (
            <p className="queue-info">You are in the queue for this item</p>
          )}
          {getCancelReason()}
        </div>
       
        <div className="item-price">
          <span className="price">₱{totalPrice.toFixed(2)}</span>
          {paymentMethod && (
            <p className="payment-method">{paymentMethod}</p>
          )}
        </div>
      </div>
     
      {getActions()}
    </div>
  );
};
 
// TabNavigation Component
const TabNavigation = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    { id: 'toReceive', label: 'To Receive', count: counts.toReceive },
    { id: 'pending', label: 'Pending Requests', count: counts.pending },
    { id: 'cancelled', label: 'Cancelled', count: counts.cancelled },
    { id: 'completed', label: 'Completed', count: counts.completed }
  ];
 
  return (
    <div className="tab-navigation">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
};
 
// Main MyPurchases Component
const MyPurchases = () => {
  const [activeTab, setActiveTab] = useState('completed');
  const [orders, setOrders] = useState({
    toReceive: [],
    pending: [],
    cancelled: [],
    completed: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetchOrders();
  }, []);
 
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
     
      console.log('Fetching orders from:', API_BASE_URL);
     
      // Fetch all order types in parallel
      const [pendingRes, completedRes, cancelledRes] = await Promise.all([
        fetch(`${API_BASE_URL}/orders/buyer?status=pending`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }),
        fetch(`${API_BASE_URL}/orders/buyer?status=completed`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }),
        fetch(`${API_BASE_URL}/orders/buyer?status=cancelled`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
      ]);
 
      console.log('Response statuses:', {
        pending: pendingRes.status,
        completed: completedRes.status,
        cancelled: cancelledRes.status
      });
 
      if (!pendingRes.ok || !completedRes.ok || !cancelledRes.ok) {
        throw new Error(`API Error: ${pendingRes.status} ${completedRes.status} ${cancelledRes.status}`);
      }
 
      const pendingData = await pendingRes.json();
      const completedData = await completedRes.json();
      const cancelledData = await cancelledRes.json();
 
      console.log('Fetched data:', { pendingData, completedData, cancelledData });
 
      // All pending status orders go to pending tab
      // All completed status orders go to completed tab
      // All cancelled status orders go to cancelled tab
      // Note: "toReceive" will be empty unless you have a separate endpoint or status
 
      setOrders({
        toReceive: [], // Add endpoint if you have a specific "to_receive" status
        pending: Array.isArray(pendingData) ? pendingData : [],
        cancelled: Array.isArray(cancelledData) ? cancelledData : [],
        completed: Array.isArray(completedData) ? completedData : []
      });
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to fetch orders. Please check your API server.');
    } finally {
      setLoading(false);
    }
  };
 
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
 
      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }
 
      // Refresh orders after cancellation
      await fetchOrders();
      alert('Order cancelled successfully');
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Failed to cancel order. Please try again.');
    }
  };
 
  const handleOrderReceived = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
 
      if (!response.ok) {
        throw new Error('Failed to mark order as received');
      }
 
      // Refresh orders after completion
      await fetchOrders();
      alert('Order marked as received successfully');
    } catch (err) {
      console.error('Error marking order as received:', err);
      alert('Failed to mark order as received. Please try again.');
    }
  };
 
  const handleRateSeller = (orderId) => {
    // Navigate to rating page or open rating modal
    console.log('Rate seller for order:', orderId);
    alert('Rating feature will be implemented');
  };
 
  const handleViewDetails = (orderId) => {
    // Navigate to order details page
    console.log('View details for order:', orderId);
    alert('View details feature will be implemented');
  };
 
  const handleChat = (messengerLink) => {
    if (messengerLink) {
      window.open(messengerLink, '_blank');
    } else {
      alert('Messenger link not available');
    }
  };
 
  const counts = {
    toReceive: orders.toReceive.length,
    pending: orders.pending.length,
    cancelled: orders.cancelled.length,
    completed: orders.completed.length
  };
 
  const currentOrders = orders[activeTab] || [];
 
  return (
    <div className="my-purchases">
      <header className="page-header">
        <button className="back-button" onClick={() => window.history.back()}>
          My Purchases
        </button>
      </header>
 
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />
 
      <div className="purchases-content">
        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
            <button className="btn-primary" onClick={fetchOrders}>Retry</button>
          </div>
        ) : currentOrders.length === 0 ? (
          <div className="empty-state">No orders in this category</div>
        ) : (
          currentOrders.map(order => (
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