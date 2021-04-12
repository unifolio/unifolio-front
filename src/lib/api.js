import axios from 'axios';
const END_POINT = "http://127.0.0.1:8000";

const API = {
  get: {
    users: () => {
      const response = axios
        .get(`${END_POINT}/users/`)
        .then((resolve) => {
          return resolve;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
    unions: () => {
      const response = axios
        .get(`${END_POINT}/unions/`)
        .then((resolve) => {
          return resolve;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
    union: (id) => {
      const response = axios
        .get(`${END_POINT}/${id}`)
        .then((resolve) => {
          return resolve;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
    get_protocol: (id) => {
      const response = axios
        .get(`http://127.0.0.1:8000/unions/${id}/get_protocol`)
        .then((resolve) => {
          return resolve;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
    create_protocol: (id) => {
      const response = axios
        .get(`http://127.0.0.1:8000/unions/${id}/create_protocol`)
        .then((resolve) => {
          return resolve;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
  },
  post: {
    newToken: (data) => {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const response = axios
        .post('http://127.0.0.1:8000/api/v1/token/', data, config)
        .then((resolve) => {
          return resolve;
        })
        .catch((error) => {
          console.log('post.newToken Error', error.response);
          return error.response;
        });
      return response;
    },

    newUser: async (formData) => {
      console.log('postUserData formData', formData);
      // const response = await axios.post('http://127.0.0.1:8000/users/new/', formData);
      // console.log("response", response)
      
      const result = await axios
        // .post('http://127.0.0.1:8000/users/api/v1/users/new', formData)
        .post('http://127.0.0.1:8000/users/new/', formData)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error)
          return error.response;
        });
      console.log(result)
      return result;
    },
    
    tokenToGetUser: (data) => {
      const response = axios
        .post('http://127.0.0.1:8000/users/token/', data)
        .then((resolve) => {
          return resolve;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },

    newUnion: (data) => {
      const response = axios.post(`${END_POINT}/unions/create/`, data)
        .then(async (resolve) => {
          return await resolve;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
  },
  patch: {
    user: (id, data) => {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const response = axios
        .patch(`http://127.0.0.1:8000/users/${id}/`, data, config)
        .then((resolve) => {
          console.log(resolve);
          return resolve;
        })
        .catch((error) => {
          console.log('patch user Error', error.response);
          return error.response;
        });
      console.log(response);
      return response;
    },
    additionalUserEducation: (id, data) => {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const response = axios
        .patch(`http://127.0.0.1:8000//users/mypage/additional/${id}/`, data, config)
        .then((resolve) => {
          console.log(resolve);
          return resolve;
        })
        .catch((error) => {
          console.log('patch user Error', error.response);
          return error.response;
        });
      console.log(response);
      return response;
    }
  }
}

export default API;

// export const getUsers = () => {
// 	const response = axios
// 		.get('http://127.0.0.1:8000/users/')
// 		.then((resolve) => {
// 			return resolve;
// 		})
// 		.catch((error) => {
// 			return error.response;
// 		});
// 	return response;
// };

// export const postUserDataToGetToken = (data) => {
// 	const config = {
// 		headers: { 'Content-Type': 'application/json' },
// 	};
// 	// let data = new FormData();
// 	// data.append("email", formData.email);
// 	// data.append("password", formData.email);
// 	const response = axios
// 		.post('http://127.0.0.1:8000/api/v1/token/', data, config)
// 		.then((resolve) => {
// 			return resolve;
// 		})
// 		.catch((error) => {
// 			console.log('postUserDataToGetToken Error', error.response);
// 			return error.response;
// 		});
// 	return response;
// };

// export const postUserData = (formData) => {
// 	console.log('postUserData formData', formData);
// 	const response = axios
// 		.post('http://127.0.0.1:8000/users/api/v1/users/new', formData)
// 		.then((resolve) => {
// 			return resolve.data;
// 		})
// 		.catch((error) => {
// 			// console.log("getPost", error.response);
// 			return error.response;
// 		});
// 	return response;
// };
