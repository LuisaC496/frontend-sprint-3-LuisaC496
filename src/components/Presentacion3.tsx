import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Presentacion3() {
  const navigate = useNavigate();

  useEffect(() => {
    const tiempo = setTimeout(() => navigate('/login'), 3000);
    return () => clearTimeout(tiempo);
  }, [navigate]);

  const handleNextClick = () => {
    navigate('/login');
  };

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
        src="https://res.cloudinary.com/dbjgyjyc2/image/upload/v1725814668/Img_Bg_2_z4dvlg.jpg" 
        alt="Imagen de bienvenida" 
        style={{ 
          width: '9%', 
          height: 'auto', 
          borderRadius: '15px', 
          border: '5px solid transparent' 
        }} 
      />
      <h4 style={{ 
        color: 'white', 
        marginTop: '20px',
        fontSize: '24px',
        fontFamily: '"Raleway", sans-serif'
      }}>
        Сharacter
      </h4>
      <p style={{ 
        color: 'white', 
        marginTop: '10px',
        fontSize: '14px',
        fontFamily: '"Raleway", sans-serif'
      }}>
        Cultivate in you an iron character
        for training
      </p>
      <button 
        onClick={handleNextClick} 
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '18px',
          fontFamily: '"Raleway", sans-serif',
          backgroundColor: '#2BE7E8', 
          color: '#fff', 
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Registration
      </button>
    </div>
  );
}

export default Presentacion3;
