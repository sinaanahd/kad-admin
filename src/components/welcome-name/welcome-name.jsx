import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

import add_icon from "../../asset/images/add-icon.svg";
const WelcomeName = () => {
  const { user } = useContext(DataContext);
  return (
    <>
      <div className="welcome-text-wrapper">
        <div className="welcome-text">
          {user.fullname + " "}
          خوش اومدی! 👋
        </div>
        <div className="options">
          <div className="welcome-filter">
            <span className="welcome-filter-text">فیلتر</span>
            <img src={add_icon} alt="اضافه کردن" />
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeName;
