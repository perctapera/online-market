import "./profilePopup.css";

function ProfilePopup({ onNavigate, onLogout, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="profile-popup" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onNavigate("/profile")}>My Profile</button>
        <button onClick={() => onNavigate("/order-history")}>Order History</button>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default ProfilePopup;
