import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Store";
import { fetchRutinas, addRutina, deleteRutina, updateRutina } from "../Features/Rutinas";
import { Ejercicio, Rutina } from "../types/types";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import '../Styles/Incio.css';

const Inicio: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const rutinas = useSelector((state: RootState) => state.rutinas.rutinas) || {} as Rutina;
  const status = useSelector((state: RootState) => state.rutinas.status);
  const error = useSelector((state: RootState) => state.rutinas.error);
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  const [newEjercicio, setNewEjercicio] = useState<Ejercicio>({
    nombre: "",
    tiempo: "",
    descripcion: "",
    repeticiones: "",
    video_guia: ""
  });
  const [selectedCategoria, setSelectedCategoria] = useState<keyof Rutina | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchRutinas() as any);
  }, [dispatch]);

  const handleAddOrUpdate = () => {
    if (newEjercicio.nombre && selectedCategoria) {
      if (isEditing && editingIndex !== null) {
        const updatedRutinas = [...(rutinas[selectedCategoria] || [])];
        updatedRutinas[editingIndex] = newEjercicio;
        dispatch(updateRutina({ categoria: selectedCategoria, ejercicio: updatedRutinas }) as any);
      } else {
        dispatch(addRutina({ categoria: selectedCategoria, ejercicio: newEjercicio }) as any);
      }
      resetForm();
    }
  };

  const handleDelete = (categoria: keyof Rutina) => {
    dispatch(deleteRutina(categoria) as any);
  };

  const handleEdit = (ejercicio: Ejercicio, index: number) => {
    setNewEjercicio(ejercicio);
    setIsEditing(true);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleCategoryClick = (categoria: keyof Rutina) => {
    setSelectedCategoria(categoria);
  };

  const resetForm = () => {
    setNewEjercicio({
      nombre: "",
      tiempo: "",
      descripcion: "",
      repeticiones: "",
      video_guia: ""
    });
    setIsEditing(false);
    setEditingIndex(null);
    setShowModal(false);
  };

  if (status === 'loading') {
    return <div>Cargando...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="inicio-container">
      {userEmail && <h1>Hi, {userEmail}!</h1>}

      <div className="global-image-container">
        <img src="https://res.cloudinary.com/dbjgyjyc2/image/upload/v1726429241/presentacion.jpg_ush7jo.png" alt="Global" />
      </div>
      <div className="global-image-container">
        <img src="https://res.cloudinary.com/dbjgyjyc2/image/upload/v1726431758/presentacion2.jpg_w6rsj1.png" alt="Global" />
      </div>

      <Link to="/perfil">
        <i className="fa-solid fa-user" style={{ color: "#52fcff", fontSize: "24px" }}></i>
      </Link>

      <Button onClick={() => setShowModal(true)} className="btn-add-exercise">
        Agregar Ejercicio
      </Button>

      <div className="category-buttons">
        {Object.keys(rutinas).map((categoria) => (
          <Button
            key={categoria}
            onClick={() => handleCategoryClick(categoria as keyof Rutina)}
            className="btn-category"
          >
            {categoria}
          </Button>
        ))}
      </div>

      {selectedCategoria && (
        <div>
          <h2>{selectedCategoria}</h2>
          <Button onClick={() => handleDelete(selectedCategoria)} className="btn-delete-category">
            Eliminar {selectedCategoria}
          </Button>
          <div className="card-container">
            {(rutinas[selectedCategoria] || []).map((ejercicio, index) => (
              <div className="card" key={index}>
                <h3>{ejercicio.nombre}</h3>
                <p>Tiempo: {ejercicio.tiempo}</p>
                <p>Descripción: {ejercicio.descripcion}</p>
                <p>Repeticiones: {ejercicio.repeticiones}</p>
                <a href={ejercicio.video_guia} target="_blank" rel="noopener noreferrer">Ver video guía</a>
                <Button onClick={() => handleEdit(ejercicio, index)} className="btn-edit-exercise">Editar</Button>
                <Link to={`/ejercicio/${selectedCategoria}/${index}`}>
                  <Button style={{ backgroundColor: '#2BE7E8' }}>Detalle</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Editar Ejercicio" : "Agregar Ejercicio"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategoria || ""}
                onChange={(e) => setSelectedCategoria(e.target.value as keyof Rutina)}
              >
                {Object.keys(rutinas).map((categoria) => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={newEjercicio.nombre}
                onChange={(e) => setNewEjercicio({ ...newEjercicio, nombre: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formTiempo">
              <Form.Label>Tiempo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tiempo"
                value={newEjercicio.tiempo}
                onChange={(e) => setNewEjercicio({ ...newEjercicio, tiempo: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción"
                value={newEjercicio.descripcion}
                onChange={(e) => setNewEjercicio({ ...newEjercicio, descripcion: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formRepeticiones">
              <Form.Label>Repeticiones</Form.Label>
              <Form.Control
                type="text"
                placeholder="Repeticiones"
                value={newEjercicio.repeticiones}
                onChange={(e) => setNewEjercicio({ ...newEjercicio, repeticiones: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formVideoGuia">
              <Form.Label>Video Guía</Form.Label>
              <Form.Control
                type="text"
                placeholder="Video Guía"
                value={newEjercicio.video_guia}
                onChange={(e) => setNewEjercicio({ ...newEjercicio, video_guia: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdate}>
            {isEditing ? "Actualizar" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inicio;
