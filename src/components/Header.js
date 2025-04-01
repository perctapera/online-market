import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import StoreLogo from '../images/online-shop.png';
import LoginButton from "./login";
import "../styles.css"; // Import global styles
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from './CartContext';

const clientId = "709514609698-9er2a02tiodh6gudshi2ahlvklhjq0ok.apps.googleusercontent.com";

function Header({ user, setUser }) {
    const navigate = useNavigate();
    const { cartItems } = useCart();

    // Calculate total items in cart
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            });
        };
        gapi.load('client:auth2', start);
    }, []);

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        localStorage.removeItem("userProfile"); // Clear profile data on logout
    };

    return (
        <header className="header-component">
            <img 
                src={StoreLogo} 
                alt="Store logo" 
                className="store-logo"
                onClick={() => navigate("/")} 
                style={{ cursor: "pointer" }} 
            />
            <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Online Marketing</h1>
            
                <div className="login-button-container">
                    {/* ✅ Show login button if no user, otherwise show profile */}
                    <div className="cart-icon" onClick={() => navigate("/cart")} style={{ cursor: "pointer", marginRight: "16px" }}>
                        <FaShoppingCart size={24} />
                        {totalItems > 0 && (
                            <span className="cart-count">{totalItems}</span>
                        )}
                    </div>
                {user ? (
                    <div className="user-info">
                        <img src={user.picture || "/default-avatar.png"} alt="Profile" className="profile-pic-small" />
                        <span onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
                            {user.name}
                        </span>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                ) : (
                    <LoginButton setUser={setUser} />
                )}
            </div>
            
        </header>
    );
}

export default Header;
