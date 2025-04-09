
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Beauty from './pages/Beauty'
import Electronics from './pages/Electronics'
import Jewellery from './pages/Jewellery'
import Kids from './pages/Kids'
import Kitchen from './pages/Kitchen'
import Men from './pages/Men'
import BecomeaSupplier from './pages/BecomeaSupplier';
import WomenWestern from './pages/WomenWestern';
import Details from './pages/Details'
import Cart from './pages/Cart';
import ProductDetails from './components/ProductDetails';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route index element={<Home/>} />
        <Route path='/BecomeaSupplier' element={<BecomeaSupplier/>} />
        <Route path='/womenWestern' element={<WomenWestern/>} />
        <Route path='/men' element={<Men/>} />
        <Route path='/kids' element={<Kids/>} />
        <Route path='/kitchen' element={<Kitchen/>} />
        <Route path='/beauty' element={<Beauty/>} />
        <Route path='/jewellery' element={<Jewellery/>} />

        <Route path='/details' element={<Details/>} >
          <Route path=':productId'element={<Details/>}/>
          </Route>
        <Route path='/Cart' element={<Cart/>} />
      
        <Route path='/electronics' element={<Electronics/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
