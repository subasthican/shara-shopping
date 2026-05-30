import { Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dresses" element={<ShopPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
