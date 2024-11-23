import React, { useEffect, useState } from "react";
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
    const [year, month, day] = isoDate.split("T")[0].split("-");
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
    <div className="paper-bill">
      <div className="container-bill">
        <div className="header-bill">
          <div className="company-info">
            <img src={logo} alt="Logo Empresa" className="company-logo" />
            <div>
              <h3>Nombre de la Empresa</h3>
              <p>NIT: 123456789</p>
              <p>Dirección: Calle 123 4-12</p>
              <p>Celular: 3128888829</p>
            </div>
          </div>
          <div className="invoice-info">
            <h3>Información de la Factura</h3>
            <p>Número de Factura: {idBill}</p>
            <p>Fecha de Emisión: {dateBill}</p>
          </div>
        </div>

        <div className="provider-info">
          {isSale ? (
            <>
              <h3>Datos del Cliente</h3>
              <div className="provider-columns">
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
              <div className="provider-columns">
                <div>
                  <p>Documento: {providerID || "N/A"}</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Uso</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.use}</td>
                  <td>
                    {row.unitPrice.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>
                  <td>{row.qty}</td>
                  <td>
                    {row.subtotal.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="align-right">
                  Subtotal
                </td>
                <td colSpan="2" align="right">
                  {invoiceSubtotal.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="align-right">
                  IVA
                </td>
                <td colSpan="2" align="right">
                  {invoiceTaxes.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="align-right">
                  Total
                </td>
                <td colSpan="2" align="right">
                  {invoiceTotal.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomTableBill;
