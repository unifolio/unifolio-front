import axios from 'axios'

export const getUsers = () => {
  const response = axios.get("http://127.0.0.1:8000/users/api/v1/users/")
    .then((resolve) => {
      return resolve;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
}

export const postUserDataToGetUserToken = (formData) => {
  const config = {
    headers: { "Content-Type": "application/json" }
  }
  let data = new FormData();
  data.append("username", formData.username);
  data.append("password", formData.password);
  const response = axios.post("http://127.0.0.1:8000/api/token/", data, config)
    .then((resolve) => {
      return resolve;
    })
    .catch((error) => {
      console.log("postUserDataToGetUserToken EEEEE", error.response);
      return error.response;
    });
  return response;
}

export const postUserData = (formData) => {
  console.log("postUserData formData", formData)
  const response = axios.post("http://127.0.0.1:8000/users/api/v1/users/new", formData)
    .then((resolve) => {
      return resolve.data;
    })
    .catch((error) => {
      // console.log("getPost", error.response);
      return error.response;
    });
  return response;
}