import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  // Import from Redux
import { useEffect } from 'react';
import { loadUserCart } from './actions/cartActions';
import { useState } from 'react';

// Import pages
import Home from './pages/Home';
import Beauty from './pages/Beauty';
import Details from './pages/Details';
import Cart from './pages/Cart';
import Success from './pages/succes';
import Cancel from './pages/cancel';
import PrivateRoute from './components/PrivateRoute';
import MyOrders from './pages/MyOrders';


function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);  // Assuming user login state holds user info
  const fullState = useSelector((state) => state);
  const [shouldLoadCart, setShouldLoadCart] = useState(true);

  // When the component mounts, load the user's cart if logged in
  useEffect(() => {
    if (userInfo?.token && shouldLoadCart) {
      dispatch(loadUserCart(userInfo));
    }
  }, [dispatch, userInfo, shouldLoadCart]);

  useEffect(() => {
    console.log("🧾 Full Redux state:", fullState);
  }, [fullState]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/beauty' element={<Beauty />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path="/success" element={<Success setShouldLoadCart={setShouldLoadCart} />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path='/Cart' element={<PrivateRoute> <Cart /> </PrivateRoute>} />
        <Route path="/myorders" element={<MyOrders />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
