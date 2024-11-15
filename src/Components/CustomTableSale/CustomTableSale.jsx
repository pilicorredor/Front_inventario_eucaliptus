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

const CustomTableSale = ({
  widthTable,
  dataProducts,
  customColumns,
  onAddToSummary,
  handleRemove,
  isNewSale,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [quantities, setQuantities] = useState(
    dataProducts.reduce((acc, product) => {
      acc[product.id_modify] = 0;
      return acc;
    }, {})
  );

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleIncrement = (id, maxQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.min(prevQuantities[id] + 1, maxQuantity),
    }));
  };

  const handleDecrement = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] - 1, 0),
    }));
  };

  const handleInputChange = (id, value, maxQuantity) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: Math.min(parsedValue, maxQuantity),
      }));
    }
  };

  const columnNamesLabels = {
    id_modify: "ID",
    idProduct: "ID",
    productName: "Nombre",
    quantity: "Cantidad disponible",
    quantitySelected: "Cantidad",
    useProduct: "Uso",
    unitPrice: "Precio",
    subTotal: "SubTotal",
  };

  const handleEdit = (id) => {
    console.log("editar");
  };

  return (
    <Paper sx={{ width: widthTable, overflow: "hidden", margin: "auto" }}>
      <div style={{ display: "flex", flexDirection: "column", height: "80%" }}>
        <TableContainer sx={{ maxHeight: 250 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{
              tableLayout: "fixed",
              width: "100%",
              minWidth: 300,
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
                {isNewSale && (
                  <TableCell
                    sx={{
                      backgroundColor: "#F8DEC4",
                      color: "#000000",
                      textAlign: "center",
                      borderRight: "1px solid #ddd",
                    }}
                  >
                    Añadir Cantidad
                  </TableCell>
                )}
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
              {dataProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover tabIndex={-1} key={row.id_modify}>
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
                    {isNewSale && (
                      <TableCell
                        sx={{
                          textAlign: "center",
                          borderRight: "1px solid #ddd",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => handleDecrement(row.id_modify)}
                          style={{
                            margin: "5px 5px",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={quantities[row.id_modify] ?? 0}
                          onChange={(e) =>
                            handleInputChange(
                              row.id_modify,
                              e.target.value,
                              row.quantity
                            )
                          }
                          style={{
                            width: "30px",
                            height: "30px",
                            textAlign: "center",
                          }}
                        />
                        <button
                          onClick={() =>
                            handleIncrement(row.id_modify, row.quantity)
                          }
                          style={{
                            margin: "5px 5px",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                        >
                          +
                        </button>
                      </TableCell>
                    )}
                    <TableCell
                      sx={{
                        textAlign: "center",
                        borderRight: "1px solid #ddd",
                        padding: "10px",
                      }}
                    >
                      {isNewSale ? (
                        <button
                          onClick={() =>
                            onAddToSummary(row, quantities[row.id_modify])
                          }
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
                          Añadir
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
                            onClick={() => handleRemove(row.id_modify)}
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
          count={dataProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  );
};

export default CustomTableSale;
