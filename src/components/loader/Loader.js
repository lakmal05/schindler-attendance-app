import React from "react";
import "./Loader.scss";

const Loader = ({ loading }) => {
  const pageHeight = document.documentElement.scrollHeight;
  console.log("Page height:", pageHeight);

  console.log(loading, "++++");
  return (
    loading && (
      <div id="loader_div" style={{ height: pageHeight }}>
        <div class="custom-loader"></div>
      </div>
    )
  );
};

export default Loader;
