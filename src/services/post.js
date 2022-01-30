const postService = ({ axios, axiosInstance, END_POINT }) => {
  return {
    get: {
      posts: (id = null) => {
        let response;
        if (!id) {
          response = axiosInstance
            .get(`${END_POINT}/posts/`)
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              return error.response;
            });
        }
        else {
          response = axiosInstance
            .get(`${END_POINT}/posts/${id}/`)
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              return error.response;
            });
        }
        return response;
      }
    },
    post: {
      posts: (data) => {
        const formData = new FormData();
        for (const key in data ) {
          formData.append(key, data[key]);
        }
        const response = axios
          .post(`${END_POINT}/posts/new/`, formData)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response;
          });
        return response; 
      }
    }
  }
}

export default postService;