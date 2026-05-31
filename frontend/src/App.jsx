import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import TrackOrderPage from './pages/TrackOrderPage.jsx';
import WishlistCartPage from './pages/WishlistCartPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dresses" element={<ShopPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/track-order" element={<TrackOrderPage />} />
      <Route path="/wishlist" element={<WishlistCartPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
    </Routes>
  );
}
