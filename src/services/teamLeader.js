import axios from "axios";
import { baseUrl } from "./apiConfig";
import CircularJSON from "circular-json";

export const markTeamLeader = async (data) => {
  console.log(data, "axios request==========");
  const stringifiedData = CircularJSON.stringify(data);
  return await axios
    .post("http://localhost:3005/attendance/mark-attendance", stringifiedData)
    .then((res) => {
      console.log(res, "atten");
    })
    .catch((error) => {
      console.error("Error in Axios request:", error);
    });
};

export const updateTeamleader = async (data) => {
  return true;
  // return await axios.put(baseUrl + "/", credentials);
};

export const getTeamLeader = async (TeamLeaderID) => {
  return true;
  // //  return await axios.get(baseUrl + "/", {
  //     params: {
  //       TLID: TeamLeaderID,
  //     },
  //   });
};

// delete teamLeader attendance
