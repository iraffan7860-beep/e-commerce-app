import { useEffect, useState } from "react";
import apiFetch from "../api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await apiFetch("/api/orders");

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setOrders(data);
    } catch (error) {
      console.log("Orders error:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orders-page">
      <div className="page-title">
        <p className="small-title">YOUR ORDERS</p>

        <h1>My Orders</h1>

        <p>
          Check your previous orders and order details.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No orders yet</h2>

          <p>
            Your placed orders will appear here.
          </p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div
              className="order-card"
              key={order._id}
            >
              <h3>Order Details</h3>

              <p>
                <strong>Order ID:</strong>{" "}
                {order._id}
              </p>

              <p>
                <strong>Total Amount:</strong> ₹
                {order.totalAmount}
              </p>

              <p>
                <strong>Items:</strong>{" "}
                {order.products.length}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;