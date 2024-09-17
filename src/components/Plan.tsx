import React, { useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

interface PlanOption {
  value: string;
  label: string;
}

const planOptions: PlanOption[] = [
  { value: 'monthly', label: 'Mensual - $8.99 USD' },
  { value: 'annual', label: 'Anual - $99.45 USD' }
];

const customStyles: StylesConfig<PlanOption> = {
  container: (provided) => ({
    ...provided,
    width: '250px',
    margin: '0 auto'
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: '10px',
    borderColor: '#ccc',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#aaa'
    }
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '10px',
    overflow: 'hidden'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#f0f0f0' : '',
    color: state.isSelected ? '#333' : '#000',
    '&:hover': {
      backgroundColor: '#e0e0e0'
    }
  })
};

const Plan: React.FC = () => {
  const [plan, setPlan] = useState<PlanOption>(planOptions[0]);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const springProps = useSpring({
    opacity: isMenuOpen ? 1 : 0,
    transform: isMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 200, friction: 20 }
  });

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:3004/planes', { plan: plan.value });
      navigate('/login');
    } catch (error) {
      console.error('Error al guardar el plan:', error);
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#2E3562',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    fontFamily: '"Raleway", sans-serif'
  };

  const imageContainerStyle: React.CSSProperties = {
    marginBottom: '20px'
  };

  const imgStyle: React.CSSProperties = {
    width: '150px',
    height: 'auto',
    borderRadius: '50px',
    border: '2px solid #ccc',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#2BE7E8',
    color: '#2E3562',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: '"Raleway", sans-serif'
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: '#e0e0e0'
  };

  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img
          src="https://res.cloudinary.com/dbjgyjyc2/image/upload/v1725813312/Logo_luey7i.jpg"
          alt="Global"
          style={imgStyle}
        />
      </div>
      <h1>Choose a subscription</h1>
      <p>We believe that our application will help you achieve your goals</p>
      <animated.div style={springProps}>
        <Select
          options={planOptions}
          value={plan}
          onChange={(option) => setPlan(option as PlanOption)}
          styles={customStyles}
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
          menuIsOpen={isMenuOpen}
          menuPortalTarget={document.body}
        />
      </animated.div>
      <button
        onClick={handleSave}
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor || '')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor || '')}
      >
        Finish
      </button>
    </div>
  );
};

export default Plan;
