const unionService = ({ axios, axiosInstance, END_POINT }) => {
  return {
    get: {
      unions: () => {
        const response = axiosInstance
          .get(`${END_POINT}/unions/`)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      unionsWaiting: () => {
        const response = axiosInstance
          .get(`${END_POINT}/unions/waiting/`)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      union: (id) => {
        const response = axiosInstance
          .get(`${END_POINT}/${id}`)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },

      unionDetail: (id) => {
        const response = axiosInstance
          .get(`${END_POINT}/unions/manage/${id}/`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      unionManageOwner: (userId) => {
        const response = axiosInstance
          .get(`${END_POINT}/unions/manage/owner/${userId}/`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      get_protocol: (id) => {
        const response = axiosInstance
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
      unionManageUser: ({ unionId, userId }) => {
        const response = axiosInstance
          .get(`${END_POINT}/unions/manage/union/${unionId}/user/${userId}`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      unionCommunicatedList: ({ userId }) => {
        const response = axiosInstance
          .get(`${END_POINT}/unions/manage/communicatedlist/${userId}`)
          .then((response) => response.data)
          .catch((e) => e.response);
        return response;
      },
    },
    post: {
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
      newUnionBusiness: (data) => {
        const response = axios
          .post(`${END_POINT}/unions/create/business`, data)
          .then(async (response) => {
            return await response;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      unionRequest: (data) => {
        const response = axios
          .post(`${END_POINT}/unions/manage/request`, data)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      unionApproveRequest: (data) => {
        const response = axios
          .post(`${END_POINT}/unions/manage/request/approve`, data)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
    },
    put: {
      unionDenyRequest: (data) => {
        const response = axios
          .put(`${END_POINT}/unions/manage/request/deny`, data)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      unionComplete: (id) => {
        const response = axios
          .put(`${END_POINT}/unions/manage/${id}/complete`, {
            is_recruited: true,
            is_completed: true,
          })
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
    },
  };
};

export default unionService;
