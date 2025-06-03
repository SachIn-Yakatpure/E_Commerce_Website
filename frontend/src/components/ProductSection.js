import React, { useEffect, useState } from "react";
// import Products from "../products";
import { Link } from "react-router-dom";
import setCurrentProduct from "../actions/setCurrentProduct"
import { useDispatch } from 'react-redux'
// import { useEffect } from "react";

const ProductSection = ({ product, searchQuery }) => {


    const [Products, setAll_Products] = useState([]);

    useEffect(() => {
        fetch('http://localhost:7000/allproducts')
            .then((response) => response.json())
            .then((data) => {
                setAll_Products(data);
                setData(data); // Also initialize the displayed data
            });
            console.log("Fetched product reviews:", data.reviews);


    }, []);

    // ===================



    let dispatch = useDispatch()
    let handleCurrentProduct = (product) => {

        dispatch(setCurrentProduct(product))
    }

const [data, setData] = useState([]);

    useEffect(() => {
        // If there's a search query, filter the products
        if (searchQuery && searchQuery.trim() !== "") {
            const filtered = Products.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setData(filtered);
        } else {
            setData(Products);
        }
    }, [searchQuery, Products]);


    const filterResult = (catItem) => {
        const result = Products.filter((curData) =>
            curData.category.trim().toLowerCase() === catItem.trim().toLowerCase()
        );
        setData(result);
    };


    const scrollToProducts = () => {
        const productSection = document.getElementById("product-section");
        if (productSection) {
            productSection.scrollIntoView({ behavior: "smooth" });
        }
    };
    window.scrollToProducts = scrollToProducts;
    window.filterProductsBySearch = filterResult;


    return (
        <div id="product-section">
            <h1>Products For You</h1>
            <div className="container-fluid ">
                <div className="row mt-2 ">
                    <div className="col-md-3">
                        <div className="str_line_4"></div>
                        <h3>Category :</h3>
                        <p>Click on <b> 'All Products'</b> to view the complete list of available products.</p>
                        <div className="catogory-btns">
                            <button onClick={() => setData(Products)}  > All Products </button>
                            <button onClick={() => filterResult('Men')} > Men </button>
                            <button onClick={() => filterResult('Women')} > Women </button>
                            <button onClick={() => filterResult('Kids')} > Kids </button>
                            <button onClick={() => filterResult('Footware')} > Footware </button>
                            <button onClick={() => filterResult('Decor')} > Home Decor </button>
                            <button onClick={() => filterResult('Accessories')} > Accessories </button>
                            <button onClick={() => filterResult('Electronics')} > Electronics </button>

                        </div>
                    </div>

                    <div className="col-md-9">

                        <div className="row">
                          {data.map((product) => (
  <div className="col-md-3 mb-4" key={product._id}>
    <Link onClick={() => handleCurrentProduct(product)} to={`/details/${product._id}`} style={{ textDecoration: "none" }}>
      <div className="card">
        <img src={product.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <h4 className="Price"> &#8377; {product.price}</h4>
          <p className="card-text">Free Delivery</p>
          <div className="ratings">
            <h4>{product.rating.toFixed(1)}</h4>
            <img src="https://www.meesho.com/assets/svgicons/star.svg" alt=".." style={{ height: 10, width: 10, marginTop: 6, marginLeft: 4 }} />
            {/* <h5 className="reviews">({product.reviews})</h5> */}
          </div>
        </div>
      </div>
    </Link>
  </div>
))}


                        </div>
                    </div>


                </div>

            </div>





        </div>



    )
}

export default ProductSection