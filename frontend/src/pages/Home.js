import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";
import Navbar1 from "../components/Navbar1";
import Banner1 from "../components/Banner1";
import Banner2 from "../components/Banner2";
import Banner3 from "../components/Banner3";
import Banner4 from "../components/Banner4";
import Banner5 from "../components/Banner5";
import Banner6 from "../components/Banner6";
import Footer from "../components/Footer";
import ProductSection from "../components/ProductSection";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="Home">
            <Navbar1 searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Navbar2 />
            <Banner1 />
            <div className="top-categories">
                <div className="strt-line"> </div>
                <h1>Top Categories to choose from</h1>
                <div className="strt-line"> </div>
            </div>
            <Banner2 />
            <Banner3 />
            <Banner4 />
            <Banner5 />
            <Banner6 />
            <div className="row">
                <ProductSection searchQuery={searchQuery} />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Home;

