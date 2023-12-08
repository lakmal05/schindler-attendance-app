import axios from "axios";
import { baseUrl } from "./apiConfig";

export const markTeamLeader = async (data) => {
  return await axios.post(baseUrl + "attendance/mark-attendance", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateTeamleader = async (credentials) => {
  // return true;
  return await axios.put(baseUrl +"attendance/update", credentials);
};

export const getTeamLeader = async (TeamLeaderID) => {
  return true;
  // //  return await axios.get(baseUrl + "/", {
  //     params: {
  //       TLID: TeamLeaderID,
  //     },
  //   });
};

export const getTeamLeaderAttendance = (TeamLeaderID) => {};

export const getLeaderAttendanceByAttendanceId = async (attendanceId) => {
  return await axios.get(
    baseUrl + "attendance/get-leader-attendance/"+attendanceId
  );
};

// delete teamLeader attendance
