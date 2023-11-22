import {baseUrl} from "../services/apiConfig"
import axios from 'axios';

//login -> user naem passowrd 
//axios
//send  user name password 
//token 
//check and route to dashbord 


export const userLogin = (dataObj) => {
    axios({
        method: 'get',
        url: baseUrl+'auth/login',
        responseType: 'stream',
        data:dataObj
      })
}
