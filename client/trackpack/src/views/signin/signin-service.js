import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const url = "http://localhost:5000";

export const signIn = async (userData) => {
    let errorMessage;
    await axios.
        post(url+'/login', userData)
        .then(res => {
            const {access_token} = res.data;
            localStorage.setItem("jwtToken", access_token);
            setAuthToken(access_token);
        })
        .catch((err) => {
            errorMessage = err.response.data;
        })
    return errorMessage;
}