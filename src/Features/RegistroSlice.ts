import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RegistroState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RegistroState = {
  status: 'idle',
  error: null,
};

export const registrarUsuario = createAsyncThunk(
  'registro/registrarUsuario',
  async (user: { nombre: string; email: string; password: string }) => {
    const response = await axios.post('http://localhost:3004/registros', user);
    return response.data;
  }
);

const registroSlice = createSlice({
  name: 'registro',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registrarUsuario.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registrarUsuario.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registrarUsuario.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'No se pudo registrar el usuario. Inténtalo de nuevo.';
      });
  },
});

export default registroSlice.reducer;
