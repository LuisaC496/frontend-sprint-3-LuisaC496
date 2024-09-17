import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Store';
import { fetchRutinas } from '../Features/Rutinas';
import { Ejercicio as EjercicioType, Rutina } from '../types/types';
import '../Styles/ejercicio.css';

const Ejercicio: React.FC = () => {
  const { categoria, id } = useParams<{ categoria: string; id: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const rutinas = useSelector((state: RootState) => state.rutinas.rutinas) as Rutina | null; 
  const [ejercicio, setEjercicio] = useState<EjercicioType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!categoria || !id) {
        setError('Categoría o ID está faltando.');
        setLoading(false);
        return;
      }

      try {
        await dispatch(fetchRutinas() as any);

   
        if (rutinas && rutinas[categoria]) {
          const ejerciciosArray = rutinas[categoria] as EjercicioType[]; 

          const ejercicioIndex = Number(id);
          if (isNaN(ejercicioIndex) || ejercicioIndex < 0 || ejercicioIndex >= ejerciciosArray.length) {
            setError('Índice de ejercicio fuera de los límites.');
            setEjercicio(null);
          } else {
            setEjercicio(ejerciciosArray[ejercicioIndex]);
          }
        } else {
          setError('No se encontró la categoría.');
        }
      } catch (error) {
        console.error('Error fetching rutina:', error);
        setError('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, categoria, id, rutinas]);

  const handleGoodJob = () => {
    alert('¡Buen trabajo! Split terminado.');
  };

  const handleFinishWorkout = () => {
    navigate('/perfil');
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!ejercicio) {
    return <div>No se encontró el ejercicio.</div>;
  }

  return (
    <div className="ejercicio-container">
      <h1>{ejercicio.nombre}</h1>
      <p>Tiempo: {ejercicio.tiempo}</p>
      <p>Descripción: {ejercicio.descripcion}</p>
      <p>Repeticiones: {ejercicio.repeticiones}</p>
      <div className="video-container">
        <video width="600" controls>
          <source src={ejercicio.video_guia} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
      <div className="btn-container">
        <button className="btn-add-exercise" onClick={handleGoodJob}>Split Day 1</button>
        <button className="btn-add-exercise" onClick={handleGoodJob}>Split Day 2</button>
        <button className="btn-add-exercise" onClick={handleGoodJob}>Split Day 3</button>
        <button className="btn-add-exercise" onClick={handleFinishWorkout}>Finalizar Entrenamiento</button>
      </div>
    </div>
  );
};
export default Ejercicio;
