import React from "react";
import Navbar1 from "../components/Navbar1";
import Navbar2 from "../components/Navbar2";
import { useSelector } from "react-redux";
import ProductDetails from "../components/ProductDetails";


let Details = () =>{

    let product = useSelector ((state)=> state.currentProduct.product)
    
   
    return(
        <div>

        <div className="container-fluid">
            <Navbar1/>
            <Navbar2/>

       </div>

       <div>

            <ProductDetails product = {product}/>
       </div>

       </div>


    )
}

export default Details