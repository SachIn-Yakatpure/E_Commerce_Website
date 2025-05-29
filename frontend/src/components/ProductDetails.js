
import React, { useEffect, useState } from "react";
import './ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, saveUserCart } from '../actions/cartActions';
import Swal from "sweetalert2";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setAll_Products] = useState(null);
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.userLogin.userInfo);
    // const userReview = product?.reviews?.find(
    //     rev => rev?.user && String(rev.user._id) === String(userInfo?._id)
    // );



    useEffect(() => {
        fetch(`http://localhost:7000/allproducts/${id}`)
            .then((res) => res.json())
            .then((data) => setAll_Products(data))
            .catch((err) => console.error(err));
    }, [id]);

    const handleCart = () => {
        if (!userInfo || !localStorage.getItem('auth-token')) {
            navigate('/Beauty');
            return;
        }

        const existingCartItem = JSON.parse(localStorage.getItem("cart"))?.find(item => item.productId === product._id);
        const currentQtyInCart = existingCartItem ? existingCartItem.qty : 0;

        if (currentQtyInCart >= product.currentQuantity) {
            Swal.fire("Maximum stock limit reached for this item.", "", "warning");
            return;
        }

        const cartItem = {
            productId: product._id,
            title: product.title,
            price: product.price,
            image: product.image,
            qty: 1,
            availableQuantity: product.currentQuantity,
        };

        dispatch(addToCart({
            ...product,
            countInStock: product.currentQuantity,
            qty: 1,
        }));

        dispatch(saveUserCart());

        Swal.fire({
            title: "Item added to cart!",
            icon: "success",
        });
    };


    const submitReview = async (e) => {
        e.preventDefault();

        if (!rating) {
            Swal.fire("Please select a rating");
            return;
        }

        try {
            const response = await fetch(`http://localhost:7000/api/products/${id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                },
                body: JSON.stringify({ rating })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Failed to submit review');

            await Swal.fire("Review submitted successfully!", "", "success");
            setRating(0);
            window.location.reload();

        } catch (err) {
            Swal.fire("Failed to submit review", err.message, "error");
        }
    };


    return (
        <div>
            <div className="product-detail">
                <div className="product-images">
                    <img src={product?.image} alt="Main Product" className="main-image" />
                </div>

                <div className="product-info">
                    <h1>{product?.title}</h1>
                    <p className="price">&#8377;{product?.price}</p>

                    <div className="product-discription">
                        <h2>Product Details</h2>
                        <div className="reviews1">
                            <p>
                                ⭐ {product?.rating ? product.rating.toFixed(1) : "No rating yet"} ({product?.totalRatings || 0})
                            </p>

                        </div>
                        {/* {userReview && (
                            <p style={{ color: 'green', marginTop: '5px' }}>
                                You rated {userReview.rating} star{userReview.rating > 1 ? 's' : ''}
                            </p>
                        )} */}


                        <hr />
                    </div>

                    <div className="actions_wrraper">
                        <div className="actions">
                            {product?.currentQuantity === 0 ? (
                                <button className="add-to-cart" disabled style={{ backgroundColor: 'gray' }}>
                                    Out of Stock
                                </button>
                            ) : (
                                <button className="add-to-cart" onClick={handleCart}>
                                    <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                                </button>
                            )}
                            <Link to="/Cart">
                                <button className="buy-now"><i className="fa-solid fa-angles-right"></i> Buy Now</button>
                            </Link>
                        </div>
                    </div>

                    <div className="additional-info">
                        <p><strong>Free Shipping on Orders Over ₹50</strong></p>
                        <p><strong>24/7 Customer Support:</strong> +1-800-123-4567</p>
                        <p><strong>Delivery:</strong> 3 - 5 Business Days</p>
                        {/* 
                        {product?.reviews?.map((rev, index) => (
                            <div key={index} className="single-review mb-2">
                                <p>⭐ {rev.rating}</p>
                                <hr className="my-2" />
                            </div>
                        ))} */}


                    </div>

                    {userInfo ? (
                        <div className="review-section">
                            <h2>Rate this Product</h2>
                            <form onSubmit={submitReview}>
                                <div className="submit-review-section">
                                    <select
                                        value={rating}
                                        onChange={(e) => setRating(Number(e.target.value))}
                                        required
                                    >
                                        <option value={0}>Select Rating</option>
                                        {[1, 2, 3, 4, 5].map((val) => (
                                            <option key={val} value={val}>
                                                {val} - {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][val - 1]}
                                            </option>
                                        ))}
                                    </select>

                                    <button type="submit">Submit Rating</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <p style={{ marginTop: '20px', color: 'gray' }}>Please log in to rate this product.</p>
                    )}


                </div>
            </div>

            <div className="footer1">
                <Footer />
            </div>
        </div>
    );
};

export default ProductDetails;
