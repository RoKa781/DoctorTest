import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { fetchFavorites } from '@/features/favoritesFeature/favoritesSlice';
import AddProductPage from '@/pages/AddProductPage';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/NotFound404Page';
import ProductPage from '@/pages/ProductPage';
import { useDispatch } from './store/store';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    prevPathname.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainPage prevPath={prevPathname.current} />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/product-create" element={<AddProductPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
