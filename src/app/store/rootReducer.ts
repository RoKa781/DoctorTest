import { combineReducers } from '@reduxjs/toolkit';
import cardsSlice from '@/features/cardsFeature/cardsSlice';
import favoritesSlice from '@/features/favoritesFeature/favoritesSlice';
import productSlice from '@/features/productFeature/productSlice';

const rootReducer = combineReducers({
  [cardsSlice.name]: cardsSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [favoritesSlice.name]: favoritesSlice.reducer,
});

export default rootReducer;
