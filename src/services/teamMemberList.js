import axios from "axios";

export const getAllMarkedAttendanceList = (data) => {
  //**Get the tool_box_number and the leader_emp_id send it as a params and querry date (the executen date)
  return axios.get("http://localhost:3005/attendance/all-attendance");
};
