import axios from "axios";

export const addCategory = async(newCategory) => {
    const url = "http://localhost:5000";
      let errorMessage;
      let response = await axios
        .post(url + "/categories", newCategory)
        .catch((err) => {
          errorMessage = err.response.data;
      })
  return errorMessage ? errorMessage : response.data;
  }