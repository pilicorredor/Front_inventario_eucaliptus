import React, { useState } from 'react';
import './DataTable.css';

const DataTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reiniciar a la primera página
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const getRowStyle = (fechaVencimiento) => {
    const hoy = new Date();

    const [dia, mes, año] = fechaVencimiento.split('/').map(Number);
    const vencimiento = new Date(año, mes - 1, dia);
  
    // Calcular la diferencia en días
    const diferenciaDias = Math.floor((vencimiento - hoy) / (1000 * 60 * 60 * 24));
  
    if (diferenciaDias <= 7 && diferenciaDias >= 0) {
      return { backgroundColor: 'rgba(255, 0, 0, 0.1)' }; // Color rojo claro
    } else if (diferenciaDias < 0) {
      return { backgroundColor: 'rgb(248,85,85)' };
    }
    return {};
  };
  

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Nombre</th>
            <th>Cantidad a vencer</th>
            <th>Fecha de vencimiento</th>
            <th>Operación</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index} style={getRowStyle(item.fechaVencimiento)}>
              <td>{item.idProducto}</td>
              <td>{item.nombre}</td>
              <td>{item.cantidadVencer}</td>
              <td>{item.fechaVencimiento}</td>
              <td>{item.operacion}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <label>
          Filas por página:
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>
        <div className="page-navigation">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
