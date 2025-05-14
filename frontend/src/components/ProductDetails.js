import React, { useEffect, useState } from "react";
import './ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import Swal from "sweetalert2";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { saveUserCart } from "../actions/cartActions";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setAll_Products] = useState(null);

    // Redux dispatch and navigate hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the user info from Redux store
    const userInfo = useSelector((state) => state.userLogin.userInfo);

    useEffect(() => {
        console.log("Fetching product with id:", id);

        fetch(`http://localhost:7000/allproducts/${id}`)
            .then((res) => res.json())
            .then((data) => setAll_Products(data))
            .catch((err) => console.error(err));
    }, [id]);

    // Handle adding product to the cart

    const handleCart = () => {
        const token = localStorage.getItem('auth-token');
    
        if (!token) {
            window.location.href = '/beauty';
            return;
        }
    
        const cartItem = {
            productId: product._id, 
            title: product.title,
            price: product.price,
            image: product.image,
            qty: 1,
        };
    
        dispatch(addToCart(cartItem));
        dispatch(saveUserCart());
    
        Swal.fire({
            title: "Item added to cart!",
            icon: "success",
            draggable: true
        });
    };
    

    return (
        <div>
            <div className="product-detail" product={product}>
                <div className="product-images">
                    <img src={product?.image} alt="Main Product Image" className="main-image" />
                </div>

                <div className="product-info">
                    <h1>{product?.title}</h1>
                    <p className="price">&#8377;{product?.price}</p>

                    <div className="product-discription">
                        <h2> Product Details</h2>
                        <div className="reviews1">
                            <p>{product?.rating}</p> <p>({product?.reviews})</p>
                        </div>
                        <hr />
                    </div>

                    <div className="actions_wrraper">
                        <div className="actions">
                            {product?.quantity === 0 ? (
                                <button className="add-to-cart" disabled style={{ backgroundColor: 'gray', cursor: 'not-allowed' }}>
                                    Out of Stock
                                </button>
                            ) : (
                                <button className="add-to-cart" onClick={handleCart}>
                                    <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                                </button>
                            )}
                            <Link to={'/Cart'}>
                                <button className="buy-now"><i className="fa-solid fa-angles-right"></i> Buy Now</button>
                            </Link>
                        </div>
                    </div>

                    <div className="additional-info">
                        <p><strong>Free Shipping on Orders Over &#8377;50</strong></p>
                        <p><strong>24/7 Customer Support:</strong> +1-800-123-4567</p>
                        <p><strong>Delivery:</strong> 3 - 5 Business Days</p>
                    </div>
                </div>
            </div>

            <div className="footer1">
                <Footer />
            </div>
        </div>
    );
}

export default ProductDetails;
