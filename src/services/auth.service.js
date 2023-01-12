import axios from 'axios';

const API_URL = "https://auth-app.test/api/auth/";

const register = (firstname, lastname, email, password, password_confirmation) => {
    return axios.post(`${API_URL}register`, {
      email,
      password,
      firstname,
      lastname,
      password_confirmation
    });
};



const login = (email, password) => {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify({...response.data.data, 'token' : response.data.token}));
        }
  
        return response.data;
      });
};


const logout = () => {
    localStorage.removeItem("user");
};



export default {
    register,
    login,
    logout,
  };