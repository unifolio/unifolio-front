const userService = ({ axios, axiosInstance, END_POINT }) => {
  return {
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
        // users general 현재 데이터 0개
        // 임시로 변경
        const response = axios.get(`${END_POINT}/users/general/?limit=50`)
        // const response = axios.get(`${END_POINT}/users/business/?limit=50`)
          .then((resolve) => {
            return resolve;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      userBusiness: ({ userId }) => {
        const response = axiosInstance
          .get(`${END_POINT}/users/business/${userId}/`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      naverCallback: ({code}) => {
        const response = axiosInstance.get(`${END_POINT}/users/signin/naver/callback/?code=${code}`)
          .then((response) => { return response.date; })
          .catch((error) => { return error.response; });
        return response;
      },
      userVerify: ({ key }) => {
        const response = axiosInstance.get(`${END_POINT}/users/verify/${key}`)
          .then((response) => { return response.date; })
          .catch((error) => { return error.response; });
        return response;
      }
      
    },
    post: {
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
            if (!response.data.status) return {...response.data, status: response.status }
            else return {...response.data};
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
    },
    patch: {
      userGeneral: async (id, data) => {
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
      userBusiness: async (id, data) => {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const response = await axios
          .patch(`${END_POINT}/users/business/${id}/`, data, config)
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
    }
  }
}

export default userService;