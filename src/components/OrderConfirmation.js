import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./orderConfirmation.css";

function OrderConfirmation() {
    const { confirmedOrder } = useCart();
    const navigate = useNavigate();

    if (!confirmedOrder) {
        return (
            <div className="order-confirmation">
                <h2>Order Confirmation</h2>
                <p>No order found. Please complete a checkout first.</p>
                <button onClick={() => navigate("/")}>Back to Home</button>
            </div>
        );
    }

    const { items, orderNumber, paymentMethod, tip } = confirmedOrder;
    
    const totalPrice = items.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );
    const finalTotal = totalPrice + tip;

    return (
        <div className="order-confirmation">
            <h2>Order Confirmation</h2>
            <h3>Order Number: {orderNumber}</h3>
            
            <div className="order-summary">
                <h3>Items Purchased:</h3>
                {items.length > 0 ? (
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                <span>{item.name} (x{item.quantity})</span> - $
                                {(item.price * item.quantity).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items in this order</p>
                )}

                <h3>Payment Method: {paymentMethod}</h3>
                <h3>Tip Amount: ${tip.toFixed(2)}</h3>
                <h3>Total Paid: ${finalTotal.toFixed(2)}</h3>
            </div>

            <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
    );
}

export default OrderConfirmation;