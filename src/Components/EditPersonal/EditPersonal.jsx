import React from "react";
import { useParams } from "react-router-dom";

const EditPersonal = () => {
  const { role, id } = useParams();

  return (
    <div>
      <h2>Editar {role === "proveedor" ? "Proveedor" : "Vendedor"}</h2>
      <p>ID del {role === "proveedor" ? "Proveedor" : "Vendedor"}: {id}</p>

      {/* Aquí iría la llamada a una API o buscar los datos correspondientes
          según el role e id, y mostrarlos en un formulario para que el usuario los edite */}
    </div>
  );
};

export default EditPersonal;
