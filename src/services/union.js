
const unionService = ({ axios, axiosInstance, END_POINT }) => {
  return {
    get: {
      unions: () => {
        const response = axios.get(`${END_POINT}/unions/`)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      union: (id) => {
        const response = axios.get(`${END_POINT}/${id}`)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },    
      unionDetail: (id) => {
        const response = axios.get(`${END_POINT}/unions/manage/${id}/`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      get_protocol: (id) => {
        const response = axios.get(`${END_POINT}/unions/${id}/get_protocol`)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      create_protocol: (id) => {
        const response = axios.get(`${END_POINT}/unions/${id}/create_protocol`)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
    },
    post: {
      newUnion: (data) => {
        const response = axios.post(`${END_POINT}/unions/create/general`, data)
          .then(async (response) => {
            return await response;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
      newUnionBusiness: (data) => {
        const response = axios.post(`${END_POINT}/unions/create/business`, data)
          .then(async (response) => {
            return await response;
          })
          .catch((error) => {
            return error.response;
          });
        return response;
      },
    }
  }
}

export default unionService;