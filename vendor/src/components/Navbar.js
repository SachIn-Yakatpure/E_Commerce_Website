import React from 'react';
// import meeshologo from "./Assets/meesho.svg"


const Navbar = () =>{
    return(
        <div className="navbar">
            <img className='img1' src="https://www.meesho.com/assets/svgicons/meeshoLogo.svg" alt=""width="156" height="36"/>
            <img className='img2' src="https://www.federationcouncil.nsw.gov.au/files/assets/public/v/1/image-library/logos/vendorpanel-logo-2018-rgb-1.jpg?w=1972&h=563" alt=""width="256" height="80"/>
            <img className='img3' src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg" alt=""width="80" height="80"/>
            {/* <img src={meeshologo} alt=""width="156" height="36"/> */}
            
        </div>
        
    )
}

export default Navbar