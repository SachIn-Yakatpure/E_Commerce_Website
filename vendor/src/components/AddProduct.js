import React, { useState } from "react";


const AddProduct = () =>{

    const [image,setImage] = useState(false);

    const [productDetails,setProductDetails] = useState({
 
        title: "",
        image: "",
        price: "",
        category: "Men",
        rating: "",
        reviews: "",
        quantity:"",


    })


    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }

    const changeInput = (e) => {
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }

   
    const Add_Product = async () =>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:7000/upload',{
            method: 'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then((data)=> {responseData = data});

        if (responseData.success) {
            
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:7000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'applcation/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=> resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            }) 
            
        }
        
    }

    return(
        <div className="add-product">

            <div className="addproduct-itemfield">
            <p> Product title</p>
            <input value={productDetails.title} onChange={changeInput} type="text" name="title" placeholder="Type here" />
            </div>

            <div className="addproduct-reviews">
            <div className="addproduct-itemfield">
                    <p> Product Ratings</p>
                    <input value={productDetails.rating} onChange={changeInput} type="text" name="rating" placeholder="Type here" />

            </div>
            

            <div className="addproduct-itemfield">
                    <p> Product Reviews</p>
                    <input value={productDetails.reviews}  onChange={changeInput} type="text" name="reviews" placeholder="Type here" />

            </div>

            </div>


            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.price} onChange={changeInput} type="text" name="price" placeholder="Type here" />

                </div>
            </div>    
            

            <div className="addproduct-itemfield">
                    <p> Product Category</p>
                    <select value={productDetails.category} onChange={changeInput} name="category" className="add-product-selector">
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                        <option value="Footware">Footware</option>
                        <option value="Decor">Home Decor</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Electronics">Electronics</option>
                    </select>

            </div>

            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Quantity</p>
                    <input value={productDetails.quantity} onChange={changeInput} type="text" name="quantity" placeholder="Type here" />

                </div>
            </div> 

            <div className="addproduct-itemfield" >
                <label htmlFor="file-input">
                    <img src= {image?URL.createObjectURL(image): "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg" }height={100}  className="addproduct-thumbnail-image" />

                </label>


                <input onChange={imageHandler}  type="file" name="image" id="file-input" hidden/>
            </div>

            <button onClick={()=>{Add_Product()}} className="addproduct-btn">Add</button>

            
        </div>

    )
}

export default AddProduct