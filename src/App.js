import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Profile from "./components/Profile";
import CartPage from "./components/CartPage";

function App() {
    const [user, setUser] = useState(null);

    const [cartItems, setCartItems] = useState([]);

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existing = prevItems.find(item => item.id === product.id);
            if (existing) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity < 1 ? 1 : newQuantity }
                    : item
            )
        );
    };
    

    // Load user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("userProfile");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Router>
            <div className="app-container">
                {/* ✅ Pass user and setUser to Header */}
                <Header user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems} />
                <Routes>
                    <Route path="/" element={<Products cartItems={cartItems} addToCart={addToCart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <h2>Please log in</h2>} />
                    <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
                </Routes>
            </div>
        </Router>
        
    );
}

export default App;
