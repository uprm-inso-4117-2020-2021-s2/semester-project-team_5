import React, { useState } from "react";
import "./trackPackage.css";

function TrackPackage() {
  const [values, setValues] = useState([
    { option: "Unlisted" },
    { option: "Electronics" },
    { option: "Food" },
    { option: "Clothes" },
  ]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setValues((prevState) => [...prevState, { option: e.target.value }]);
    }
  };
  const deleteText = (e) => {
    e.target.value = "";
  };

  return (
    <div className="mainPage">
      <div className="trackContainer">
        <span className="titles"> Add a package to track </span>
        <div className="info">
          <div className="trackingInfo">
            <h1>Enter Tracking Number:</h1>
            <input className="trackInput"></input>
          </div>
          <div className="trackingInfo">
            <h1>Select Category for your package:</h1>
            <select className="categoryList">
              {values.map((value) => (
                <option>{value.option}</option>
              ))}
            </select>
          </div>
          <div className="trackingInfo">
            <h1>Add a category:</h1>
            <input
              placeholder="Enter Category"
              onKeyPress={handleKeyDown}
              className="catName"
              onClick={deleteText}
            ></input>
          </div>
          <div className="trackingInfo">
            <h1>Enter a name to identify the package:</h1>
            <input className="nameInput"></input>
          </div>
          <div className="trackingInfo">
            <h1>Add a image:</h1>
            <button className="imageButton">Select image</button>
          </div>
          <div className="addInfo">
            <button className="addButton">Add to Tracking List</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TrackPackage;
