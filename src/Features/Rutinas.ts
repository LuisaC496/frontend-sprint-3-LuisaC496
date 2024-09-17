import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore"; 
import { firestore } from "../firebase/firebaseConfig";
import { Ejercicio, Rutina } from "../types/types";

interface RutinasState {
  rutinas: Rutina | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RutinasState = {
  rutinas: null,
  status: 'idle',
  error: null
};

export const fetchRutinas = createAsyncThunk('rutinas/fetchRutinas', async () => {
  const querySnapshot = await getDocs(collection(firestore, "rutinas"));
  const rutinas: Rutina = {
    todo_el_cuerpo: [],
    musculos: [],
    pectoral: [],
    abdomen: [],
    trapecio: [],
    hombros: []
  };

  querySnapshot.forEach((doc) => {
    const data = doc.data() as { [key: string]: Ejercicio[] };
    for (const key in data) {
      if (key in rutinas) { 
        rutinas[key as keyof Rutina] = data[key];
      }
    }
  });

  return rutinas;
});

export const addRutina = createAsyncThunk('rutinas/addRutina', async (newRutina: { categoria: keyof Rutina, ejercicio: Ejercicio }) => {
  const docRef = doc(firestore, "rutinas", "rutinaPrincipal"); 
  
  await updateDoc(docRef, {
    [newRutina.categoria]: arrayUnion(newRutina.ejercicio)
  });
  return newRutina;
});

export const deleteRutina = createAsyncThunk('rutinas/deleteRutina', async (categoria: keyof Rutina) => {
  const docRef = doc(firestore, "rutinas", "rutinaPrincipal");
  await updateDoc(docRef, {
    [categoria]: [] 
  });
  return categoria;
});

export const updateRutina = createAsyncThunk('rutinas/updateRutina', async (updatedRutina: { categoria: keyof Rutina, ejercicio: Ejercicio[] }) => {
  const docRef = doc(firestore, "rutinas", "rutinaPrincipal");
  await updateDoc(docRef, {
    [updatedRutina.categoria]: updatedRutina.ejercicio 
  });
  return updatedRutina;
});

const rutinasReducer = createSlice({
  name: "rutinas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRutinas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRutinas.fulfilled, (state, action: PayloadAction<Rutina>) => {
        state.status = 'succeeded';
        state.rutinas = action.payload;
      })
      .addCase(fetchRutinas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch rutinas';
      })
      .addCase(addRutina.fulfilled, (state, action: PayloadAction<{ categoria: keyof Rutina, ejercicio: Ejercicio }>) => {
        if (state.rutinas) {
          state.rutinas[action.payload.categoria].push(action.payload.ejercicio);
        }
      })
      .addCase(deleteRutina.fulfilled, (state, action: PayloadAction<keyof Rutina>) => {
        if (state.rutinas) {
          state.rutinas[action.payload] = [];
        }
      })
      .addCase(updateRutina.fulfilled, (state, action: PayloadAction<{ categoria: keyof Rutina, ejercicio: Ejercicio[] }>) => {
        if (state.rutinas) {
          state.rutinas[action.payload.categoria] = action.payload.ejercicio;
        }
      });
  }
});

export default rutinasReducer.reducer;
