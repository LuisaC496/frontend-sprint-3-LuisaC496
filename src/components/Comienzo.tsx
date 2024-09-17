import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Comienzo: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/presentacion1'); 
    }, 3000); 
    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div style={{
        backgroundColor: '#2E3562',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center'
      }}>
        <img 
          src="https://res.cloudinary.com/dbjgyjyc2/image/upload/v1725813312/Logo_luey7i.jpg" 
          alt="Imagen de bienvenida" 
          style={{ 
            width: '9%', 
            height: 'auto', 
            borderRadius: '15px', 
            border: '5px solid transparent' 
          }} 
        />
        <h4 style={{ 
        fontSize: "24px",
        color: 'white', 
        marginTop: '20px',
        fontFamily: '"Racing Sans One", sans-serif'
      }}>Buffalo</h4>
            </div>
  );
};

export default Comienzo;
