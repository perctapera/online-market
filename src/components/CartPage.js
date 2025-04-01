import "./cartPage.css";

function CartPage({ cartItems, updateQuantity, removeFromCart }) {
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.quantity,
        0
    );

    return (
        <div className="cart-page">
            <h2>Your Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) => {
                        const unitPrice = parseFloat(item.price.replace("$", ""));
                        const subtotal = unitPrice * item.quantity;

                        return (
                            <div className="cart-card" key={item.id}>
                                <div className="cart-left">
                                    <img
                                        src={require(`../images/${item.image}`)}
                                        alt={item.name}
                                        className="cart-img"
                                    />
                                    <div className="cart-details">
                                        <h4>{item.name}</h4>
                                        <p>Unit Price: <strong>${unitPrice.toFixed(2)}</strong></p>
                                    </div>
                                </div>

                                <div className="cart-right">
                                    <p className="cart-subtotal">${subtotal.toFixed(2)}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
        </div>
    );
}

export default CartPage;
