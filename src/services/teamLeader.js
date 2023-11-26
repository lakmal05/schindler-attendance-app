import axios from "axios";
import { baseUrl } from "./apiConfig";

export const markTeamLeader = async (credentials) => {
  return await axios.post(baseUrl + "/", credentials);
};

export const updateTeamleader = async (credentials) => {
  return await axios.put(baseUrl + "/", credentials);
};

export const getTeamLeader = async (TeamLeaderID) => {
  return await axios.get(baseUrl + "/", {
    params: {
      TLID: TeamLeaderID,
    },
  });
};

// delete teamLeader attendance