import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth, GoogleProvider, FacebookProvider, signInWithPopup } from '../firebase/firebaseConfig';

interface User {
  email: string;
}

export const googleLogin = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/googleLogin',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      const email = result.user?.email;
      if (email) return { email };
      return rejectWithValue('No se pudo obtener el correo electrónico.');
    } catch (error) {
      return rejectWithValue('Error al iniciar sesión con Google');
    }
  }
);

export const facebookLogin = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/facebookLogin',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, FacebookProvider);
      const email = result.user?.email;
      if (email) return { email };
      return rejectWithValue('No se pudo obtener el correo electrónico.');
    } catch (error) {
      return rejectWithValue('Error al iniciar sesión con Facebook');
    }
  }
);

interface UserState {
  user: User | null;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });

    builder.addCase(facebookLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });

    builder.addCase(googleLogin.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    builder.addCase(facebookLogin.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
