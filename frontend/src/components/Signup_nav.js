import React from "react";
import { Link, Outlet } from "react-router-dom";



function Signup_nav(){
    return(
    
            <div className="Signup_nav">
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-black">
            <div className="container-fluid">
            <Link className="navbar-brand" href="/">
            <img src="https://www.meesho.com/assets/svgicons/meeshoLogo.svg" alt="" width="156" height="36"/>
            </Link>

            <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="  Try Saree, Kurti or Search by Product Code" aria-label="Search"/>
            
        </form>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-2 my-2 my-lg-0 navbar-nav-scroll" >
          
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" href="#">Download App <i class="fa-duotone fa-solid fa-pipe"></i></Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/BecomeaSupplier">Become a Supplier </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" aria-current="page" href="#">Newsroom</Link>
          </li>
          
        

     
        </ul>
        
    </div>
    
  </div>
  
</nav>
<Outlet/>

        </div>
            
      
    )
}

export default Signup_nav