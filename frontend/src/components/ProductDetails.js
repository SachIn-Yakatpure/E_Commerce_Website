
import React, { useEffect, useState } from "react";
import './ProductDetails.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";

const ProductDetails = () =>{
     
    const {id} = useParams();
    const [product,setAll_Products] = useState(null);
    

    useEffect(()=>{
        console.log("Fetching product with id:",id);
        
        fetch(`http://localhost:7000/allproducts/${id}`)
        .then((res)=> res.json())
        .then((data)=> setAll_Products(data))
        .catch((err)=>console.error(err));
    },[id]);


    // console.log(product.id);

    // ======

    const dispatch = useDispatch();

    const handleCart = () =>{
        dispatch(addToCart(product));
        Swal.fire({
            title: "Item added to cart!",
            icon: "success",
            draggable: true
          });
          
    }
   


    return(
        <div>       
           
        <div className="product-detail" product={product}>
      
        <div className="product-images" >
            <img src={product?.image} alt="Main Product Image"
                className="main-image"/>
            {/* <div className="thumbnail-images">
                <img src={product?.image} alt="Thumbnail 1"/>
                <img src={product?.image} alt="Thumbnail 2"/>
            </div> */}
        </div>

        
        <div className="product-info">
            <h1>{product?.title}</h1>
            <p className="price">&#8377;{product?.price}</p>


            <div className="product-discription">
                <h2> Product Details</h2>
                <div className="reviews1"><p>{product?.rating}</p> <p>({product?.reviews})</p>
                </div>
                <hr/>


            </div>
            
           

           
            {/* <div className="options">
                <p className="option-label">Color Options:</p>
                <div className="option-buttons">
                    <button className="active">Black</button>
                    <button>White</button>
                    <button>Blue</button>
                </div>
            </div> */}

            {/* <div className="options">
                <p className="option-label">Connectivity:</p>
                <div className="option-buttons">
                    <button className="active">Bluetooth</button>
                    <button>Wired</button>
                </div>
            </div> */}

            <div className="actions_wrraper">
                            
                <div className="actions">
                    <button className="add-to-cart" onClick={handleCart}> <i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                    <Link to={'/Cart'}><button className="buy-now"><i class="fa-solid fa-angles-right"></i> Buy Now</button></Link> 
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
            <Footer/>
            </div>


            </div>
            
    )
}

export default ProductDetails