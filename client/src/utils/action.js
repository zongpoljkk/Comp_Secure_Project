import axios from "axios";
import jwt_decode from "jwt-decode";
import { getToken, setAuthToken } from "./setAuthToken";
// Registrer User
export const registerUser = (userData, history) => {
  axios
    .post("http://localhost:5000/api/users/register", userData)
    .then((res) => history.push("/login")) // redirect to login on successful register
    .catch((err) => {
      console.error("Error registering");
    });
};

// Login - get user token
export const loginUser = async (userData, history) => {
  const results = await axios
    .post("http://localhost:5000/api/users/login", userData)
    .then((res) => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Route to Homepage
      history.push("/homepage");
      return decoded;
    });
  return results;
};

// Decode token
export const decodeToken = (token) => {
  const decode = jwt_decode(token);
  return decode;
};
// Set logged in user
export const setCurrentUser = (decoded) => {
  // TODO: Add userContext to check if user is login and set it using this function
  //   return {
  //     payload: decoded,
  //   };
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
export const addPost = async (post) => {
  const status = await axios
    .post("http://localhost:5000/api/posts/newpost", post, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    })
    .then((res) => {
      console.log(res);
      return "200";
    })
    .catch((err) => console.log(err));
  return status;
};

// Fetch all posts
export const getAllPosts = async () => {
  const results = await axios.get("http://localhost:5000/api/posts/allpost", {
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  });
  return results.data;
};

// Add new Comment
export const addComment = async (comment) => {
  const status = await axios
    .post("http://localhost:5000/api/posts/newcomment", comment, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    })
    .then((res) => {
      console.log(res);
      return "200";
    })
    .catch((err) => {
      console.log(err);
      return "500";
    });
  return status;
};

export const editPost = (post) => {
  axios
    .post("http://localhost:5000/api/posts/edit-post", post, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const editComment = (comment) => {
  axios
    .post("http://localhost:5000/api/posts/edit-comment", comment, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const deleteComment = (id) => {
  const result = axios
    .post("http://localhost:5000/api/posts/delete-comment", id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    })
    .then((res) => {
      console.log(res);
      return "200";
    })
    .catch((err) => {
      console.log(err);
      return "400";
    });
  return result;
};

export const deletePost = (id) => {
  const result = axios
    .post("http://localhost:5000/api/posts/delete-post", id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    })
    .then((res) => {
      console.log(res);
      return "200";
    })
    .catch((err) => {
      console.log(err);
      return "400";
    });
  return result;
};
