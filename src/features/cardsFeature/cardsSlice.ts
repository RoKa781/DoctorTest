import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosConfig from '@/config/axiosConfig';
import { Filters, TCharacter, TStatus } from '@/types';

type CardsState = {
  characters: TCharacter[];
  totalPages: number;
  status: TStatus;
  error: string | null;
};

const initialState: CardsState = {
  characters: [],
  totalPages: 1,
  status: 'idle',
  error: null,
};

export const fetchCharacters = createAsyncThunk(
  'cards/fetchCharacters',
  async (
    { page, filters }: { page: string; filters?: Filters },
    { rejectWithValue },
  ) => {
    try {
      const filterParams = new URLSearchParams({
        page,
        ...Object.fromEntries(
          Object.entries(filters || {}).filter(([, value]) => value),
        ),
      });
      const response = await axiosConfig.get(`character/?${filterParams}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || axiosError.message);
    }
  },
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    removeProduct: (state, action) => {
      const characterId = action.payload;
      state.characters = state.characters.filter(
        (character) => character.id !== characterId,
      );
    },
    addProduct: (state, action) => {
      const productData = action.payload;
      state.characters = [productData].concat(state.characters);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload.results;
        state.totalPages = action.payload.info.pages;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.characters = [];
        state.error =
          (action.payload as { error: string }).error ||
          (action.payload as string) ||
          'Неизвестная оишбка';
      });
  },
});

export const { removeProduct, addProduct } = cardsSlice.actions;
export default cardsSlice;
