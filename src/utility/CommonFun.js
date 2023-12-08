import { useEffect } from "react";
import { useLocation } from "react-router";
import Cookies from "js-cookie";
import { getAllMarkedMemberAttendanceList } from "../services/teamMemberList";
import * as constant from "../constant/constants";

export const getAllAttendance = async () => {
  const local_storage_leader_obj = await localStorage.getItem(
    "leader_attendance_details"
  );
  const leaderObj = JSON.parse(local_storage_leader_obj);
  const data = {
    leader_emp_id: leaderObj.leader_emp_id,
    tool_box_no: leaderObj.tool_box_no,
    execute_date: leaderObj.execute_date,
  };
  //send tool_box_num and execute date and leader_emp_id as a parameters or object
  await getAllMarkedMemberAttendanceList(data)
    .then((response) => {
      if (response.data) {
        const dataarray = response.data
        // console.log(response.data, "response");
        console.log(dataarray,"data array");

        return dataarray;

        // setTeamMembersArray(response.data);
        // setTeamMembers(response.data.length);
      }

      // return null;
    })
    .catch((c) => {
      console.log(c, "error");
    });
};

// export const isEmpty = (str) => {
//   return !str || str.length === 0;
// };

export const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const logOutLeader = () => {
  console.log("logOut");
  // Cookies.remove(constant.ACCESS_TOKEN);
  // Cookies.remove(constant.REFRESH_TOKEN);
  // Cookies.remove(constant.Expire_time);
  // Cookies.remove(constant.ACCESS_TOKEN);
  localStorage.removeItem("leader_object");
  window.location = "/";
};

// export const setCommonErrorMessage = (e) => {
//   let msg = e.response.data.message
//     ? e.response.data.message
//     : "Something went wrong";
//   return msg;
// };

export const checkPermission = (permissionType) => {
  console.log();
  if (JSON.parse(Cookies?.get(constant.PERMISSION) === undefined)) {
    window.href = "/login";
  } else {
    let currentPermissions = JSON.parse(Cookies?.get(constant.PERMISSION));
    //   let PERMISSION =Cookies?.get('PERMISSION')=== undefined ?[]:JSON.parse(Cookies?.get('PERMISSION'));
    let pp = [];
    let permissionDecode = currentPermissions;

    if (permissionDecode != []) {
      permissionDecode?.map((p, index) => {
        pp.push(atob(p));
      });
    }
    // console.log(pp,'filter details :', permissionType)
    let isHavePermission = pp.includes(permissionType);
    //console.log(isHavePermission)
    return isHavePermission;
  }
};
