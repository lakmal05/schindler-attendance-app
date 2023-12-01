import { useEffect } from "react";
import { useLocation } from "react-router";
import Cookies from "js-cookie";
import * as constant from "../constant/constants";



export const isEmpty = (str) => {
  return !str || str.length === 0;
};

export const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};



export const logOutUser = () => {
  console.log("logOut");
  Cookies.remove(constant.ACCESS_TOKEN);
  Cookies.remove(constant.REFRESH_TOKEN);
  Cookies.remove(constant.Expire_time);
  Cookies.remove("userDetails");
  Cookies.remove(constant.ACCESS_TOKEN);
  window.location = `/login`;
};

export const setCommonErrorMessage = (e) => {
  let msg = e.response.data.message
    ? e.response.data.message
    : "Something went wrong";
  return msg;
};

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
