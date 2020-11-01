import axios from "axios";
import setAuthToken from "./setAuthToken";
import jwt_decode from "jwt-decode";

// Registrer User
export const registerUser = (userData, history) => {
  axios
    .post("/api/user/register", userData)
    .then((res) => history.push("/login")) // redirect to login on successful register
    .catch((err) => {
      console.error("Error registering");
    });
};

// Login - get user token
export const loginUser = (userData) => {
  axios.post("/api/users/login", userData).then((res) => {
    // Save to localStorage

    // Set token to localStorage
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    setCurrentUser(decoded);
  });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  // TODO: Add userContext to check if user is login and set it using this function
  return {
    payload: decoded,
  };
};

// // User loading
// export const setUserLoading = () => {
//     return {

//     }
// }

// Log user out
export const logoutUser = () => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set is Authenticated to false
  setCurrentUser({});
};

// Add new post
export const addPost = (post) => {
  axios
    .post("http://localhost:5000/api/posts/newpost", post)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

// Fetch all posts
export const getAllPosts = async () => {
  const results = await axios.get("http://localhost:5000/api/posts/allpost");
  return results.data;
};

// Add new Comment
export const addComment = (comment) => {
  axios
    .post("http://localhost:5000/api/posts/newcomment", comment)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
