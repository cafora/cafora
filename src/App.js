import './App.css';
import Home from './component/Home';
import { Route, Routes } from 'react-router-dom';
import AboutUs from './component/AboutUs';
import Chocolate from './component/Chocolate';
import Testimonial from './component/Testimonial';
import ContactUs from './component/ContactUs';
import Login from './component/Login';
import authService from './component/services/authService';
import ChocolateDetails from './component/ChocolateDetails';
import Cart from './component/Cart';
import Success from './component/Success';
import Failed from './component/Failed';
import EmailVerify from './component/EmailVerifyPage';
import ForgotPassPage from './component/ForgotPass';
import ResetPassPage from './component/ResetPassPage';
import { ToastContainer } from 'react-toastify';

authService.setupAxiosInterceptors();

function App() {
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassPage />} />
        <Route path="/forgot-password" element={<ForgotPassPage />} />
        <Route path="/about" element={ <AboutUs/> } />
        <Route path="/choco" element={ <Chocolate/> } />
        <Route path="/chocolate/:id" element={<ChocolateDetails />} />
        <Route path="/test-slider" element={ <Testimonial/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/contact" element={ <ContactUs/> } />
        <Route path="/cart" element={ <Cart/> } />
        <Route path="/success" element={ <Success/> } />
        <Route path="/cancel" element={ <Failed/> } />
      </Routes>
    </>
  );
}

export default App;
