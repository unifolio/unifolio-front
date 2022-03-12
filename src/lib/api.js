import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import * as Service from 'services';

// const END_POINT = "http://localhost:8000";
const END_POINT = 'https://unifolio.kr:8080';
// const END_POINT = "http://unifolio.kr:8042";

const axiosInstance = axios.create({
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: false,
  }),
});
const serviceDependencies = { axios, axiosInstance, END_POINT };

const API = {
  get: {
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
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = axios
        .post(`${END_POINT}/api/v1/token/`, data, config)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log('post.newToken Error', error.response);
          return error.response;
        });
      return response;
    },
  },
  patch: {},

  mergeWith: function (serviceInstance) {
    try {
      if (!serviceInstance) throw new Error('serviceInstance is corrupted');
      Object.entries(serviceInstance).forEach(([key, service]) => {
        this[key] = { ...this[key], ...service };
      });
    } catch (e) {
      console.error(e);
    }
  },
};

API.mergeWith(Service.User(serviceDependencies));
API.mergeWith(Service.Union(serviceDependencies));
API.mergeWith(Service.Post(serviceDependencies));

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
