import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
const END_POINT = "https://unifolio.kr:8080";

const axiosInstance = axios.create({
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false }),
});

const API = {
  get: {
    usersGeneral: () => {
      const response = axios
        .get(`${END_POINT}/users/general/`)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
    userGeneral: ({ userId }) => {
      const response = axiosInstance
        .get(`${END_POINT}/users/general/${userId}/`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
    usersGeneral: () => {
      const response = axios.get(`${END_POINT}/users/general/?limit=50`)
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
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
    union: (id) => {
      const response = axios
        .get(`${END_POINT}/${id}`)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },    
    union_detail: (id) => {
      const response = axios
        .get(`${END_POINT}/unions/manage/${id}/`)
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
        .get(`${END_POINT}/unions/${id}/get_protocol`)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
    create_protocol: (id) => {
      const response = axios
        .get(`${END_POINT}/unions/${id}/create_protocol`)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
    all_categories: () => {
      const response = axiosInstance
        .get(`${END_POINT}/categories/`, { cache: true })
        .then((response) => {
          return response.data;
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
        headers: { "Content-Type": "application/json" },
      };
      const response = axiosInstance
        .post(`${END_POINT}/api/v1/token/`, data, config)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log("post.newToken Error", error.response);
          return error.response;
        });
      return response;
    },
    userSignupBusiness: async (formData) => {
      const result = await axios
        .post(`${END_POINT}/users/signup/business/`, formData)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error.response;
        });
      return result;
    },
    userSignupGeneral: async (formData) => {
      const result = await axios
        .post(`${END_POINT}/users/signup/general/`, formData)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error.response;
        });
      console.log(result);
      return result;
    },

    tokenToGetUser: ({accessToken}) => {
      const response = axios
        .post(`${END_POINT}/users/token/`, {token: accessToken})
        .then((response) => {
          return {...response.data, status: response.status};
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
    newUnion: (data) => {
      const response = axios
        .post(`${END_POINT}/unions/create/general`, data)
        .then(async (response) => {
          return await response;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
  },
  patch: {
    usersGeneral: async (id, data) => {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const response = await axios
        .patch(`${END_POINT}/users/general/${id}/`, data, config)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.error("patch user Error", error.response);
          return error.response;
        });
      console.log(response);
      return response;
    },
    additionalUserEducation: (id, data) => {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const response = axios
        .patch(`${END_POINT}/users/mypage/additional/${id}/`, data, config)
        .then((response) => {
          console.log(response);
          return response;
        })
        .catch((error) => {
          console.log("patch user Error", error.response);
          return error.response;
        });
      console.log(response);
      return response;
    },
  },
};

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
