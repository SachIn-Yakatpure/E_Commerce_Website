import React, { useEffect, useState } from "react";


const ListProduct = () =>{

    const [allproducts,setAllProducts] = useState([]);

    const fetchInfo = async () =>{
        await fetch('http://localhost:7000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const remove_product = async (id) =>{
        await fetch('http://localhost:7000/removeproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',

            },
            body:JSON.stringify({id:id})
        })

        await fetchInfo();
    }



    return(
        <div className="list-product">
            <h1>All Products List</h1>

            <div className="listproduct-format-main">
                <p>Products</p> 
                <p>Title</p> 
                <p>Price</p> 
                <p>Category</p> 
                <p>Rating</p> 
                <p>Reviews</p> 
                <p>Remove</p> 

            </div>

            <div className="listproduct-allproducts">

                <hr/>
                {allproducts.map((product,index)=>{
                     return <> <div key={index} className="listproduct-format-main listproduct-format"> 
                         
                         <img className="listproduct-product-icon" src={product.image} alt=""/>
                         <p>{product.title}</p>
                         <p>${product.price}</p>
                         <p>{product.category}</p>
                         <p>{product.rating}</p>
                         <p>{product.reviews}</p>

                         <img onClick={()=>{remove_product(product.id)}} className="listproduct-remove-icon" src="https://img.freepik.com/premium-vector/reject-vector-icon-illustration-design_535345-7353.jpg?w=900" height={50} alt=""/>

                         </div>

                         <hr/>
                         </>
                })}

            </div>

        </div>

    )
}

export default ListProduct