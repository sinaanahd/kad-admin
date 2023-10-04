import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

import add_icon from "../../asset/images/add-icon.svg";
import axios from "axios";
import LittleLoading from "../reusable/little-loading";
const WelcomeName = () => {
  const { user } = useContext(DataContext);
  const [pause, setPause] = useState(false);
  const get_excel_link = () => {
    setPause(true);
    axios
      .get("https://kadschool.com/backend/kad_api/moradi_report")
      .then((res) => {
        console.log(res.data);
        const { link } = res.data;
        setPause(false);
        window.open(link, "_blank");
        // window.open(
        //   "https://kadschool.com/media/MoradiReport/report_id_5.xlsx",
        //   "_blank"
        // );
      })
      .catch((e) => console.log(e.message));
  };
  return (
    <>
      <div className="welcome-text-wrapper">
        <div className="welcome-text">
          {user.fullname + " - "}
          {user.admin_type + " "}
          خوش اومدی! 👋
        </div>
        {user ? (
          user.level === 20 ? (
            <div className="export-excel">
              {pause ? (
                <span className="export-excel-btn">
                  <LittleLoading />
                </span>
              ) : (
                <span
                  onClick={() => {
                    get_excel_link();
                  }}
                  className="export-excel-btn"
                >
                  دریافت فایل اکسل
                </span>
              )}
            </div>
          ) : (
            <></>
          )
        ) : (
          <LittleLoading />
        )}
      </div>
    </>
  );
};

export default WelcomeName;
