import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx';

const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const AddEditProductPage = lazy(() => import('./pages/AddEditProductPage.jsx'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage.jsx'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage.jsx'));
const AdminSettingsPage = lazy(() => import('./pages/AdminSettingsPage.jsx'));
const CategoryPage = lazy(() => import('./pages/CategoryPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const ManageCategoriesPage = lazy(() => import('./pages/ManageCategoriesPage.jsx'));
const ManageContactMessagesPage = lazy(() => import('./pages/ManageContactMessagesPage.jsx'));
const ManageCustomersPage = lazy(() => import('./pages/ManageCustomersPage.jsx'));
const ManageOrdersPage = lazy(() => import('./pages/ManageOrdersPage.jsx'));
const ManageProductsPage = lazy(() => import('./pages/ManageProductsPage.jsx'));
const OccasionPage = lazy(() => import('./pages/OccasionPage.jsx'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage.jsx'));
const ShopPage = lazy(() => import('./pages/ShopPage.jsx'));
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage.jsx'));
const ViewOrderDetailsPage = lazy(() => import('./pages/ViewOrderDetailsPage.jsx'));
const WishlistCartPage = lazy(() => import('./pages/WishlistCartPage.jsx'));

export default function App() {
  return (
    <Suspense fallback={<RouteLoading />}>
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
    </Suspense>
  );
}

function AdminPage({ children }) {
  return <ProtectedAdminRoute>{children}</ProtectedAdminRoute>;
}

function RouteLoading() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#fffaf7] px-4 text-center text-ink">
      <div>
        <div className="mx-auto h-12 w-12 rounded-full border-4 border-[#eadfd8] border-t-rosewood" />
        <p className="mt-4 font-serif text-2xl text-rosewood">Shara Shopping</p>
        <p className="mt-2 text-sm text-neutral-600">Loading page...</p>
      </div>
    </div>
  );
}
