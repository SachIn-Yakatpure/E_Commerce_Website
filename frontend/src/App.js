import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  // Import from Redux
import { useEffect } from 'react';
import { loadUserCart } from './actions/cartActions';  // Adjust path if needed

// Import pages
import Home from './pages/Home';
import Beauty from './pages/Beauty';
import Electronics from './pages/Electronics';
import Jewellery from './pages/Jewellery';
import Kids from './pages/Kids';
import Kitchen from './pages/Kitchen';
import Men from './pages/Men';
import BecomeaSupplier from './pages/BecomeaSupplier';
import WomenWestern from './pages/WomenWestern';
import Details from './pages/Details';
import Cart from './pages/Cart';
import Success from './pages/succes';
import Cancel from './pages/cancel';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);  // Assuming user login state holds user info
  const fullState = useSelector((state) => state);

  // When the component mounts, load the user's cart if logged in
  useEffect(() => {
    if (userInfo?.token) {
      dispatch(loadUserCart(userInfo));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    console.log("🧾 Full Redux state:", fullState);
  }, [fullState]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='/BecomeaSupplier' element={<BecomeaSupplier />} />
          <Route path='/womenWestern' element={<WomenWestern />} />
          <Route path='/men' element={<Men />} />
          <Route path='/kids' element={<Kids />} />
          <Route path='/kitchen' element={<Kitchen />} />
          <Route path='/beauty' element={<Beauty />} />
          <Route path='/jewellery' element={<Jewellery />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path='/electronics' element={<Electronics />} />
          <Route path='/Cart'element={<PrivateRoute> <Cart /> </PrivateRoute>}/>
          
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
