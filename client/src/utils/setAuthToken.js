import axios from "axios";

export const setAuthToken = (token) => {
  console.log(`setAuthToken Triger : ${token}`);
  // console.log(request.headers)
  if (token) {
    // Apply authorization token to every request if logged in
    console.log(`setToken : ${token}`);
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const getToken = () => {
  console.log(localStorage.getItem('jwtToken'))
  return localStorage.getItem('jwtToken')
}
