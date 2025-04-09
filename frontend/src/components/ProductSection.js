import React, { useEffect, useState } from "react";
// import Products from "../products";
import { Link } from "react-router-dom";
import setCurrentProduct from "../actions/setCurrentProduct"
import { useDispatch } from 'react-redux'
// import { useEffect } from "react";

const ProductSection = ({product}) => {



    // const getProducts = ()=>{
    //     fetch("/api/Products")
    //     .then(res => res.json())
    //     .then(json => console.log(json)
    //     )
    // }

    // useEffect(()=>{
    //     getProducts()
    // },[])

        

    const [Products,setAll_Products] = useState([]);

     useEffect (()=>{
        fetch('http://localhost:7000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Products(data))
    },[])

// ===================

    
    
    let dispatch = useDispatch()
    let handleCurrentProduct = () =>{
      
      dispatch(setCurrentProduct(product))
    }

    const [data,setData] = useState(Products);
    const filterResult = (catItem) =>{
        const result = Products.filter((curData)=>{
            return curData.category === catItem;
        });
        setData(result);

    }
    return (
        <div>
            <h1>Products For You</h1>
            <div className="container-fluid ">
                <div className="row mt-2 ">
                    <div className="col-md-3">
                    <div className="str_line_4"></div>
                    <h3>Category :</h3>
                    <p>Click on <b> 'All Products'</b> to view the complete list of available products.</p>
                        <div className="catogory-btns">
                        <button onClick={()=>setData(Products)}  > All Products </button>
                        <button onClick={()=>filterResult('Men')} > Men </button>
                        <button onClick={()=>filterResult('Women')} > Women </button>
                        <button onClick={()=>filterResult('Kids')} > Kids </button>
                        <button onClick={()=>filterResult('Footware')} > Footware </button>
                        <button onClick={()=>filterResult('Decor')} > Home Decor </button>
                        <button onClick={()=>filterResult('Accessories')} > Accessories </button>
                        <button onClick={()=>filterResult('Electronics')} > Electronics </button>

                        </div>
                        

                    </div>


                    <div className="col-md-9">

                        <div className="row">

                            {data.map((product)=> {

                                    
                                // const {id,title,price,image,rating,reviews}= values;

                                return(

                                    <>
                                
                                <div className="col-md-3 mb-4 " key={product.id} product={product}>
                               
                                <Link onClick={handleCurrentProduct} to={`/details/${product.id}`} key={product.id}style={{textDecoration:"none"}}>
                                <div className="card" >
                                    <img src= {product.image} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <h4 className="Price"> &#8377; {product.price}</h4>
                                        <p className="card-text">Free Delivery </p>
                                        <div className="ratings">
                                            <h4>{product.rating}</h4>
                                            <img src="https://www.meesho.com/assets/svgicons/star.svg" alt=".." style={{ height: 10, width: 10, marginTop:6, marginLeft:4 }} />
                                            <h5 className="reviews">({product.reviews})</h5>
                                        </div>
                                        
                                        

                                    </div>
                                </div>

                                </Link>

                                
                            </div>
                                    
                                    
                                    </>
                                )
                            })}

                            
                        </div>
                    </div>


                </div>

            </div>





        </div>



    )
}

export default ProductSection