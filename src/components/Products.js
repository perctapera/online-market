import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./products.css";
import { categories, products } from "../data/products";
import { useCart } from "./CartContext";

function Products() {
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // ✅ Get cart functions from useCart
    const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart(); 

    // Filtering logic for category and search term
    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "All Products" || categories[selectedCategory]?.includes(product.name);
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="products-page">
            {/* Sidebar for Categories */}
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

            {/* Products Container */}
            <div className="products-container">
                {/* Title and Search Bar */}
                <div className="products-header">
                    <h2>{selectedCategory}</h2>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={() => console.log("Searching for:", searchTerm)}>Search</button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="product-item">
                                <img 
                                    src={require(`../images/${product.image}`)} 
                                    alt={product.name} 
                                    className="product-image"
                                    onClick={() => navigate(`/product/${product.id}`, { state: product })}
                                    style={{ cursor: "pointer" }}
                                />
                                <h3>{product.name}</h3>
                                <p>${product.price.toFixed(2)}</p>
                                {(() => {
                                    const inCart = cartItems.find(item => item.id === product.id);

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
                                                    −
                                                </button>
                                                <span>{inCart.quantity}</span>
                                                <button onClick={() => updateQuantity(product.id, inCart.quantity + 1)}>+</button>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                                                +
                                            </button>
                                        );
                                    }
                                })()}
                            </div>
                        ))
                    ) : (
                        <p className="no-results">No products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products;