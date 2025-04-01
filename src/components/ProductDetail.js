import { useLocation, useNavigate } from "react-router-dom";
import "./productDetail.css";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useState } from "react";

function ProductDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
    const [added, setAdded] = useState(false); // For cart add feedback
    const product = location.state;

    if (!product) return <h2>Product not found</h2>;

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1000); // Clear feedback after 1s
    };

    const inCart = cartItems.find((item) => item.id === product.id);

    return (
        <div className="product-detail-container">
            <div className="back-button" onClick={() => navigate("/")}>
                <FaArrowLeft className="back-icon" /> Back to Products
            </div>

            <h2>{product.name}</h2>
            <img
                src={require(`../images/${product.image}`)}
                alt={product.name}
                className="product-detail-image"
            />
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Description:</strong> {product.description || "No description available"}</p>

            {inCart ? (
                <div className="quantity-controller">
                    <button
                        onClick={() =>
                            inCart.quantity > 1
                                ? updateQuantity(product.id, inCart.quantity - 1)
                                : removeFromCart(product.id)
                        }
                    >
                        −
                    </button>
                    <span>{inCart.quantity}</span>
                    <button onClick={() => updateQuantity(product.id, inCart.quantity + 1)}>+</button>
                </div>
            ) : (
                <button
                    onClick={handleAddToCart}
                    className={`add-to-cart-btn ${added ? "added" : ""}`}
                >
                    {added ? "Added!" : "Add to Cart"}
                </button>
            )}
        </div>
    );
}

export default ProductDetail;