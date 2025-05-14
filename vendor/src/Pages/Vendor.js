import React from 'react';
import './Vendor.css'
import Sidebar from '../components/Sidebar';
import { Routes,Route } from 'react-router-dom';
import AddProduct from '../components/AddProduct';
import ListProduct from '../components/ListProduct';

function Vendor() {
  return (
    <div className='vendor' >
        <Sidebar/>
        <Routes>

          <Route path='/addproduct' element={<AddProduct/>} />
          <Route path='/listproduct' element={<ListProduct/>} />
          
         
        </Routes>

      
    </div>
  );
}

export default Vendor;
