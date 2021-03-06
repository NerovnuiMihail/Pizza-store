import { configureStore } from '@reduxjs/toolkit';
import basketSlice from './basketSlice';
import shopSlice from './shopSlice';
import buyerSlice from './buyerSlice';
import popularSlice from './popularSlice';
import combosSlice from './combosSlice';

export const store = configureStore({
  reducer: {
    shop: shopSlice,
    basket: basketSlice,
    buyer: buyerSlice,
    popular: popularSlice,
    combos: combosSlice
  }
});
