# SPRINT 3
# PRESENTACIÓN DEL SPRINT#3

En el siguiente documento README.md se realizara la breve explicación del proceso para la creación del Sprint#3 de la aplicación Buffalomobileapp:

Se debe tener en cuenta las herramientas de desarrollo que debemos incluir:
1. JS React.
2. Redux con Middlewares y dispatcher.
3. React Hooks.
4. Typescripts.
5. Trabajo CSS y Diseño Responsive. 
6. Firebase-Autentication(Inicio de sesión con Google, Facebook y crud con Firestone)
7. Rutas públicas y privadas(Enrutamiento dinamico con React-router)
8. Formik y Yup.



## JS REACT. 
Es una biblioteca de JavaScript para construir interfaces de usuario, especialmente para aplicaciones web de una sola página. Fue desarrollada por Facebook y se basa en el concepto de componentes, que son fragmentos de código que encapsulan la lógica y el diseño de una parte de la interfaz de usuario.
Uso frecuente de React: 
- Componentes: Cada componente maneja su propio estado y puede ser reutilizado en diferentes partes de la aplicación. Los componentes pueden ser funcionales o basados en clases.
- JSX: Una extensión de la sintaxis de JavaScript que permite escribir HTML dentro del código JavaScript. 
- Estado y Props: "props" (propiedades) que permiten pasar datos y configuraciones a un componente hijo, y "estado" que es usado para manejar datos que cambian con el tiempo dentro de un componente.
- Virtual DOM: Cuando el estado de un componente cambia, React actualiza un DOM virtual y luego compara este DOM virtual con el DOM real para realizar las actualizaciones mínimas necesarias.


## REDUX.
Es una biblioteca de JavaScript para el manejo del estado en aplicaciones. Se utiliza comúnmente en aplicaciones desarrolladas con React, aunque también puede usarse con otros frameworks y librerías. Redux ayuda a gestionar el estado global de una aplicación de manera predecible y consistente, lo que facilita la depuración y la mantenibilidad del código.

1.	Acciones (Actions): Las acciones son objetos simples que describen un cambio que debe ocurrir en el estado. Cada acción tiene una propiedad type que indica el tipo de acción y puede tener otras propiedades con información adicional.
2.	  Creadores de Acciones (Action Creators): Son funciones que crean y devuelven acciones. Facilitan la creación de acciones con datos adicionales.
3.	Reductores (Reducers): Los reductores son funciones puras que reciben el estado actual y una acción, y devuelven un nuevo estado. Son responsables de especificar cómo cambia el estado en respuesta a una acción.
4.	Despachadores (Dispatchers): El dispatch es una función que se utiliza para enviar acciones a los reductores. Es el mecanismo principal para actualizar el estado en Redux.
5.	Store: El store es el objeto que contiene el estado global de la aplicación y proporciona métodos para acceder al estado, enviar acciones y registrar oyentes.
6.	Middleware: Redux también admite middleware, que son funciones que se pueden usar para extender el comportamiento del dispatch. Middleware como redux-thunk o redux-saga permite manejar acciones asíncronas y efectos secundarios.


# Para el desarrollo del proyecto se tuvo en cuenta el archivo Store.tsx con las siguientes caracteristicas: 

Store.tsx-> Configura un store de Redux utilizando @reduxjs/toolkit, y se encarga de integrar varios reducers en una sola tienda (store).

1. ConfigureStore: Es una función de @reduxjs/toolkit que simplifica la configuración de la tienda (store) de Redux. Automatiza muchos de los pasos necesarios para configurar Redux, incluyendo la integración con las herramientas de desarrollo y la configuración de middleware por defecto.
2. reducer: Es un objeto donde cada clave representa una parte del estado de la tienda y el valor asociado es el reducer que maneja esa parte del estado. En tu caso:
3. auth: El estado de autenticación es manejado por authReducer, que probablemente contiene la lógica para gestionar el estado del usuario, como el inicio de sesión y el cierre de sesión.
4. registro: El estado relacionado con el registro de nuevos usuarios es manejado por registroReducer, que puede incluir la lógica para manejar el proceso de registro de usuarios.
5. rutinas: El estado que gestiona las rutinas de ejercicio es manejado por rutinasReducer, que maneja la obtención, actualización y eliminación de rutinas de ejercicio.
6. devTools: Configura si se deben habilitar las herramientas de desarrollo de Redux (Redux DevTools). Esto se establece en true si la aplicación no está en producción (process.env.NODE_ENV !== 'production'). Las herramientas de desarrollo permiten depurar y hacer un seguimiento del estado de Redux de manera más visual.
7. RootState es el tipo que representa la estructura completa del estado global.
8. Dispatch: Es una función que envía una acción al store de Redux. El store luego envía esta acción a los reducers, que actualizan el estado global basado en la acción recibida.

# Dentro del proyecto se aplico @reduxjs/toolkit:

# Carpeta Features.

1. AuthSlice.ts:  Autenticación de usuarios con React utilizando Redux Toolkit y Firebase.
2. RegistroSlice.ts: Registro de usuarios con React utilizando Redux Toolkit y API.
3. Rutinas.ts: Slice de Redux Toolkit para manejar el estado de las rutinas de ejercicio en una aplicación.
4. createAsyncThunk: Una función de Redux Toolkit para crear acciones asíncronas. Permite manejar operaciones asincrónicas, como llamadas a APIs.
5. createSlice: Una función de Redux Toolkit para crear un "slice" del estado Redux. Un slice incluye el estado, los reducers y las acciones relacionadas.
6. auth, GoogleProvider, FacebookProvider, signInWithPopup: Importaciones de Firebase para la autenticación, incluyendo proveedores de inicio de sesión con Google y Facebook.
7. Reducer es una función que se encarga de gestionar y actualizar el estado de una aplicación. Su función principal es tomar el estado actual y una acción, y devolver un nuevo estado basado en esa acción.
8. PayloadAction: Proporciona tipos para las acciones que incluyen un payload(se refiere a los datos que se envían junto con una acción (action))


## REACT HOOKS.
Son una característica introducida en React 16.8 que permiten a los desarrolladores usar el estado y otras características de React sin escribir una clase. Los Hooks proporcionan una forma más concisa y funcional de gestionar el estado y los efectos secundarios en los componentes.

# Hooks usados en el desarrollo: 

1. UseEffect->Control de Efectos secundarios. 
2. UseDispatch->Es una parte importante de la integración de React con Redux, un popular gestor de estado para aplicaciones JavaScript. La función dispatch se usa para enviar acciones (acciones de Redux) al store de Redux. Las acciones son objetos que describen cambios que deberían suceder en el estado global de la aplicación.
3. UseState-> es un hook que permite agregar estado a los componentes funcionales. Es parte de la API de hooks introducida en React 16.8, que también incluye otros hooks útiles como useEffect, useContext, y más.
4. UseSelector->es un hook que te permite extraer datos del estado global de Redux y hacer que tu componente se vuelva a renderizar cuando esos datos cambian. Proporciona una forma de acceder al store sin necesidad de usar la función connect. Selector: Función que toma el estado global y devuelve una parte específica de ese estado.
5. UseParams-> Es un hook que te permite obtener los parámetros de la URL actual en la que se encuentra el componente. Esto es especialmente útil en aplicaciones con enrutamiento, donde las rutas pueden contener partes dinámicas, como IDs de recursos o nombres de rutas.

## TYPESCRIPT.
Es un superset de JavaScript desarrollado por Microsoft que agrega tipos estáticos al lenguaje. Esto significa que TypeScript introduce un sistema de tipos opcional que permite a los desarrolladores especificar los tipos de variables, parámetros de funciones y valores de retorno, entre otros, para mejorar la calidad del código y ayudar a prevenir errores en tiempo de desarrollo.

- Tipos Estáticos: TypeScript permite a los desarrolladores definir tipos para variables, parámetros de funciones, y objetos. Esto ayuda a detectar errores en tiempo de compilación en lugar de en tiempo de ejecución. Los tipos pueden ser simples, como number o string, o más complejos, como tipos personalizados y interfaces.
- Interfaces y Tipos: TypeScript permite definir interfaces y tipos personalizados para estructurar datos y asegurar que las estructuras de datos sean coherentes a lo largo del código.
- Clases y Objetos: TypeScript soporta la programación orientada a objetos con clases, interfaces y herencia. Esto facilita la creación de aplicaciones grandes y complejas de manera más estructurada.

# Usos del lenguaje de programación TypeScript dentro del desarrollo:

• .ts: Es la extensión para archivos TypeScript que no contienen JSX. Se utiliza para scripts y módulos de TypeScript que no necesitan renderizar componentes React directamente.

Ejemplo:
interface Usuario {
  uid: string;
  email: string;
  displayName?: string;
}

En TypeScript, una interfaz es una estructura que define la forma de un objeto. Es una forma de describir el tipo de un objeto y puede incluir propiedades y métodos. Las interfaces son útiles para la tipificación estática, lo que permite a TypeScript verificar el tipo de datos.
La interfaz Usuario puede usarse para tipar variables, parámetros de función, o valores de retorno en TypeScript.

•  .tsx: Es la extensión para archivos TypeScript que contienen JSX. Se usa cuando el archivo incluye código que define componentes React y utiliza JSX para describir la interfaz de usuario.


## FIREBASE.

Firebase es una plataforma integral para el desarrollo de aplicaciones que proporciona una serie de servicios y herramientas para ayudar a los desarrolladores a construir, probar y gestionar aplicaciones web y móviles.

1.	Autenticación: Permite añadir funcionalidad de autenticación de usuarios con facilidad, soportando métodos como correo electrónico, contraseñas, redes sociales (Google, Facebook, Twitter), y autenticación anónima.
2.	Base de Datos: Firebase ofrece dos tipos principales de bases de datos.  Firebase Realtime Database y: 

# Firestore.
Cloud Firestore es una base de datos flexible y escalable para aplicaciones web y móviles.

# En el proyecto se implemente la autenticación por medio de Google y Facebook, además, se uso Firestore para el proceso de alamacenamiento de datos como lo son las rutinas. Se creo una colección llamada "rutinas" dentro de esta esta el documento "rutinaprincipal" donde se enlistan las rutinas con los ejercicios y la descripción del mismo. El Crud se genero a través de esta herramienta. 

Primordial la configuración de FIrebase, así es posible la conexión para los procesos de autenticación y base de datos como servicios proporcionados de Google a través de Firebase. 


# firebaseConfig.ts.
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyBOhZfElMyMDj225uU5c_HjnflpPL0r--8',
  authDomain: 'workoutapp-5d386.firebaseapp.com',
  projectId: 'workoutapp-5d386',
  storageBucket: 'workoutapp-5d386.appspot.com',
  messagingSenderId: '351695496693',
  appId: '1:351695496693:web:5d480bd22d7cdd5731ecbc',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();
const firestore= getFirestore(app);

export { auth, firestore, GoogleProvider, FacebookProvider, signInWithPopup };


- Funciones de Firebase: collection, getDocs, updateDoc, doc, y arrayUnion para interactuar con Firestore.
- saveRutina: Es una función asíncrona que guarda el objeto rutinaData en Firestore.
- doc(collection(firestore, "rutinas"), "rutinaPrincipal"): Crea una referencia a un documento en la colección "rutinas" con el ID "rutinaPrincipal". Si el documento no existe, se creará.
- setDoc(docRef, rutinaData): Escribe el objeto rutinaData en el documento de Firestore en la referencia docRef. Si el documento ya existe, se sobrescribirá con los datos proporcionados.


## RUTAS PUBLICAS Y PRIVADAS. 

•	Rutas Públicas: Son accesibles para todos los usuarios, tanto autenticados como no autenticados. Ejemplos incluyen la página de inicio, la página de registro y la página de inicio de sesión.
•	Rutas Privadas: Solo están accesibles para usuarios autenticados. Ejemplos incluyen el perfil del usuario, el panel de administración y cualquier otra página que debería ser visible solo para usuarios que han iniciado sesión.

# react-router-dom: Biblioteca para el enrutamiento en React que permite la navegación y el manejo de rutas.

