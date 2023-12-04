import axios from "axios";
import { baseUrl } from "./apiConfig";

export const getAllMarkedAttendanceList = (data) => {
  const url = `${baseUrl}attendance/all-attendance`;
  return axios.get(
    `${baseUrl}attendance/all-attendance/${data.leader_emp_id}`,
    {
      params: {
        execute_date: data.execute_date,
        tool_box_no: data.tool_box_no,
      },
    }
  );
};
