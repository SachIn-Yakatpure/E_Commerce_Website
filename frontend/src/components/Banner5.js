import React from "react";
import { Link } from "react-router-dom";

function Banner5(){
    return(
        <div className="Banner5">
             
            <img src="https://images.meesho.com/images/pow/downloadBannerDesktop_1050.webp" alt="" width="1106" height="525"/>
           
            <div className="Banner5-options">
            <h4 className="Banner5-1">Become a Reseller and</h4>
            <h1 className="Banner5-2"> Start your Online Business</h1>
            <h1 className="Banner5-3">with Zero Investment</h1>

            </div>

            <div className="Banner5-img1">
              <Link to="https://play.google.com/store/apps/details?id=com.meesho.supply&pid=pow_website&c=pow&pow_click_page_type=HP&pow_distinct_id=1935266cf79333-06f06d87b30a4-26011851-151800-1935266cf7ad49">  <img src="https://images.meesho.com/images/pow/playstoreIcon_500.webp" alt=".." width="130" height="35"/></Link>
            </div>

            <div className="Banner5-img2">
            <Link to="https://apps.apple.com/us/app/meesho-online-shopping/id1457958492">  <img src="https://images.meesho.com/images/pow/appstoreIcon_500.webp" alt=".." width="130" height="35"/></Link>
            </div>  
         
        </div>
    )
}

export default Banner5