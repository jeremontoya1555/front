import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = ({ authToken }) => {
  const [hoteles, setHoteles] = useState([]);
  const [newHotel, setNewHotel] = useState({
    tipo_alojamiento: '',
    ubicacion: '',
    disponibilidad: true,
    precio: '',
    datos: '',
    cochera: false,
    link_booking: '',
    link_maps: '',
    numero_telefono: '',
    imagen_principal_1: '',
    imagen_principal_2: '',
    imagen_principal_3: ''
  });

  useEffect(() => {
    fetch('/api/hoteles')
      .then(response => response.json())
      .then(data => setHoteles(data))
      .catch(error => console.error('Error fetching hoteles:', error));
  }, []);

  const handleChange = (e) => {
    setNewHotel({ ...newHotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/hoteles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(newHotel)
      });
      const data = await response.json();
      setHoteles([...hoteles, data]);
    } catch (error) {
      console.error('Error creating hotel:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/hoteles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      setHoteles(hoteles.filter(hotel => hotel.id !== id));
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  return (
    <div>
      <h1>Administración de Hoteles</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo de Alojamiento:</label>
          <input type="text" name="tipo_alojamiento" value={newHotel.tipo_alojamiento} onChange={handleChange} required />
        </div>
        <div>
          <label>Ubicación:</label>
          <input type="text" name="ubicacion" value={newHotel.ubicacion} onChange={handleChange} required />
        </div>
        <div>
          <label>Disponibilidad:</label>
          <input type="checkbox" name="disponibilidad" checked={newHotel.disponibilidad} onChange={(e) => setNewHotel({ ...newHotel, disponibilidad: e.target.checked })} />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" name="precio" value={newHotel.precio} onChange={handleChange} required />
        </div>
        <div>
          <label>Datos:</label>
          <input type="text" name="datos" value={newHotel.datos} onChange={handleChange} />
        </div>
        <div>
          <label>Cochera:</label>
          <input type="checkbox" name="cochera" checked={newHotel.cochera} onChange={(e) => setNewHotel({ ...newHotel, cochera: e.target.checked })} />
        </div>
        <div>
          <label>Link a Booking:</label>
          <input type="url" name="link_booking" value={newHotel.link_booking} onChange={handleChange} />
        </div>
        <div>
          <label>Link a Maps:</label>
          <input type="url" name="link_maps" value={newHotel.link_maps} onChange={handleChange} />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="tel" name="numero_telefono" value={newHotel.numero_telefono} onChange={handleChange} />
        </div>
        <div>
          <label>Imagen Principal 1:</label>
          <input type="url" name="imagen_principal_1" value={newHotel.imagen_principal_1} onChange={handleChange} />
        </div>
        <div>
          <label>Imagen Principal 2:</label>
          <input type="url" name="imagen_principal_2" value={newHotel.imagen_principal_2} onChange={handleChange} />
        </div>
        <div>
          <label>Imagen Principal 3:</label>
          <input type="url" name="imagen_principal_3" value={newHotel.imagen_principal_3} onChange={handleChange} />
        </div>
        <button type="submit">Crear Hotel</button>
      </form>
      <div>
        {hoteles.map(hotel => (
          <div key={hotel.id}>
            <h2>{hotel.tipo_alojamiento}</h2>
            <p>Ubicación: {hotel.ubicacion}</p>
            <p>Disponibilidad: {hotel.disponibilidad ? 'Disponible' : 'No Disponible'}</p>
            <p>Precio: ${hotel.precio}</p>
            <button onClick={() => handleDelete(hotel.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
