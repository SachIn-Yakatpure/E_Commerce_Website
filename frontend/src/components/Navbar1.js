import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../actions/cartActions";
import { logout } from "../actions/userActions";

function Navbar1({ searchQuery, setSearchQuery }) {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartCounter = cartItems.length;
    const userInfo = useSelector((state) => state.userLogin.userInfo); // Get user info from Redux

    console.log("🧠 Redux userInfo in Navbar:", userInfo);

    const logoutHandler = () => {
        dispatch(clearCart());
        dispatch(logout()); // Use Redux logout to clear everything
        console.log("🛑 Logout dispatched");
        navigate("/"); // Redirect to home after logout
    };

    return (
        <div className="Navbar1">
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-black">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="https://www.meesho.com/assets/svgicons/meeshoLogo.svg" alt="" width="156" height="36" />
                    </Link>

                    <form
                        className="d-flex"
                        onSubmit={(e) => {
                            e.preventDefault(); //  Prevent reload
                        }}
                    >
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Try Saree, Kurti or Search by Product Code"
                            aria-label="Search"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (window.filterProductsBySearch && window.scrollToProducts) {
                                        window.filterProductsBySearch(e.target.value);
                                        window.scrollToProducts();
                                    }
                                }
                            }}
                        />

                    </form>


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-1 my-2 my-lg-0 navbar-nav-scroll">
                            <li className="Download_link">
                                <Link className="nav-link" to="https://play.google.com/store/apps/details?id=com.meesho.supply">
                                    <i className="fa-solid fa-mobile-screen"></i> Download App
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/BecomeaSupplier">Become a Supplier</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" href="#">Newsroom</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown">
                                    <i className="fa fa-user"></i> Profile
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                    <li className="navv-item">
                                        {/* Show "Hello, Username" if user is logged in, otherwise "Hello User" */}
                                        {userInfo ? `Hello, ${userInfo.username}` : "Hello User"}
                                    </li>
                                    <li className="navv-item">To access your <br /> Meesho account</li>
                                    <li className="navv-item"> <Link to="/myorders">
                                        <button> <i className="fa-solid fa-bag-shopping"></i>  My Orders</button></Link>
                                    </li>

                                    <li className="navv-item">
                                        {/* Show logout button if user is logged in */}
                                        {userInfo ? (
                                            <button onClick={logoutHandler}> <i className="fa-solid fa-right-from-bracket"></i> Logout</button>
                                        ) : (
                                            <Link className="dropdown-item" to="/Beauty"><button> Login</button></Link>
                                        )}
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/Cart">
                                    <i className="fa-solid fa-cart-shopping"></i> Cart {cartCounter}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
            <div className="str_line_1"></div>
        </div>
    );
}

export default Navbar1;
