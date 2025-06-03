import React, { useEffect, useState } from "react";


const ListProduct = () => {

    const [allproducts, setAllProducts] = useState([]);
    const [updatedQuantity, setUpdatedQuantity] = useState({});

    const fetchInfo = async () => {
        await fetch('http://localhost:7000/allproducts')
            .then((res) => res.json())
            .then((data) => { setAllProducts(data) });
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        await fetch('http://localhost:7000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ id: id })
        })

        await fetchInfo();
    }

    const updateProductQuantity = async (id) => {
        const quantity = Number(updatedQuantity[id]);

        if (!isNaN(quantity) && quantity >= 0) {
            console.log('Sending update for ID:', id, 'with quantity:', quantity);

            try {
                const response = await fetch(`http://localhost:7000/vendor/update-quantity/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity }),
                });

                if (!response.ok) {
                    alert("Failed to update product quantity");
                    return;
                }

                const data = await response.json();

                if (data.message && data.message.toLowerCase().includes('stock updated')) {
                    alert("Product quantity updated successfully");
                    setUpdatedQuantity((prev) => ({ ...prev, [id]: 0 }));
                    await fetchInfo();
                } else {
                    alert("Failed to update product quantity");
                }
            } catch (error) {
                console.error("Error updating quantity:", error);
                alert("Error updating product quantity");
            }
        } else {
            alert("Please enter a valid quantity");
        }
    };


    return (
        <div className="list-product">
            <h1>All Products List</h1>


            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Category</p>
                {/* <p>Rating</p>
                <p>Reviews</p> */}
                <p>Total Quantity</p>
                <p>Current Quantity</p>
                <p>Last Added</p>
                <p>Remove</p>


            </div>

            <div className="listproduct-allproducts">

                <hr />
                {allproducts.map((product) => {
                    return <> <div key={product._id} className="listproduct-format-main listproduct-format">

                        <img className="listproduct-product-icon" src={product.image} alt="" />
                        <p>{product.title}</p>
                        <p>${product.price}</p>
                        <p>{product.category}</p>
                        {/* <p>{product.rating}</p>
                        <p>{product.reviews?.length || 0} reviews</p> */}
                        <p>{product.totalQuantity}</p>
                        <p>
                            {product.currentQuantity === 0 ? (
                                <span style={{ color: 'red', fontWeight: 'bold' }}>Out of Stock</span>
                            ) : (
                                <span>{product.currentQuantity}</span>
                            )}
                        </p>
                        <p>{product.updatedQuantity || 0} added</p>

                        <input style={{ width: 30 }}
                            type="number"
                            value={updatedQuantity[product._id] || ''}
                            onChange={(e) => {
                                const newQuantity = { ...updatedQuantity, [product._id]: e.target.value };
                                setUpdatedQuantity(newQuantity);
                                console.log('Updated Quantity:', newQuantity);
                            }}
                            min="0"
                        />
                        <button onClick={() => updateProductQuantity(product._id)}>Update</button>

                        <img onClick={() => { remove_product(product.id) }} className="listproduct-remove-icon" src="https://img.freepik.com/premium-vector/reject-vector-icon-illustration-design_535345-7353.jpg?w=900" height={50} alt="" />

                    </div>

                        <hr />
                    </>
                })}

            </div>

        </div>

    )
}

export default ListProduct