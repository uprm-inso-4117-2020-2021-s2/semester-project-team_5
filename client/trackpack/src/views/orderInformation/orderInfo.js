import React from "react";
import "./orderInfo.css";
import OrderDetails from "../../components/orderInformation";

function orderInfo() {
  return (
    <div className="wrapper">
      <OrderDetails
        name="Playstation 5"
        orderDate="3/20/2021"
        shippingProvider="USPS"
        estimatedDate="3/30/2021"
        deliveryAddress="Calle Rosario, Fajardo PR"
        imageLink="https://cnet1.cbsistatic.com/img/WX20LOucnk5Vrhd6pJnHw9xoC2Y=/940x0/2020/06/14/5d28ba20-1eea-4dbe-a5ec-3ddc81ced029/ps5-render-cropped.jpg"
      />
    </div>
  );
}

export default orderInfo;
