import axios from 'axios';

class API {
	get() {
		const api = {
			users: () => {
				const response = axios
					.get('http://127.0.0.1:8000/users/api/v1/users/')
					.then((resolve) => {
						return resolve;
					})
					.catch((error) => {
						return error.response;
					});
				return response;
			},
		};
		// const user = () => {
		// 	localStorage.setItem("unifolioAccess", response.data.access);
		// };
	}
	post() {
		const api = {
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

			newUser: (formData) => {
				console.log('postUserData formData', formData);
				const response = axios
					.post('http://127.0.0.1:8000/users/api/v1/users/new', formData)
					.then((resolve) => {
						return resolve.data;
					})
					.catch((error) => {
						return error.response;
					});
				return response;
			},

			tokenUser: (data) => {
				const response = axios
					.post('http://127.0.0.1:8000/users/api/v1/token/', data)
					.then((resolve) => {
						return resolve.data;
					})
					.catch((error) => {
						return error.response;
					});
				return response;
			},
		};

		return api;
	}
}

const instance = new API();
export { instance as API };

export const getUsers = () => {
	const response = axios
		.get('http://127.0.0.1:8000/users/api/v1/users/')
		.then((resolve) => {
			return resolve;
		})
		.catch((error) => {
			return error.response;
		});
	return response;
};

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
