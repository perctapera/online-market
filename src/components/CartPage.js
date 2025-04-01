import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./cartPage.css";

function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, checkout } = useCart();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("");
    const [tipPercentage, setTipPercentage] = useState(0);
    const [customTip, setCustomTip] = useState("");

    // Calculate totals
    const totalPrice = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        return sum + (price * quantity);
    }, 0);

    // Calculate tip amount based on percentage or custom value
    const tipAmount = tipPercentage > 0 
        ? totalPrice * (tipPercentage / 100)
        : parseFloat(customTip) || 0;

    const finalTotal = totalPrice + tipAmount;

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty. Please add items before checkout.");
            return;
        }
        
        if (!paymentMethod) {
            alert("Please select a payment method before checkout.");
            return;
        }
        
        checkout(paymentMethod, tipAmount);
        navigate("/order-confirmation");
    };

    const handleTipPercentageSelect = (percentage) => {
        setTipPercentage(percentage);
        setCustomTip(""); // Clear custom tip when selecting percentage
    };

    const handleCustomTipChange = (e) => {
        setTipPercentage(0); // Reset percentage when using custom tip
        setCustomTip(e.target.value);
    };

    return (
        <div className="cart-page">
            <h2>Your Shopping Cart</h2>
            
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div className="cart-card" key={item.id}>
                                <div className="cart-left">
                                    <img 
                                        src={require(`../images/${item.image}`)} 
                                        alt={item.name} 
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <h3>{item.name}</h3>
                                        <p>${parseFloat(item.price).toFixed(2)}</p>
                                        <button 
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
                                        updateQuantity(item.id, newQuantity);
                                    }}
                                    className="quantity-input"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="checkout-section">
                        {/* Payment Method Selection */}
                        <div className="payment-section">
                            <h3>Select Payment Method:</h3>
                            <select 
                                value={paymentMethod} 
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="payment-select"
                                required
                            >
                                <option value="">-- Select Payment Method --</option>
                                <option value="Cash">Cash</option>
                                <option value="Card">Card</option>
                                <option value="Mobile Money">Mobile Money</option>
                            </select>
                        </div>

                        {/* Tip Section */}
                        <div className="tip-section">
                            <h3>Add Tip:</h3>
                            <div className="tip-options">
                                {[10, 15, 20].map((percentage) => (
                                    <button
                                        key={percentage}
                                        type="button"
                                        className={`tip-btn ${tipPercentage === percentage ? "active" : ""}`}
                                        onClick={() => handleTipPercentageSelect(percentage)}
                                    >
                                        {percentage}%
                                    </button>
                                ))}
                            </div>
                            <div className="custom-tip">
                                <label>or Custom: $</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={tipPercentage > 0 ? "" : customTip}
                                    onChange={handleCustomTipChange}
                                    className="custom-tip-input"
                                />
                            </div>
                            <div className="tip-display">
                                Tip Amount: ${tipAmount.toFixed(2)}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="order-summary">
                            <h3>Order Summary</h3>
                            <div className="price-row">
                                <span>Subtotal:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="price-row">
                                <span>Tip:</span>
                                <span>${tipAmount.toFixed(2)}</span>
                            </div>
                            <div className="price-row total-row">
                                <span>Total:</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>
                            <button
                                className="checkout-btn"
                                onClick={handleCheckout}
                                disabled={cartItems.length === 0 || !paymentMethod}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;