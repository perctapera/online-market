import { useLocation, useNavigate } from "react-router-dom";
import "./productDetail.css"; // Import styling
import { FaArrowLeft } from "react-icons/fa"; // Import arrow icon

function ProductDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state; // Get product data from navigation

    if (!product) return <h2>Product not found</h2>;

    return (
        <div className="product-detail-container">
            {/* Back arrow to navigate to homepage */}
            <div className="back-button" onClick={() => navigate("/")}>
                <FaArrowLeft className="back-icon" /> Return to Homepage
            </div>

            <h2>{product.name}</h2>
            <img src={require(`../images/${product.image}`)} alt={product.name} className="product-detail-image" />
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
        </div>
    );
}

export default ProductDetail;
