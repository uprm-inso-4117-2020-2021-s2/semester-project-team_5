import React from "react";
import "./orderInformation.css";

function orderInfo({
  name,
  orderDate,
  estimatedDate,
  shippingProvider,
  deliveryAddress,
  imageLink,
}) {
  return (
    <div className="orderBox">
      <h1 className="headerText">Order Information:</h1>
      <div className="orderDetails">
        <ul className="details">
          <li>
            Package name:
            <br /> {name}
          </li>
          <li>
            Order Date: <br /> {orderDate}
          </li>
          <li>
            Estimated Delivery Date: <br /> {estimatedDate}
          </li>
          <li>
            Shipping Provider: <br /> {shippingProvider}
          </li>
          <li>
            Delivery Address: <br /> {deliveryAddress}
          </li>
        </ul>
        <button className="ebutton">Edit Order</button>
        <button className="dbutton">Delete Order</button>
      </div>
      <div className="imgBox">
        <img className="orderImage" src={imageLink}></img>
      </div>
    </div>
  );
}

export default orderInfo;
