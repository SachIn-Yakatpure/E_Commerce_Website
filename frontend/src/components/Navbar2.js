import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar2(){
    return(
        <div className="Navbar2">
           <nav className="navbar navbar-expand-lg navbar-light bg-white ">
  <div className="container-fluid">
   
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
      
      <li className="nav-item ">
            Women Ethnic
        
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
         Home & Kitchen

        </li>
      
        <li className="nav-item">
          Beauty & Health
        </li>
      
        <li className="nav-item">
          Jewellery & Accessories
        </li>
      
        <li className="nav-item">
          Bags & Footwear
        </li>
      
        <li className="nav-item">
          Electronics
        </li>
      
        
      </ul>
    </div>
  </div>
</nav>
<Outlet/>
<div className="hrr"><hr/></div>
        </div>
    )
}

export default Navbar2