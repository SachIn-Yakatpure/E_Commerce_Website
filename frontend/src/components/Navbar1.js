import React from "react";
import { Link, Outlet } from "react-router-dom";
import {useSelector} from "react-redux";

function Navbar1(){
  const cartCounter = useSelector(state => state.cart.cartCounter); // used for accessing the cart property
    return(
      
        <div className="Navbar1">

            <nav className="navbar navbar-expand-lg navbar-light bg-white border-black">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/">
            <img  src="https://www.meesho.com/assets/svgicons/meeshoLogo.svg" alt="" width="156" height="36"/>
            </Link>

            <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder= " Try Saree, Kurti or Search by Product Code" aria-label="Search"/>
            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
        </form>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-1 my-2 my-lg-0 navbar-nav-scroll" >
          
          <li className="Download_link">
          <Link className="nav-link" aria-current="page" to="https://play.google.com/store/apps/details?id=com.meesho.supply&pid=pow_website&c=pow&pow_click_page_type=HP&pow_distinct_id=1935266cf79333-06f06d87b30a4-26011851-151800-1935266cf7ad49"> <i class="fa-solid fa-mobile-screen"></i>  Download App </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/BecomeaSupplier">Become a Supplier </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" aria-current="page" href="#">Newsroom</Link>
          </li>
          
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa fa-user"></i> 
              Profile
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
             
              <li className="navv-item">Hello User</li>
             <li className="navv-item">To access your <br/> Meesho account</li>
             <li className="navv-item"> {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
              :<Link className="dropdown-item" aria-current="page" to="/Beauty"><button>Login</button></Link>}
               </li>
              {/* <li className="navv-item">My Orders</li> */}
              {/* <li><hr className="dropdown-divider"></li> */}
              {/* <li className="navv-item">Delete Account</li> */}

            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/Cart"> <i class="fa-solid fa-cart-shopping"></i>  Cart {cartCounter}</Link>
            </li>
          
        </ul>
        
    </div>
   
  </div>
  
</nav>
<Outlet/>
<div className="str_line_1"></div>
        </div>
       
        
    )
}

export default Navbar1