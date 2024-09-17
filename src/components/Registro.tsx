import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../Features/RegistroSlice';
import { RootState, AppDispatch } from '../Store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Registro: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const status = useSelector((state: RootState) => state.registro.status);
  const error = useSelector((state: RootState) => state.registro.error);

  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre es obligatorio'),
    email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
  });

  const handleSubmit = async (values: { nombre: string; email: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      await dispatch(registrarUsuario(values)).unwrap();
      navigate('/estatura');
    } catch (err) {
      console.error('Error al enviar los datos:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={style.crearContainer}>
      <div style={style.imageContainer}>
        <img
          src="https://res.cloudinary.com/dbjgyjyc2/image/upload/v1725813312/Logo_luey7i.jpg"
          alt="Logo"
          style={style.image}
        />
      </div>
      <Formik
        initialValues={{ nombre: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={style.crearForm}>
            <h1>Sing In</h1>
            {status === 'failed' && <div style={style.errorMessage}>{error}</div>}
            
            <label htmlFor="nombre"></label>
            <Field 
              type="text" 
              id="nombre" 
              name="nombre" 
              placeholder="Nombre"
              style={style.inputField}
            />
            <div style={style.errorMessage}>
              <ErrorMessage name="nombre" />
            </div>
            
            <label htmlFor="email"></label>
            <Field 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Email"
              style={style.inputField}
            />
            <div style={style.errorMessage}>
              <ErrorMessage name="email" />
            </div>
            
            <label htmlFor="password"></label>
            <Field 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Password"
              style={style.inputField}
            />
            <div style={style.errorMessage}>
              <ErrorMessage name="password" />
            </div>
            
            <button type="submit" disabled={isSubmitting} style={style.submitButton}>
              Registrarse
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const style = {
  crearContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#2E3562',
    fontFamily: '"Raleway", sans-serif',
  },
  imageContainer: {
    marginBottom: '20px',
  },
  image: {
    width: '150px',
    height: 'auto',
    borderRadius: '50px',
    border: '2px solid #ccc',
  },
  crearForm: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column' as const,
    marginBottom: '15px',
    textAlign: "center" as 'center',
  },
  inputField: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '10px 15px',
    marginBottom: '10px',
    backgroundColor: '#2BE7E8',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default Registro;
