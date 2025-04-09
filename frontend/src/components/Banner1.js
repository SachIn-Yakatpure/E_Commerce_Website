import React from "react";
import { Link } from "react-router-dom";

function Banner1(){
    return(
        <div className="Banner1">
            <h1>Lowest Prices <br/>
             Best Quality Shopping</h1> 

            <div className="Banner-options">
            <p className="Banner-option1" >
            <img src="https://images.meesho.com/images/pow/freeDelivery_jamun.svg" alt="" width="32" height="32"/>
              Free  Delivery  | 
            </p>

            <p className="Banner-option2">
            <img src="https://images.meesho.com/images/pow/cod_jamun.svg" alt="" width="32" height="32"/>
              Cash on Delivery |
            </p>

            <p className="Banner-option3">
            <img src="https://images.meesho.com/images/pow/easyReturns_jamun.svg" alt="" width="32" height="32"/>
              Easy Returns
            </p>

            </div>

            <div className="download-link">
            <img src="https://images.meesho.com/images/pow/playstoreSmallIcon.png" alt="" width="24" height="28"/>
            <Link to="https://play.google.com/store/apps/details?id=com.meesho.supply&pid=pow_website&c=pow&pow_click_page_type=HP&pow_distinct_id=1935266cf79333-06f06d87b30a4-26011851-151800-1935266cf7ad49"> <p>Download the Meesho App</p></Link> 
            </div>
           
           <div className="Banner-img">
           <img src="https://images.meesho.com/images/marketing/1731310460817_512.webp" alt="" width="520" height="348"/>
           </div>
        </div>
    )
}

export default Banner1
