import { Slide, toast } from "react-toastify";
import { Fragment } from "react";
import { Avatar } from "antd";

import Cookies from "js-cookie";
import * as constant from "../constant/constants";

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

export const getWeekDates = () => {
  const currentDate = new Date();
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i - currentDate.getDay());
    const weekName = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .substring(0, 3);
    const dayNumber = date.getDate();
    const objectCalancer = {
      weekName: weekName,
      dayNumber:dayNumber
    };

    dates.push(objectCalancer);
  }

  return dates;
};

export const isUserLoggedIn = () => Cookies.get(constant.ACCESS_TOKEN);

export const customToastMsg = (message, type) => {
  if (type === 2) {
    toast.info(message, {
      position: "top-right",
      autoClose: 1000,
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
      autoClose: 1000,
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
      autoClose: 1000,
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
