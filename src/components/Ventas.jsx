import React, { useState } from 'react';

const FormularioVentas = ({ onSubmit }) => {
  const [nombres, setNombres] = useState('');
  const [categoria, setCategoria] = useState('');
  const [importador, setImportador] = useState('');
  const [fecha, setFecha] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nombres,
      categoria,
      importador,
      fecha,
      precio
    });
    setNombres('');
    setCategoria('');
    setImportador('');
    setFecha('');
    setPrecio('');
  };

  return (
    <form className="form-control" onSubmit={handleSubmit}>
      <div>
        <label>Nombres:</label>
        <input className="form-control" type="text" required placeholder="Nombre del producto" value={nombres} onChange={(e) => setNombres(e.target.value)} />
      </div>
      <div>
        <select className="form-control" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Seleccione una categoría:</option>
          <option value="Electronica">Electrónica</option>
          <option value="Hogar">Hogar</option>
          <option value="Ropa">Ropa</option>
          <option value="Vestimenta">Vestimenta</option>
          <option value="Juguetes">Juguetes</option>
          <option value="Libros">Libros</option>
          <option value="Medicinas">Medicinas</option>
          <option value="Papeleria">Papelería</option>
          <option value="Panaderia">Panadería</option>
        </select>
      </div>
      <div>
        <label>Importador:</label>
        <input className="form-control" type="text" required placeholder="Importador" value={importador} onChange={(e) => setImportador(e.target.value)} />
      </div>
      <div>
        <label>Fecha:</label>
        <input className="form-control" type="date" required placeholder="Fecha de venta" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <div>
        <label>Precio:</label>
        <input className="form-control" type="number" required placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
      </div>
      <br></br>
      <div className='d-grid'>
      <button className="btn btn-primary" type="submit">Agregar</button>
      </div>
    </form>
  );
};

const TablaVentas = ({ ventas, onDelete }) => {
  let totalPagar = 0;

  return (
    <table className="table">
      <thead>
        <tr className="table-dark">
          <th>Nombres</th>
          <th>Categoría</th>
          <th>Importador</th>
          <th>Fecha</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Total a pagar</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map((venta, index) => {
          let totalVenta = parseFloat(venta.precio);
          if (venta.categoria !== 'Medicinas' && venta.categoria !== 'Papeleria' && venta.categoria !== 'Panaderia') {
            totalVenta *= 1.12; // Se aplica el IVA del 12%
          }
          totalPagar += totalVenta;

          return (
            <tr key={index}>
              <td>{venta.nombres}</td>
              <td>{venta.categoria}</td>
              <td>{venta.importador}</td>
              <td>{venta.fecha}</td>
              <td>{venta.precio}</td>
              <td>{venta.categoria === 'Medicinas' || venta.categoria === 'Papeleria' || venta.categoria === 'Panaderia' ? 'No aplica IVA' : 'Si aplica IVA'}</td>
              <td>{totalVenta.toFixed(2)}</td>
              <td>
                <button className='btn btn-danger' onClick={() => onDelete(index)}>Eliminar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="6">Total a pagar:</td>
          <td>{totalPagar.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

const VentasApp = () => {
  const [ventas, setVentas] = useState([]);

  const handleFormSubmit = (nuevaVenta) => {
    setVentas([...ventas, nuevaVenta]);
  };

  const handleDelete = (index) => {
    const newVentas = [...ventas];
    newVentas.splice(index, 1);
    setVentas(newVentas);
  };

  return (
    <div>
      <h1 className='text-center'>Registro de Ventas</h1>
      <FormularioVentas onSubmit={handleFormSubmit} />
      <TablaVentas ventas={ventas} onDelete={handleDelete} />
    </div>
  );
};

export default VentasApp;
