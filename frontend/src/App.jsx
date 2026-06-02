import { Route, Routes } from 'react-router-dom';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminSettingsPage from './pages/AdminSettingsPage.jsx';
import AddEditProductPage from './pages/AddEditProductPage.jsx';
import ManageCategoriesPage from './pages/ManageCategoriesPage.jsx';
import ManageContactMessagesPage from './pages/ManageContactMessagesPage.jsx';
import ManageCustomersPage from './pages/ManageCustomersPage.jsx';
import ManageOrdersPage from './pages/ManageOrdersPage.jsx';
import ManageProductsPage from './pages/ManageProductsPage.jsx';
import ViewOrderDetailsPage from './pages/ViewOrderDetailsPage.jsx';
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx';
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
      <Route path="/admin/dashboard" element={<AdminPage><AdminDashboardPage /></AdminPage>} />
      <Route path="/admin/settings" element={<AdminPage><AdminSettingsPage /></AdminPage>} />
      <Route path="/admin/products" element={<AdminPage><ManageProductsPage /></AdminPage>} />
      <Route path="/admin/categories" element={<AdminPage><ManageCategoriesPage /></AdminPage>} />
      <Route path="/admin/customers" element={<AdminPage><ManageCustomersPage /></AdminPage>} />
      <Route path="/admin/messages" element={<AdminPage><ManageContactMessagesPage /></AdminPage>} />
      <Route path="/admin/orders" element={<AdminPage><ManageOrdersPage /></AdminPage>} />
      <Route path="/admin/orders/:orderId" element={<AdminPage><ViewOrderDetailsPage /></AdminPage>} />
      <Route path="/admin/products/new" element={<AdminPage><AddEditProductPage /></AdminPage>} />
      <Route path="/admin/products/:productId/edit" element={<AdminPage><AddEditProductPage /></AdminPage>} />
    </Routes>
  );
}

function AdminPage({ children }) {
  return <ProtectedAdminRoute>{children}</ProtectedAdminRoute>;
}
