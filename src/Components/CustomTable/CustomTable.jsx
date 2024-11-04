import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomModal from "../../Modales/CustomModal";
import { BUTTONS_ACTIONS, ENTITIES } from "../../Constants/Constants";

const CustomTable = ({
  data,
  customColumns,
  role,
  handleUpdateData,
  fetchProductsData,
  context,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [entity, setEntity] = useState("proveedor");
  const [action, setAction] = useState("registrar");
  const [selectedId, setSelectedId] = useState(null);

  const handleModalOpen = ({ selectedEntity, selectedAction, id }) => {
    setEntity(selectedEntity);
    setAction(selectedAction);
    setSelectedId(id);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    handleUpdateData(role);
    if (entity === "producto") {
      fetchProductsData();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (id) => {
    navigate(`/modificar/${role}/${id}`);
  };

  const handleSelect = (id) => {
    navigate(`/productos/registrar/${id}`);
  };

  const columnNamesLabels = {
    name: "Nombre",
    addressCompany: "Dirección Empresarial",
    homeAddress: "Dirección de domicilio",
    email: "Correo Electrónico",
    phoneNumber: "Número de Teléfono",
    companyName: "Nombre de la Empresa",
    banckAccount: "Cuenta Bancaria",
    productName: "Nombre",
    brand: "Marca",
    categoryProduct: "Categoría",
    useProduct: "Uso",
    providerName: "Proveedor",
    idProduct: "ID del producto",
    unitName: "Unidad",
    unitDescription: "Descripción Unidad",
    //Poner despues las columnas de productos
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", margin: "auto" }}>
      <div style={{ display: "flex", flexDirection: "column", height: "80%" }}>
        <TableContainer sx={{ maxHeight: 250 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{
              tableLayout: "fixed",
              width: "100%",
              minWidth: 600,
            }}
          >
            <TableHead>
              <TableRow>
                {customColumns.map((column) => (
                  <TableCell
                    key={column}
                    sx={{
                      backgroundColor: "#F8DEC4",
                      color: "#000000",
                      textAlign: "center",
                      borderRight: "1px solid #ddd",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {columnNamesLabels[column]}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    backgroundColor: "#F8DEC4",
                    color: "#000000",
                    textAlign: "center",
                    borderRight: "1px solid #ddd",
                  }}
                >
                  Operación
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {customColumns.map((item) => (
                      <TableCell
                        key={item}
                        sx={{
                          textAlign: "center",
                          borderRight: "1px solid #ddd",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {row[item]}
                      </TableCell>
                    ))}
                    <TableCell
                      sx={{
                        textAlign: "center",
                        borderRight: "1px solid #ddd",
                        padding: "10px",
                      }}
                    >
                      {context === "registerProd" ? (
                        <button
                          onClick={() => handleSelect(row.id_modify)}
                          style={{
                            backgroundColor: "#227e3c",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                        >
                          Seleccionar
                        </button>
                      ) : (
                        <>
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEdit(row.id_modify)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() =>
                              handleModalOpen({
                                selectedEntity: role,
                                selectedAction: BUTTONS_ACTIONS.ELIMINAR,
                                id: row.id_modify,
                              })
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <CustomModal
          entity={entity}
          action={action}
          openModal={openModal}
          onClose={handleModalClose}
          id={selectedId}
        />
      </div>
    </Paper>
  );
};

export default CustomTable;
