import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../Store.tsx';
import Comienzo from '../components/Comienzo.tsx';
import Inicio from '../components/Inicio.tsx'; 
import Presentacion1 from '../components/Presentacion1'; 
import Presentacion2 from '../components/Presentacion2';
import Presentacion3 from '../components/Presentacion3'; 
import Login from '../components/Login';
import Registro from '../components/Registro.tsx';
import Estatura from '../components/Estatura.tsx';
import Edad from '../components/Edad.tsx';
import Genero from '../components/Genero.tsx';
import Plan from '../components/Plan.tsx';
import Peso from '../components/Peso.tsx';
import Perfil from "../components/Perfil.tsx";
import React, { useEffect } from 'react';
import { saveRutina } from '../Features/RutinasAsync.ts';
import Ejercicio from '../components/Ejercicio.tsx';



const App: React.FC = () => {
  useEffect(() => {
    saveRutina();
  }, []);

  return (
    <Provider store={store}> 
      <Router>
        <Routes>
          <Route path="/" element={<Comienzo />} />
          <Route path="/presentacion1" element={<Presentacion1 />} />
          <Route path="/presentacion2" element={<Presentacion2 />} />
          <Route path="/presentacion3" element={<Presentacion3 />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/estatura" element={<Estatura />} />
          <Route path="/edad" element={<Edad />} />
          <Route path="/genero" element={<Genero />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/peso" element={<Peso />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/ejercicio/:categoria/:id" element={<Ejercicio />} />
          <Route path="/perfil" element={<Perfil />} />
</Routes>
      </Router>
    </Provider>
  );
}

export default App;
