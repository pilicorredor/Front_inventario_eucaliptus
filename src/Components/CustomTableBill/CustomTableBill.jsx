import React, { useEffect, useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProductContext } from "../../Context/ProductContext";
import { useLocation } from "react-router-dom";

const CustomTableBill = ({ isSale }) => {
  const { productsTable } = useContext(ProductContext);
  const location = useLocation();

  const [rows, setRows] = useState([]);
  const [invoiceSubtotal, setInvoiceSubtotal] = useState(0);
  const [invoiceTaxes, setInvoiceTaxes] = useState(0);
  const [invoiceTotal, setInvoiceTotal] = useState(0);

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

  useEffect(() => {
    if (isSale) {
      // Datos de venta: obtener de summaryData y consumerData
      const summaryData = location.state?.summaryData || [];
      const consumerData = location.state?.consumerData || {};

      const saleRows = summaryData.map((product) =>
        createRow(
          product.productName,
          product.categoryProduct,
          product.useProduct,
          product.unitPrice,
          product.quantitySelected,
          product.tax || 0 // Asegura que tenga un IVA, si es aplicable
        )
      );

      const subtotalSale = subtotal(saleRows);
      const taxesSale = taxTotal(saleRows);

      setRows(saleRows);
      setInvoiceSubtotal(subtotalSale);
      setInvoiceTaxes(taxesSale);
      setInvoiceTotal(subtotalSale + taxesSale);

      console.log("Datos del cliente:", consumerData); // Opcional: muestra los datos del cliente en la consola para revisión
    } else {
      // Datos de compra
      const purchaseRows = productsTable.map((product) =>
        createRow(
          product.productName,
          product.category,
          product.use,
          product.inputUnitPrice,
          product.quantity,
          product.iva
        )
      );

      const subtotalPurchase = subtotal(purchaseRows);
      const taxesPurchase = taxTotal(purchaseRows);

      setRows(purchaseRows);
      setInvoiceSubtotal(subtotalPurchase);
      setInvoiceTaxes(taxesPurchase);
      setInvoiceTotal(subtotalPurchase + taxesPurchase);
    }
  }, [isSale, location.state, productsTable]);

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
