import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar2(){
    return(
        <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-white ">
  <div className="container-fluid">
   
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
      
      <li className="nav-item dropdown">
            Women Ethnic
          

          <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
            <li><Link className="dropdown-item" href="#">All Women Ethnic</Link></li>
            <li><Link className="dropdown-item" href="#">View All</Link></li>
          </ul>

          
          <ul className="dropdown-menu" >
            <li><Link className="dropdown-item" href="#">All </Link></li>
            <li><Link className="dropdown-item" href="#">View All</Link></li>
          </ul>

          <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
            <li><Link className="dropdown-item" href="#">All Women Ethnic</Link></li>
            <li><Link className="dropdown-item" href="#">View All</Link></li>
          </ul>

          <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
            <li><Link className="dropdown-item" href="#">All Women Ethnic</Link></li>
            <li><Link className="dropdown-item" href="#">View All</Link></li>
          </ul>

          <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
            <li><Link className="dropdown-item" href="#">All Women Ethnic</Link></li>
            <li><Link className="dropdown-item" href="#">View All</Link></li>
          </ul>


        </li>

        <li className="nav-item">
           Women Western
        </li>
      
        <li className="nav-item">
           Men
        </li>
      
        <li className="nav-item">
           Kids
        </li>
      
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/Kitchen">Home & Kitchen</Link>

        </li>
      
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="">Beauty & Health</Link>
        </li>
      
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/Jewellery">Jewellery & Accessories</Link>
        </li>
      
        <li className="nav-item">
          Bags & Footwear
        </li>
      
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/Electronics">Electronics</Link>
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

export default Navbar2