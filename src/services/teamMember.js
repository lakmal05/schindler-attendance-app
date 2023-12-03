import axios from "axios";
import { baseUrl } from "./apiConfig";

export const markTeamMember = async (data) => {
  // return true;
  return await axios
    .post("http://localhost:3005/attendance/mark-attendance", data)
    .then((response) => {
      console.log(response, "response of axios");
    })
    .catch((c) => {
      console.log("catch", c);
    });
};

export const updateTeamMember = async (credentials) => {
  return true;
  //return await axios.put(baseUrl+"/" , credentials);
};

export const getTeamMember = async (TeamMemberID) => {
  return true;
  // return await axios.get(baseUrl+"/", {
  //     params :{
  //         TMID : TeamMemberID
  //     }
  // });
};

export const getAllTeamMembers = async () => {
  return true;
  // return await axios.get(baseUrl+"/");
  // return karanne okkoma dala thiyana data object array ekak
};

// delete teamMember attendance
