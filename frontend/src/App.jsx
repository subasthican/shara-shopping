import { Route, Routes } from 'react-router-dom';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminSettingsPage from './pages/AdminSettingsPage.jsx';
import AddEditProductPage from './pages/AddEditProductPage.jsx';
import ManageCategoriesPage from './pages/ManageCategoriesPage.jsx';
import ManageCustomersPage from './pages/ManageCustomersPage.jsx';
import ManageOrdersPage from './pages/ManageOrdersPage.jsx';
import ManageProductsPage from './pages/ManageProductsPage.jsx';
import ViewOrderDetailsPage from './pages/ViewOrderDetailsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import OccasionPage from './pages/OccasionPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import TrackOrderPage from './pages/TrackOrderPage.jsx';
import WishlistCartPage from './pages/WishlistCartPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dresses" element={<ShopPage />} />
      <Route path="/categories/:categorySlug" element={<CategoryPage />} />
      <Route path="/occasion" element={<OccasionPage />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/track-order" element={<TrackOrderPage />} />
      <Route path="/wishlist" element={<WishlistCartPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/settings" element={<AdminSettingsPage />} />
      <Route path="/admin/products" element={<ManageProductsPage />} />
      <Route path="/admin/categories" element={<ManageCategoriesPage />} />
      <Route path="/admin/customers" element={<ManageCustomersPage />} />
      <Route path="/admin/orders" element={<ManageOrdersPage />} />
      <Route path="/admin/orders/:orderId" element={<ViewOrderDetailsPage />} />
      <Route path="/admin/products/new" element={<AddEditProductPage />} />
    </Routes>
  );
}
