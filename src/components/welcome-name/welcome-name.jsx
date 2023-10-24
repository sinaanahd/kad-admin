import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import LittleLoading from "../reusable/little-loading";
import add_icon from "../../asset/images/add-icon.svg";
const WelcomeName = () => {
  const { user } = useContext(DataContext);
  const [pause, setPause] = useState(false);
  const [xls_pause, setXls_pause] = useState(false);
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
  const get_excel_report_paria = () => {
    const slug = parseInt(window.location.pathname.split("/")[2]);
    console.log(slug);
    setXls_pause(true);
    axios
      .get(
        `https://kadschool.com/backend/kad_api/admin_kelas_members_report/${slug}`
      )
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          window.open(response, "_blank");
        } else {
          alert("مشکلی پیش آمده لطفا دوباره تلاش کنید");
          console.log(error);
        }
        setXls_pause(false);
      })
      .catch((e) => console.log(e));
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
            <>
              <div className="export-excel">
                <Link to="/add-new-class" className="welcome-add-new-class">
                  اضافه کردن کلاس جدید
                </Link>
                <Link
                  to="/confirm-class"
                  className="welcome-add-new-class confirm-btn"
                >
                  کلاس‌های تایید نشده
                </Link>
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
                {xls_pause ? (
                  <span className="get-class-report">
                    <LittleLoading />
                  </span>
                ) : (
                  <span
                    className="get-class-report"
                    onClick={() => {
                      get_excel_report_paria();
                    }}
                  >
                    دریافت گزارش
                  </span>
                )}
              </div>
            </>
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
