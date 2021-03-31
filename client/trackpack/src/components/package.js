import React, { useState } from "react";
import "./package.css";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

function Package({ name, deliveryDate, status, category }) {
  const [isHidden, setHidden] = useState(false);
  const [icon, setIcon] = useState(<BsFillCaretDownFill size="20px" />);

  const hideView = () => {
    setHidden(!isHidden);
    if (isHidden) {
      setIcon(<BsFillCaretDownFill size="20px" />);
    } else {
      setIcon(<BsFillCaretUpFill size="20px" />);
    }
  };

  return (
    <div className="container">
      <div className={isHidden ? "itemCategory2" : "itemCategory"}>
        <span id="categoryInfo">{category}</span>
        <button id="categoryInfo" onClick={hideView}>
          <span>{icon}</span>
        </button>
      </div>
      <div className={isHidden ? "packageNoInfo" : "packageInfo"}>
        <div className="imageContainer">
          <img
            className="icon"
            src="https://static.thenounproject.com/png/20088-200.png"
            placeholder="stock image"
          ></img>
        </div>
        <div className="itemName">
          <span id="iName">{name}</span>
        </div>
        <div className="itemInfo">
          <span className="iInfo">Estimated delivery date: {deliveryDate}</span>
          <span className="iInfo">Status: {status}</span>
        </div>
      </div>
    </div>
  );
}

export default Package;
