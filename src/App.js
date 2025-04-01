import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartProvider, useCart } from "./components/CartContext";
import "./App.css";
import Header from "./components/Header";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Profile from "./components/Profile";
import CartPage from "./components/CartPage";
import OrderConfirmation from "./components/OrderConfirmation";

function App() {
    const [user, setUser] = useState(null);

    // Load user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("userProfile");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <CartProvider> {/* ✅ Wrap the whole app in CartProvider */}
        <Router>
            <div className="app-container">
                {/* ✅ Pass user and setUser to Header */}
                <Header user={user} setUser={setUser} />
                <Routes>
                    <Route path="/" element={<Products />} />
<Route path="/product/:id" element={<ProductDetail />} />
<Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <h2>Please log in</h2>} />
<Route path="/cart" element={<CartPage />} />
<Route path="/order-confirmation" element={<OrderConfirmation />} />
                </Routes>
            </div>
        </Router>
        </CartProvider> 
    );
}

export default App;
