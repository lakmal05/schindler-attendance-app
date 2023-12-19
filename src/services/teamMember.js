import axios from "axios";
import { baseUrl } from "./apiConfig";

export const markTeamMember = async (data) => {
  // return true;
  return await axios.post(baseUrl+"attendance/mark-attendance", data)
};

export const updateTeamMember = async (credentials) => {
  return await axios.put(baseUrl+"attendance/update-teamMember" , credentials);
};

export const getTeamMember = async (TeamMemberID) => {
  return true;
  // return await axios.get(baseUrl+"/", {
  //     params :{
  //         TMID : TeamMemberID
  //     }
  // });
};

// export const getAllTeamMembers = async () => {
//   return true;
//   // return await axios.get(baseUrl+"/");
//   // return karanne okkoma dala thiyana data object array ekak
// };

// delete teamMember attendance
