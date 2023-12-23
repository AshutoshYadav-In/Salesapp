import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import axios from "axios";

function Addsale() {
  const inputStyle = {
    height: "45px",
  };
  // State variables for product details
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [saleStatus, setSaleStatus] = useState("");

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductQuantityChange = (event) => {
    setProductQuantity(event.target.value);
  };

  const handleProductAmountChange = (event) => {
    setProductAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/addsale", {
        productName,
        productQuantity,
        productAmount,
      },{
        withCredentials: true, // Send cookies with the request
      });
  
      if (res.data.message === "saleadded" && res.status === 200) {
        setSaleStatus("Sale data added successfully");
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        switch (status) {
          case 401:
            setSaleStatus("Bad Request");
            break;
          default:
            setSaleStatus("Internal Server Error");
            break;
        }
      } else {
        setSaleStatus("Internal Server Error");
      }
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Sale Entry</h2>
      {saleStatus != "" ? (
        <div className="alert alert-primary" role="alert">
          {saleStatus}
        </div>
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="Product Name"
            style={inputStyle}
            value={productName}
            onChange={handleProductNameChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            className="form-control"
            id="quantity"
            placeholder="Quantity"
            style={inputStyle}
            min="0" // Ensure quantity is not negative
            value={productQuantity}
            onChange={handleProductQuantityChange}
          />
          <div className="invalid-feedback">Quantity cannot be negative.</div>
        </div>
        <div className="mb-4">
          <input
            type="number"
            className="form-control"
            id="amount"
            placeholder="Amount"
            style={inputStyle}
            min="0" // Ensure amount is not negative
            value={productAmount}
            onChange={handleProductAmountChange}
          />
          <div className="invalid-feedback">Amount cannot be negative.</div>
        </div>
        <button type="submit" className="btn btn-primary coloradjust w-100">
          Add Sale
        </button>
      </form>
    </div>
  );
}

export default Addsale;
