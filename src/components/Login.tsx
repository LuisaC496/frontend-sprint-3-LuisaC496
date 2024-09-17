import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store';
import { login, googleLogin, facebookLogin } from '../Features/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';





interface Usuario {
  uid: string;
  email: string;
  displayName?: string;
}

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const guardarUsuarioFirestore = async (usuario: Usuario) => {
    try {
      if (!usuario.uid || !usuario.email) {
        throw new Error('El UID o el email del usuario no están definidos.');
      }
  
      await setDoc(doc(firestore, 'usuarios', usuario.uid), {
        uid: usuario.uid,
        nombre: usuario.displayName || usuario.email,
        email: usuario.email,
      });
    } catch (error) {
      console.error('Error al guardar el usuario en Firestore:', error);
    }
  };
  

  const handleLogin = async (values: { email: string; password: string }, setError: any) => {
    try {
      const response = await axios.get('http://localhost:3004/registros');
      const usuarios = response.data;

      const usuarioValido = usuarios.find(
        (user: { email: string; password: string }) =>
          user.email === values.email && user.password === values.password
      );

      if (usuarioValido) {
        const usuario: Usuario = { uid: usuarioValido.id, email: values.email, displayName: '' };
        dispatch(login(usuario));

        await guardarUsuarioFirestore(usuario);

        navigate('/inicio');
      } else {
        setError('Email o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al validar el usuario:', error);
      setError('Hubo un problema al iniciar sesión. Inténtalo de nuevo.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await dispatch(googleLogin());
      if (result.meta.requestStatus === 'fulfilled') {
        const usuario = result.payload as Usuario;
        dispatch(login(usuario));

        await guardarUsuarioFirestore(usuario);

        navigate('/inicio');
      } else {
        console.error('Error al iniciar sesión con Google.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await dispatch(facebookLogin());
      if (result.meta.requestStatus === 'fulfilled') {
        const usuario = result.payload as Usuario;
        dispatch(login(usuario));

        await guardarUsuarioFirestore(usuario);

        navigate('/inicio');
      } else {
        console.error('Error al iniciar sesión con Facebook.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Facebook:', error);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
  });

  return (
    <div style={styles.loginContainer}>
      <div style={styles.imageContainer}>
        <img
          src="https://res.cloudinary.com/dbjgyjyc2/image/upload/v1725813312/Logo_luey7i.jpg"
          alt="Logo"
          style={styles.image}
        />
      </div>
      <h2 style={styles.title}>Sign In</h2>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          handleLogin(values, setFieldError);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form style={styles.form}>
            <div style={styles.formGroup}>
              <Field type="email" name="email" placeholder="Email" style={styles.input} />
              <div style={styles.errorMessage}>
                <ErrorMessage name="email" />
              </div>
            </div>
            <div style={styles.formGroup}>
              <Field type="password" name="password" placeholder="Password" style={styles.input} />
              <div style={styles.errorMessage}>
                <ErrorMessage name="password" />
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} style={styles.button}>Iniciar sesión</button>
            <h4 style={styles.h4}>Forgot Password?</h4>
          </Form>
        )}
      </Formik>

      <div style={styles.socialLogin}>
        <button onClick={handleGoogleSignIn} style={styles.socialButton}>
          <FontAwesomeIcon icon={faGoogle} style={{ ...styles.icon, color: '#d4d723' }} />
        </button>
        <button onClick={handleFacebookSignIn} style={styles.socialButton}>
          <FontAwesomeIcon icon={faFacebook} style={{ ...styles.icon, color: '#2f75ee' }} />
        </button>
      </div>

      <div style={styles.socialLogin}>
        <p>D’ont have an account?</p>
        <button onClick={() => navigate('/registro')} style={styles.socialButton}>
          Sing In
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#2E3562',
    fontFamily: '"Raleway", sans-serif'
  },
  imageContainer: {
    marginBottom: '20px',
    borderRadius: '50px',
    border: '2px solid #ccc'
  },
  image: {
    width: '150px',
    height: 'auto',
    borderRadius: '50px',
    border: '2px solid #ccc'
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
  h4: {
    fontSize: "12px",
    marginBottom: "20px",
    color: "#fff",
    textAlign: "center",
  },
  form: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    borderRadius: '50px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#2BE7E8',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
  },
  socialLogin: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row', 
    gap: '10px', 
    alignItems: 'center',
    color: '#fff',
  },
  socialButton: {
    padding: '10px 15px',
    backgroundColor: '#2E3562', 
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: '#2BE7E8',
  },
  icon: {
    marginRight: '10px',
    fontSize: '24px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '12px',
  },
};

export default Login;