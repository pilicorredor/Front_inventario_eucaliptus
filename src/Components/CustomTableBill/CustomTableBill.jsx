import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProductContext } from "../../Context/ProductContext";

const CustomTableBill = () => {
  const { productsTable } = useContext(ProductContext);

  const priceRow = (qty, unitPrice) => qty * unitPrice;

  const subtotal = (items) =>
    items.map(({ subtotal }) => subtotal).reduce((sum, i) => sum + i, 0);

  const taxTotal = (items) =>
    items
      .map(({ tax, subtotal }) => subtotal * (tax / 100))
      .reduce((sum, i) => sum + i, 0);

  const createRow = (name, category, use, unitPrice, qty, tax) => {
    const subtotal = priceRow(qty, unitPrice);
    return { name, category, use, unitPrice, qty, subtotal, tax };
  };

  const rows = productsTable.map((product) =>
    createRow(
      product.productName,
      product.category,
      product.use,
      product.inputUnitPrice,
      product.quantity,
      product.iva
    )
  );

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = taxTotal(rows);
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="product table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Categoría</TableCell>
            <TableCell align="center">Uso</TableCell>
            <TableCell align="center">Precio Unitario</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.category}</TableCell>
              <TableCell align="center">{row.use}</TableCell>
              <TableCell align="center">{row.unitPrice}</TableCell>
              <TableCell align="center">{row.qty}</TableCell>
              <TableCell align="right">{row.subtotal.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={4} align="right">
              Subtotal
            </TableCell>
            <TableCell align="right">{invoiceSubtotal.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} align="right">
              IVA
            </TableCell>
            <TableCell align="right">{invoiceTaxes.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} align="right">
              Total
            </TableCell>
            <TableCell align="right">{invoiceTotal.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTableBill;
