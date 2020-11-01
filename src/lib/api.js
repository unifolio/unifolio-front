import axios from 'axios'

export const getUsers = () => {
  const response = axios.get("http://127.0.0.1:8000/users/api/v1/users/")
    .then((resolve) => {
      return resolve.data;
    })
    .catch((error) => {
      console.log("getPost", error.response);
      return error.resonse;
    });
  return response;
}