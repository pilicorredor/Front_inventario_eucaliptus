import React, { useEffect, useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import logo from "../Assets/logoInterfaces.png";
import "./CustomTableBill.css";

const CustomTableBill = ({ isSale }) => {
  const location = useLocation();
  const saleDetails = location.state?.saleDetails || [];
  const dataSale = location.state?.dataSale || {};
  const clientData = location.state?.clientData || {};
  const purchaseID = location.state?.purchaseID || [];
  const pruchaseDate = location.state?.pruchaseDate || {};
  const purchaseDetails = location.state?.purchaseDetails || {};
  const providerID = location.state?.providerID || {};
  const [dateBill, setDateBill] = useState("");
  const [idBill, setIdBill] = useState("");
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

  const createRow = (name, use, unitPrice, qty, tax) => {
    const subtotal = priceRow(qty, unitPrice);
    return { name, use, unitPrice, qty, subtotal, tax };
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (isSale) {
      const saleRows = saleDetails.map((product) => {
        return createRow(
          product.productDTO.productName,
          product.productDTO.use,
          product.salePriceWithoutIva,
          product.quantitySold,
          product.iva || 0
        );
      });
      const subtotalSale = subtotal(saleRows);
      const taxesSale = taxTotal(saleRows);

      setRows(saleRows);
      setInvoiceSubtotal(subtotalSale);
      setInvoiceTaxes(taxesSale);
      setInvoiceTotal(subtotalSale + taxesSale);
      setIdBill(dataSale.idSale);
      const formattedDate = formatDate(dataSale.dateSale);
      setDateBill(formattedDate);
    } else {
      const purchaseRows = purchaseDetails.map((product) => {
        return createRow(
          product.productDTO.productName,
          product.productDTO.use,
          product.purchasePriceWithoutIva,
          product.quantityPurchased,
          product.iva
        );
      });
      const formattedDate = formatDate(pruchaseDate);
      setDateBill(formattedDate);
      setIdBill(purchaseID);

      const subtotalPurchase = subtotal(purchaseRows);
      const taxesPurchase = taxTotal(purchaseRows);

      setRows(purchaseRows);
      setInvoiceSubtotal(subtotalPurchase);
      setInvoiceTaxes(taxesPurchase);
      setInvoiceTotal(subtotalPurchase + taxesPurchase);
    }
  }, [isSale, location.state]);

  return (
    <div class="paper-bill">
      <div class="container-bill">
        <div class="header-bill">
          <div class="company-info">
            <img src={logo} alt="Logo Empresa" class="company-logo" />
            <div>
              <h3>Nombre de la Empresa</h3>
              <p>NIT: 123456789</p>
              <p>Dirección: Calle 123 #45-67</p>
              <p>Celular: 3001234567</p>
            </div>
          </div>
          <div class="invoice-info">
            <h3>Información de la Factura</h3>
            <p>Número de Factura: {idBill}</p>
            <p>Fecha de Emisión: {dateBill}</p>
          </div>
        </div>

        <div class="provider-info">
          {isSale ? (
            <>
              <h3>Datos del Cliente</h3>
              <div class="provider-columns">
                <div>
                  <p>Documento: {clientData?.idClient || "N/A"}</p>
                  <p>Nombre: {clientData?.nameClient || "N/A"}</p>
                  <p>Correo: {clientData?.email || "N/A"}</p>
                </div>
                <div>
                  <h3>Datos del Vendedor</h3>
                  <p>ID Vendedor: {dataSale?.idSeller || "N/A"}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h3>Datos del Proveedor</h3>
              <div class="provider-columns">
                <div>
                  <p>Documento: {providerID || "N/A"}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 800 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
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
                <TableCell align="center">{row.use}</TableCell>
                <TableCell align="center">{row.unitPrice.toFixed(2)}</TableCell>
                <TableCell align="center">{row.qty}</TableCell>
                <TableCell align="right">{row.subtotal.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={3} align="right">
                Subtotal
              </TableCell>
              <TableCell align="right">{invoiceSubtotal.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align="right">
                IVA
              </TableCell>
              <TableCell align="right">{invoiceTaxes.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align="right">
                Total
              </TableCell>
              <TableCell align="right">{invoiceTotal.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTableBill;
