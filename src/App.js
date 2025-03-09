import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Profile from "./components/Profile";

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
        <Router>
            <div className="app-container">
                {/* ✅ Pass user and setUser to Header */}
                <Header user={user} setUser={setUser} />
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <h2>Please log in</h2>} />
                </Routes>
            </div>
        </Router>
        
    );
}

export default App;
