import axios from "axios";
import { baseUrl } from "./apiConfig";

export const markTeamMember = async (credentials) => {
  return true;
  //return await axios.post(baseUrl+"/",credentials);
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
