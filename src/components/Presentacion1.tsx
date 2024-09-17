import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Presentacion1() {
  const navigate = useNavigate();

  useEffect(() => {
    const tiempo = setTimeout(() => navigate('/presentacion2'), 3000);
    return () => clearTimeout(tiempo);
  }, [navigate]);

  const handleNextClick = () => {
    navigate('/presentacion2');
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
        src="https://res.cloudinary.com/dbjgyjyc2/image/upload/v1725814015/Img_Bg_up3a8j.jpg" 
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
        Workout
      </h4>
      <p style={{ 
        color: 'white', 
        fontSize: '14px',
        marginTop: '10px',
        fontFamily: '"Raleway", sans-serif'
      }}>
        Start training with usand build
        muscle or lose weight
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
        Next
      </button>
    </div>
  );
}

export default Presentacion1;
