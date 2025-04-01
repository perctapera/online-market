import { useState, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";
import "./profile.css"; // Import dedicated profile styles

function Profile({ user, setUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({ 
        ...user,
        name: user?.name || '',
        email: user?.email || ''
    });
    const [profilePic, setProfilePic] = useState(user?.picture || "/default-avatar.png");

    const handleSaveProfile = () => {
        const userToSave = {
            ...updatedUser,
            picture: profilePic
        };
        localStorage.setItem("userProfile", JSON.stringify(userToSave));
        setUser(userToSave);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        localStorage.removeItem("userProfile");
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">My Profile</h2>
            
            <div className="profile-header">
                <div className="avatar-upload">
                    <img src={profilePic} alt="Profile" className="profile-avatar" />
                    <label className="upload-btn">
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            className="file-input"
                        />
                        Change Photo
                    </label>
                </div>
            </div>

            {isEditing ? (
                <div className="profile-edit-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={updatedUser.name} 
                            onChange={handleChange} 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={updatedUser.email} 
                            onChange={handleChange} 
                            className="form-input"
                        />
                    </div>
                    <div className="form-actions">
                        <button className="save-btn" onClick={handleSaveProfile}>Save Changes</button>
                        <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="profile-info">
                    <div className="info-item">
                        <span className="info-label">Name:</span>
                        <span className="info-value">{updatedUser.name}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{updatedUser.email}</span>
                    </div>
                    <div className="profile-actions">
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;