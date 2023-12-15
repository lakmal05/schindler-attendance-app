import { Slide, toast } from "react-toastify";
import { Fragment } from "react";
import { Avatar } from "antd";

import Cookies from "js-cookie";
import * as constant from "../constant/constants";

// export const isObjEmpty = obj => Object.keys(obj).length === 0

// // ** Returns K format from a number
// export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

// ** FaCheck s if the passed date is today
const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

// export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
//   if (!value) return value
//   return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
// }

// ** Returns short month of passed date
// export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
//   const date = new Date(value)
//   let formatting = { month: 'short', day: 'numeric' }

//   if (toTimeForCurrentDay && isToday(date)) {
//     formatting = { hour: 'numeric', minute: 'numeric' }
//   }

//   return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
// }

export const getWeekDates = () => {
  const currentDate = new Date();
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i - currentDate.getDay());
    // console.log(date);
    const weekName = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .substring(0, 3);
    const dayNumber = date.getDate();
    // console.log("Week Name:", weekName);
    // console.log("Day Number:", dayNumber);
    const objectCalancer = {
      weekName: weekName,
      dayNumber:dayNumber
    };
    // console.log(objectCalancer);
    dates.push(objectCalancer);
  }

  return dates;
};

export const isUserLoggedIn = () => Cookies.get(constant.ACCESS_TOKEN);

export const customToastMsg = (message, type) => {
  if (type === 2) {
    toast.info(message, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else if (type === 0) {
    toast.error(message, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else if (type === 1) {
    toast.success(message, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const isEmpty = (str) => {
  return !str || str.length === 0;
};
