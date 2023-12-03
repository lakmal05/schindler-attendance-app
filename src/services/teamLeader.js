import axios from "axios";
import { baseUrl } from "./apiConfig";
import CircularJSON from "circular-json";
const flatted = require("flatted");

export const markTeamLeader = async (data) => {
  console.log(data.sign, "axios request==========");
  console.log(data.signurl);
  const body = {
    sign: data.signurl,
  };
  const serializedData = flatted.stringify(body);
  // const stringifiedData = CircularJSON.stringify(data);
  return await axios
    .post("http://localhost:3005/attendance/mark-attendance", serializedData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response, "REs");
    })
    .catch((c) => {
      console.log(c, "error");
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
