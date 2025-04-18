import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartProvider } from "./components/CartContext";
import "./App.css";
import Header from "./components/Header";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Profile from "./components/Profile";
import CartPage from "./components/CartPage";
import OrderConfirmation from "./components/OrderConfirmation";
import OrderHistory from "./components/OrderHistory";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Inline component for redirect notice
  function LoginRedirectNotice() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(2); // 2 秒倒计时
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
  
      const redirect = setTimeout(() => {
        clearInterval(timer); // 停止倒计时
        navigate("/");
      }, 2000);
  
      return () => {
        clearInterval(timer);
        clearTimeout(redirect);
      };
    }, [navigate]);
  
    return (
      <div className="login-reminder">
        <div>
          <h2>Please log in to view your profile</h2>
          <p>Redirecting to homepage in <strong>{countdown}</strong> second{countdown !== 1 ? "s" : ""}...</p>
        </div>
      </div>
    );
  }
  
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Header user={user} setUser={setUser} />

          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="/profile"
              element={user ? <Profile user={user} setUser={setUser} /> : <LoginRedirectNotice />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-history" element={<OrderHistory />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;