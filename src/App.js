import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
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
        <div className="app-container">
            {/* ✅ Pass user and setUser to Header */}
            <Header user={user} setUser={setUser} />
            {user && <Profile user={user} setUser={setUser} />}
        </div>
    );
}

export default App;
