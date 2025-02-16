import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../styles.css"; // Import global styles

function Login({ setUser }) {
    const onSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        localStorage.setItem("userProfile", JSON.stringify(decoded));
        setUser(decoded);
    };

    const onError = () => {
        console.log("Login Failed!");
    };

    return (
        <GoogleLogin onSuccess={onSuccess} onError={onError} />
    );
}

export default Login;
