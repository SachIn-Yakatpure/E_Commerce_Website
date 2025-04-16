import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import { useDispatch } from 'react-redux';
import { incrementCartCounter, decrementCartCounter } from '../actions/cartActions';

function CartDetails() {

    const cartItems = useSelector(state => state.cart.cartItems);
    const cartCounter = useSelector(state => state.cart.cartCounter);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const deliveryCharges = useSelector(state => state.cart.deliverCharges);
    const taxes = useSelector(state => state.cart.taxes);
    const grandTotal = useSelector(state => state.cart.grandTotal);

    const dispatch = useDispatch();

    const handleIncrement = (id) => {
        dispatch(incrementCartCounter(id));
      };
      
      const handleDecrement = (id) => {
        dispatch(decrementCartCounter(id));
      };      


    return (

        <div>
            <div className=" bg-white mt-1 ">
               
               <div className="cart-nav"> < Navbar1 /></div>
                {cartItems.length ?
                    <div className="row mt-5">

                        <h3 style={{paddingLeft:50}}>Product Details</h3>
                        <div className="col-md-8 shadow">
                            <div className="row border-bottom py-3">
                                <div className="col-md-8" style={{paddingLeft:50}}> Item</div>
                                <div className="col-md-2"> Cost </div>
                                <div className="col-md-1"> Qty </div>
                                <div className="col-md-1">Total </div>
                            </div>


                            <div className="container">
                                {cartItems.map(item =>
                                    <div className="row borderp-2 py-4" key={item.id}>
                                        <div className="col-md-8 d-flex">
                                            <img src={item.image} alt={item.title} style={{ width: "40px", height: "40px" }} />
                                            <h6 className="ps-3">{item.title}</h6>
                                        </div>

                                        <div className="col-md-1">
                                            <p className="text-end">{item.price}</p>
                                        </div>
 
 
                                        <div className="col-md-2">
                                            <p className="text-end"><button className="cart-btns" onClick={()=>handleDecrement(item.id)}>-</button> {item.quantity } <button className="cart-btns" onClick={()=> handleIncrement(item.id)}>+</button></p>  
                                        </div>

                                        <div className="col-md-1">
                                            <p className="text-end">{item.total_item_price.toFixed(2)}</p>
                                        </div>

                                    </div>

                                )}

                                <hr></hr>

                                <div className="row mb-2 py-3 pe-3">
                                    <div className="offset-md-9 col-md-1">
                                        <h5 className="text-end"> Total</h5>
                                    </div>

                                    <div className="col-md-1">
                                        <h5 className="text-end"> {cartCounter}</h5>
                                    </div>

                                    <div className="col-md-1">
                                        <h5 className="text-end"> {totalPrice.toFixed(2)}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">

                            <div className="shadow p-2 mx-2 pb-5">
                                <div className="d-flex justify-content-between px-2">
                                    <p>Sub Total</p> <p>{totalPrice.toFixed(2)}</p>
                                </div>


                                <div className="d-flex justify-content-between px-2">
                                    <p>Delivery Charges</p> <p>{deliveryCharges.toFixed(2)}</p>
                                </div>

                                <div className="d-flex justify-content-between px-2">
                                    <p>Tax</p> <p>{taxes.toFixed(2)}</p>
                                </div>

                                <div className="d-flex justify-content-between px-2">
                                    <p>Total</p> <p>{grandTotal.toFixed(2)}</p>
                                </div>

                             <div className="m-2">  <Link > <button  className="btn btn-dark">Proceed to Checkout</button></Link> </div>
                            </div>
                        </div>
                    </div>
                    :

                    <div className="empty-cart">
                        <img src="https://media.istockphoto.com/id/1352766190/vector/shopaholic-woman-running-with-an-empty-shopping-cart.jpg?s=612x612&w=0&k=20&c=2f0fEX7DqmYbkgY1l5w2-GLwCmLMTFLASnW-UyiPaX4=" 
                        alt="" width="250" height="250" />

                        <h1>Your cart is empty</h1>
                        <p>Just relax, let us help you find some first-class products</p>
                        <Link to='/'><button > Start Shopping</button></Link>
                    </div>}
            </div>
            <div className="footer2"><Footer/></div>
        </div>




    )

};


export default CartDetails

