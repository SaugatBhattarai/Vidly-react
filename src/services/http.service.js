import axios from "axios";
import { toast } from "react-toastify";
import logger from "./log.service";


axios.interceptors.response.use(null, err => {
  const expectedError =
    err.response && err.response.status >= 400 && err.response.status < 500;

  if (!expectedError) {
    logger.log('error',err);
    toast.error("An unexpected error occurred.");
  }

  return Promise.reject(err);
});

export function setJwt(jwt){
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
