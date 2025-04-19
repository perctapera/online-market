import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./orderHistory.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let prevUserEmail = null;

    const checkUserChange = () => {
      const user = JSON.parse(localStorage.getItem("userProfile"));
      if (!user) {
        if (prevUserEmail !== null) {
          alert("Please login to view your order history.");
          navigate("/");
        }
        prevUserEmail = null;
        setOrders([]);
        return;
      }

      const currentEmail = user.email || "guest";
      if (currentEmail !== prevUserEmail) {
        const key = `orderHistory_${currentEmail}`;
        const storedOrders = JSON.parse(localStorage.getItem(key)) || [];
        setOrders(storedOrders.reverse());
        prevUserEmail = currentEmail;
      }
    };

    checkUserChange();
    const interval = setInterval(checkUserChange, 1000); // check user in every sceond

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
    <div className="order-history-container">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div className="order-card" key={index}>
            <h3>Order #{order.orderNumber}</h3>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <p>Payment Method: {order.paymentMethod}</p>
            <p>Tip: ${order.tip.toFixed(2)}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
    <Footer />
    </>
  );
}

export default OrderHistory;
