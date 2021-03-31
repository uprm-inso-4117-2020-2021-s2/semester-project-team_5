import axios from "axios";

const url = "http://localhost:5000";

var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const signUp = async (userData) => {
    let response = await axios.
        post(url+'/users', userData)
    return response.data;
}

export const verifyData = (userData, errors) => {
    errors.username = userData.username ? "" : "Username must be filled out"
    errors.password = userData.password.length < 8 ? "Must be at least 8 characters" : ""
    errors.email = userData.email.match(mailformat) ? "" : "Email is invalid"

    //Remove any empty K,V pair from errors
    for (const key in errors) {
        if (errors[key] == "") {
            delete errors[key]
        }
    }

    return errors;
}