import React, { Component } from "react";
import { FaSpinner } from "react-icons/fa";

const LittleLoading = () => {
  return (
    <span className="inside-loader">
      <FaSpinner />
    </span>
  );
};

export default LittleLoading;
