import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import { loadStripe } from '@stripe/stripe-js';
import { incrementCartCounter, decrementCartCounter } from "../actions/cartActions";
import { saveUserCart } from "../actions/cartActions";
import { removeFromCart } from "../actions/cartActions";
import { jwtDecode } from "jwt-decode";


function CartDetails() {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);  // entire cart state
    const { userInfo } = useSelector((state) => state.userLogin);  // user login info
    const cartItems = cart.cartItems;
    const cartCounter = cart.cartCounter;
    useEffect(() => {
        console.log("Cart items in Redux after login:", cartItems);
    }, [cartItems]);
    const totalPrice = cart.totalPrice || 0;  // Default value 0 if undefined
    const deliveryCharges = cart.deliverCharges || 0;
    const taxes = cart.taxes || 0;
    const grandTotal = cart.grandTotal || 0;



    // Save cart whenever it changes
    useEffect(() => {
        if (userInfo && cart.cartItems.length > 0) {
            dispatch(saveUserCart(cart));  // Persist cart state to MongoDB
        }
    }, [cart, userInfo, dispatch]);



    // Increment and decrement of cart items
    const handleIncrement = (id) => {
        dispatch(incrementCartCounter(id));
    };


    const handleDecrement = (id) => {
        dispatch(decrementCartCounter(id));
    };

    // Payment gateway and reducing quntity on purchase 
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51RI9HhCH7rbrdLiTUHCfQv9xy3UM2E6JR5Y76pfXG9AiwjF77VIw5QdauuYRhqHejVRze2DqYKGUAwhdOjSsRZqA00amF3m3fD");

        console.log("🔐 userInfo in makePayment:", userInfo);

        if (!userInfo || !userInfo.token) {
            alert("You must be logged in to proceed to checkout.");
            return;
        }

        // ✅ Decode the token to get userId
        const decoded = jwtDecode(userInfo.token);
        const userId = decoded.user.id;

        const body = {
            cartItems: cartItems.map(product => ({
                productId: product.id || product._id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: product.qty
            })),
            userId,
            email: userInfo.email,
            grandTotal,
            taxes,
            deliveryCharges
        };


        console.log("🛒 Sending products to backend:", body);
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`
        };

        console.log("🛒 Sending products to backend:", body);


        const response = await fetch("http://localhost:7000/api/create-checkout-session", {
            method: "POST",
            headers,
            body: JSON.stringify(body)

        });

        const session = await response.json();

        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
            alert(result.error.message);
            return;
        }


    };


    return (
        <div>
            <div className="bg-white mt-1">
                <div className="cart-nav"> <Navbar1 /></div>
                {cartItems && cartItems.length > 0 ? (
                    <div className="row mt-5">
                        <h3>Product Details</h3>
                        <div className="col-md-8 shadow">
                            <div className="row border-bottom py-3 m-2">
                                <div className="col-md-7">  Item</div>
                                <div className="col-md-2"> Cost </div>
                                <div className="col-md-1"> Qty </div>
                                <div className="col-md-1">Total </div>
                            </div>

                            <div className="container">
                                {cartItems.map(item => (
                                    console.log("🧾 Cart item:", item),

                                    <div className="row borderp-2 py-4" key={item.id}>
                                        <div className="col-md-7 d-flex">
                                            <img src={item.image} alt={item.title} style={{ width: "40px", height: "40px" }} />
                                            <h6 className="ps-3">{item.title || item.name || "Unnamed Product"}</h6>
                                        </div>

                                        <div className="col-md-1">
                                            <p className="text-end">{item.price ? item.price.toFixed(2) : '0.00'}</p>
                                        </div>

                                        <div className="col-md-2 text-end">
                                            <div className="quantity-controls">
                                                <button className="cart-btns" onClick={() => handleDecrement(item.id)}>-</button>
                                                <span className="px-2">{item.qty}</span>
                                                <button
                                                    className="cart-btns"
                                                    onClick={() => {
                                                        // Use currentQuantity or updatedQuantity as backend stock
                                                        const availableStock = item.currentQuantity ?? item.updatedQuantity ?? 0;
                                                        if (item.qty >= availableStock) {
                                                            alert(`Only ${availableStock} items in stock for "${item.title}"`);
                                                            return;
                                                        }
                                                        handleIncrement(item.id);
                                                    }}
                                                >
                                                    +
                                                </button>



                                                {item.qty >= item.countInStock && (
                                                    <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>
                                                        Only {item.countInStock} in stock
                                                    </p>
                                                )}
                                            </div>
                                        </div>


                                        <div className="col-md-1">
                                            <p className="text-end">{item.total_item_price ? item.total_item_price.toFixed(2) : '0.00'}</p>
                                        </div>
                                        <div className="col-md-1 text-end">
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                            >
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                ))}

                                <hr />

                                <div className="row mb-2 py-3 pe-3">
                                    <div className="offset-md-9 col-md-1">
                                        <h5 className="text-end"> Total</h5>
                                    </div>

                                    <div className="col-md-1">
                                        <h5 className="text-end">{cartCounter}</h5>
                                    </div>

                                    <div className="col-md-1">
                                        <h5 className="text-end">{totalPrice.toFixed(2)}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="shadow p-2 mx-2 pb-5">
                                <div className="d-flex justify-content-between px-2">
                                    <p>Sub Total</p> <p>{totalPrice.toFixed(2)}</p>
                                </div>

                                <div className="d-flex justify-content-between px-2">
                                    <p>Delivery Charges</p> <p>{deliveryCharges.toFixed(2)}</p>
                                </div>

                                <div className="d-flex justify-content-between px-2">
                                    <p>Tax</p> <p>{taxes.toFixed(2)}</p>
                                </div>

                                <div className="d-flex justify-content-between px-2">
                                    <p>Total</p> <p>{grandTotal.toFixed(2)}</p>
                                </div>

                                <div className="m-2">
                                    <button onClick={makePayment} className="btn btn-primary">Proceed to Checkout</button>
                                </div>

                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="empty-cart">
                        <img src="https://media.istockphoto.com/id/1352766190/vector/shopaholic-woman-running-with-an-empty-shopping-cart.jpg?s=612x612&w=0&k=20&c=2f0fEX7DqmYbkgY1l5w2-GLwCmLMTFLASnW-UyiPaX4=" alt="" width="250" height="250" />
                        <h1>Your cart is empty</h1>
                        <p>Just relax, let us help you find some first-class products</p>
                        <Link to='/'><button> Start Shopping</button></Link>
                    </div>
                )}
            </div>
            <div><Footer /></div>
        </div>
    );
};

export default CartDetails;
