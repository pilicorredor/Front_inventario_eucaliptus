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

const CustomTable = ({ data, customColumns, onDelete, role }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [entity, setEntity] = useState("proveedor");
  const [action, setAction] = useState("registrar");

  const handleModalOpen = ({ selectedEntity, selectedAction }) => {
    setEntity(selectedEntity);
    setAction(selectedAction);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    //Acá se llamaría el servicio de eliminar
    setOpenModal(false);
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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", margin: "auto" }}>
      <div style={{ display: "flex", flexDirection: "column", height: "80%" }}>
        <TableContainer sx={{ maxHeight: 300 }}>
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
                    {column}
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
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(row.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          handleModalOpen({
                            selectedEntity:
                              role === "proveedor"
                                ? ENTITIES.PROVEEDOR
                                : ENTITIES.VENDEDOR,
                            selectedAction: BUTTONS_ACTIONS.ELIMINAR,
                          })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
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
        />
      </div>
    </Paper>
  );
};

export default CustomTable;
