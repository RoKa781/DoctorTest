import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosConfig from '@/config/axiosConfig';
import { TCharacter, TStatus } from '@/types';

type ProductState = {
  product: TCharacter | null;
  status: TStatus;
  error: string | null;
};

const initialState: ProductState = {
  product: null,
  status: 'idle',
  error: null,
};

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id: string) => {
    const response = await axiosConfig.get(`character/${id}`);
    return response.data;
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Произошла ошибка';
      });
  },
});

export default productSlice;
