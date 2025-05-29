import React from "react";
import {Link} from "react-router-dom";

const Sidebar = () =>{

    return(

        <div className="Sidebar">
          
          
            <Link to={'/addproduct'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">

                    <img src="https://i.pinimg.com/736x/69/6e/b9/696eb9cb731e0234920d5e4d4e9bfcb5.jpg" alt="" height={100}/>
                    <h3>Add Product</h3>
                </div>
            </Link>


            <Link to={'/listproduct'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">

                    <img src="https://cdn-icons-png.freepik.com/512/305/305100.png" alt="" height={90}/>
                    <h3>Product List</h3>
                </div>
            </Link>
            <div className="vrt-line"></div>


        </div>
    )
}

export default Sidebar