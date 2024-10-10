import React from 'react';

const ModalEliminar = ({ proveedor, onClose, onConfirm }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h4>¿Está seguro de que desea eliminar a {proveedor.nombre}?</h4>
                <div className="modal-actions">
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={onConfirm}>Eliminar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalEliminar;
