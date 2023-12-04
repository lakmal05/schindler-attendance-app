import axios from "axios";
import { baseUrl } from "./apiConfig";

export const getAllMarkedAttendanceList = (data) => {
  //**Get the tool_box_number and the leader_emp_id send it as a params and querry date (the executen date)
  return axios.get(baseUrl+"attendance/all-attendance");
};
