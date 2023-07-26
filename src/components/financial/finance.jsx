import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../header/header";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import Bill from "./bill/bill";
import FinanceDetails from "./finance-details/finance-details";
const FinancePage = () => {
  const [popup, setPopUpstatus] = useState(false);
  const handle_pop_up = () => {
    setPopUpstatus(!popup);
  };
  return (
    <>
      <Helmet>
        <title>امور مالی</title>
      </Helmet>
      <Header />
      <section className="finance-wrapper page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="bill-and-time-wrapper">
            <div className="bills">
              <div className="bills-header">
                <span className="bill-header-item">شناسه کاربر</span>
                <span className="bill-header-item">دوره ها</span>
                <span className="bill-header-item">نوع و وضعیت پرداخت</span>
                <span className="bill-header-item">میزان پرداختی</span>
                <span className="bill-header-item">
                  تاریخ و زمان آخرین پرداخت
                </span>
                <span className="bill-header-item  show-details"></span>
              </div>
              <Bill handle_pop_up={handle_pop_up} />
              <Bill handle_pop_up={handle_pop_up} />
              <Bill handle_pop_up={handle_pop_up} />
              <Bill handle_pop_up={handle_pop_up} />
            </div>
            <div className="choose-time-wrapper">
              <span className="title-wrapper">
                <span className="title">بازه زمانی</span>
                <span className="cross">
                  <span className="line-1 line"></span>
                  <span className="line-2 line"></span>
                </span>
              </span>
              <span className="choose-time start">۱۲ اردیبهشت ۱۴۰۲</span>
              <span className="till">تا</span>
              <span className="choose-time end">۱۲ اردیبهشت ۱۴۰۲</span>
            </div>
          </div>
        </div>
      </section>
      {popup ? <FinanceDetails handle_pop_up={handle_pop_up} /> : ""}
    </>
  );
};

export default FinancePage;
