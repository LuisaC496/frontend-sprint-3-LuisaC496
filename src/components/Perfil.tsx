import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { RootState } from '../Store';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig'; 
import { Usuarios } from '../types/Usuarios'; 
import '../Styles/perfil.css'; 

const Perfil: React.FC = () => {
  const usuarioRedux = useSelector((state: RootState) => state.auth.user) as Usuarios | null;
  const [usuarioFirestore, setUsuarioFirestore] = useState<Usuarios | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsuarioFirestore = async () => {
      if (usuarioRedux && usuarioRedux.uid) {
        const docRef = doc(firestore, 'usuarios', usuarioRedux.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUsuarioFirestore(docSnap.data() as Usuarios);
        }
      }
    };
    obtenerUsuarioFirestore();
  }, [usuarioRedux]);

  if (!usuarioRedux) {
    return <p>No se ha iniciado sesión</p>;
  }

  const handleLogout = () => {
    navigate('/login'); 
  };

  return (
    <div className="perfil-container">
      <div className="global-image-container">
        <img 
          src="https://res.cloudinary.com/dbjgyjyc2/image/upload/v1725813312/Logo_luey7i.jpg" 
          alt="Global" 
          className="perfil-image" 
        />
      </div>
      <h1 className="perfil-header">Perfil de Usuario</h1>
      <p className="perfil-text"><strong>Usuario Nombre:</strong> {usuarioRedux.email}</p>

      {usuarioFirestore && (
        <>
          <p className="perfil-text"><strong>Usuario Email:</strong> {usuarioFirestore.email}</p>
        </>
      )}

      <button className="perfil-button" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Perfil;
