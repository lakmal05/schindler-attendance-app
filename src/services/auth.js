import { baseUrl } from "../services/apiConfig";
import axios from "axios";

//login -> user naem passowrd
//axios
//send  user name password
//token
//check and route to dashbord
const url= 'http://192.168.1.42:3005/auth/login'

export const userLogin = async (credentials) => {
  return await axios.post('http://192.168.1.42:3005/auth/login', credentials);
  // .then((res) => {});
};

export const userLogout = async () => {
  //route to login page 
  //logout and clear local storage or session
};
