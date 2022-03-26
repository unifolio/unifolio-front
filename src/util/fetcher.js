import { axiosInstance } from 'lib/api';

const fetcher = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export default fetcher;
