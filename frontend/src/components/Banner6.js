import React from "react";
import { Link } from "react-router-dom";

function Banner6(){
    return(
        <div className="Banner6">
         {/* <img src="https://images.meesho.com/images/pow/supplyBannerDesktop_1106.webp" alt="" width="1106" height="290"/> */}
        
        <div className="content">
         <h2>Register as a Meesho Supplier </h2>
         <p>Sell your products to crores of customers at 0% commission</p>


        <div className="Banner6-ticks" >
        <img src="https://cdn-icons-png.flaticon.com/128/5610/5610944.png" alt="." width="20" height="20" />
        <p>Grow your business 10x | <span ></span></p>

        <img src="https://cdn-icons-png.flaticon.com/128/5610/5610944.png" alt="." width="20" height="20" />
        <p  >Enjoy 100% Profit |</p>

        <img src="https://cdn-icons-png.flaticon.com/128/5610/5610944.png" alt="." width="20" height="20" />
        <p>Sell all over India |</p>
        </div>
        
        <div className="Banner6-signup"> 
          <Link to= ''style={{textDecoration:"none"}}> <p>Sign up <br/> now</p> </Link> 
        </div>

         </div>
        </div>
    )
}

export default Banner6