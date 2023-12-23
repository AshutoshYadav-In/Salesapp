import React, { useState } from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { loginContext } from '../App';
function TopSales() {
const {topSales} = useContext(loginContext);

  return (
    <div className='topsalescon'>
   <p>Top Sales</p>

    <div className="container topsales">
      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col-1">#</div>
            <div className="col-2">Sales ID</div>
            <div className="col-3">Product Name</div>
            <div className="col-3">Quantity</div>
            <div className="col-3">Sales Amount</div>
          </div>
        </li>
        {topSales.map((data, index) => (
          <li key={index} className="list-group-item">
            <div className="row">
              <div className="col-1">{index +1}</div>
              <div className="col-2">{data.saleNumber}</div>
              <div className="col-3">{data.productName}</div>
              <div className="col-3">{data.productQuantity}</div>
              <div className="col-3">{data.productAmount}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default TopSales;
