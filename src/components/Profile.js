import { useState, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";
import "../styles.css"; // Import global styles

function Profile({ user, setUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);
    const [profilePic, setProfilePic] = useState(user.picture || "/default-avatar.png");

    // Save profile data to localStorage
    const handleSaveProfile = () => {
        localStorage.setItem("userProfile", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    // Handle profile picture upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                setUpdatedUser({ ...updatedUser, picture: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        localStorage.removeItem("userProfile"); // Clear profile data on logout
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <div className="profile-pic-container">
                <img src={profilePic} alt="Profile" className="profile-pic" />
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            {isEditing ? (
                <div className="edit-form">
                    <input type="text" name="name" value={updatedUser.name} onChange={handleChange} placeholder="Name" />
                    <input type="email" name="email" value={updatedUser.email} onChange={handleChange} placeholder="Email" />
                    <button onClick={handleSaveProfile}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p><strong>Name:</strong> {updatedUser.name}</p>
                    <p><strong>Email:</strong> {updatedUser.email}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default Profile;
