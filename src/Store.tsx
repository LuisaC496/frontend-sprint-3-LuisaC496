import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Features/AuthSlice';
import registroReducer from './Features/RegistroSlice.ts';
import rutinasReducer from './Features/Rutinas'; 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    registro: registroReducer,
    rutinas: rutinasReducer, 
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
