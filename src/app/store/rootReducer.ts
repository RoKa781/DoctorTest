import { combineReducers } from '@reduxjs/toolkit';
import cardsSlice from '@/features/cardsFeature/cardsSlice';

const rootReducer = combineReducers({
    [cardsSlice.name]: cardsSlice.reducer
});

export default rootReducer;