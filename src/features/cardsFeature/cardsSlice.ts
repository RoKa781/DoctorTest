import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '@/config/axiosConfig';
import { TCharacter } from '@/types';

export const fetchCharacters = createAsyncThunk(
  'cards/fetchCharacters',
  async () => {
    const response = await axiosConfig.get('character');
    return response.data;
  }
);

interface CardsState {
  characters: TCharacter[];
  currentPage: number;
  totalPages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CardsState = {
  characters: [],
  currentPage: 1,
  totalPages: 1,
  status: 'idle',
  error: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload.results;
        state.totalPages = action.payload.info.pages;
        state.currentPage = action.payload.info.page || 1;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default cardsSlice;


