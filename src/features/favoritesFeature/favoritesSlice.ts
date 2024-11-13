import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosConfig from '@/config/axiosConfig';
import { TCharacter, TStatus } from '@/types';

type FilterState = {
  favorites: TCharacter[];
  status: TStatus;
  error: string | null;
};

const initialState: FilterState = {
  favorites: [],
  status: 'idle',
  error: null,
};

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];

      const characters = await Promise.all(
        favoriteIds.map(async (id: number) => {
          const response = await axiosConfig.get(`/character/${id}`);
          return response.data;
        }),
      );

      return characters as TCharacter[];
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || axiosError.message);
    }
  },
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as { error: string }).error ||
          (action.payload as string) ||
          'Неизвестная оишбка';
      });
  },
});

export default favoritesSlice;
