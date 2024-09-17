export interface Ejercicio {
    nombre: string;
    tiempo: string;
    descripcion: string;
    repeticiones: string;
    video_guia: string;
  }
  
  export interface Rutina {
    todo_el_cuerpo: Ejercicio[];
    musculos: Ejercicio[];
    pectoral: Ejercicio[];
    abdomen: Ejercicio[];
    trapecio: Ejercicio[];
    hombros: Ejercicio[];
    [categoria: string]: Ejercicio[];
  }
  