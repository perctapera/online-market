import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./products.css";
import { categories, products } from "../data/products";
import { useCart } from "./CartContext";
import Footer from "./Footer";

function Products() {
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [searchTerm, setSearchTerm] = useState("");
    const [addedItemId, setAddedItemId] = useState(null); // For cart add feedback
    const navigate = useNavigate();
    const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "All Products" || categories[selectedCategory]?.includes(product.name);
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedItemId(product.id);
        setTimeout(() => setAddedItemId(null), 1000); // Clear feedback after 1s
    };

    return (
        <>
        <div className="products-page">
            <div className="sidebar">
                <h3>Categories</h3>
                <ul>
                    {Object.keys(categories).map((category) => (
                        <li
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={selectedCategory === category ? "active" : ""}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="products-container">
                <div className="products-header">
                    <h2>{selectedCategory}</h2>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={() => setSearchTerm("")}>Clear</button>
                    </div>
                </div>

                <div className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="product-item">
                                <img
                                    src={require(`../images/${product.image}`)}
                                    alt={product.name}
                                    className="product-image"
                                    onClick={() => navigate(`/product/${product.id}`, { state: product })}
                                />
                                <h3>{product.name}</h3>
                                <p>${product.price.toFixed(2)}</p>
                                {(() => {
                                    const inCart = cartItems.find((item) => item.id === product.id);
                                    if (inCart) {
                                        return (
                                            <div className="quantity-controller">
                                                <button
                                                    onClick={() =>
                                                        inCart.quantity > 1
                                                            ? updateQuantity(product.id, inCart.quantity - 1)
                                                            : removeFromCart(product.id)
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span>{inCart.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(product.id, inCart.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        );
                                    }
                                    return (
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className={`add-to-cart-btn ${addedItemId === product.id ? "added" : ""}`}
                                        >
                                            {addedItemId === product.id ? "Added!" : "Add to Cart"}
                                        </button>
                                    );
                                })()}
                            </div>
                        ))
                    ) : (
                        <p className="no-results">No products found.</p>
                    )}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Products;