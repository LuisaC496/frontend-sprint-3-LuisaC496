import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Presentacion2() {
  const navigate = useNavigate();

  useEffect(() => {
    const tiempo = setTimeout(() => navigate('/presentacion3'), 3000);
    return () => clearTimeout(tiempo);
  }, [navigate]);

  const handleNextClick = () => {
    navigate('/presentacion3');
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
        src="https://res.cloudinary.com/dbjgyjyc2/image/upload/v1725814501/Img_Bg_1_vcgwu8.jpg" 
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
        Discipline
      </h4>
      <p style={{ 
        color: 'white', 
        marginTop: '10px',
        fontSize: '14px',
        fontFamily: '"Raleway", sans-serif'
      }}>
        Develop discipline in yourself
        train every day
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

export default Presentacion2;
