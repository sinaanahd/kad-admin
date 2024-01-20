import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import ReloadBtn from "../reusable/reload-btn";
import SellersReport from "./seller-report/seller-reports";
import MonthlyDiagram from "./monthly-diagram/monthly-diagram";
import { DataContext } from "../context/DataContext";
import MakeMonthReport from "./make-month-report/make-month-report";
const AllReports = () => {
  const { set_accounting_payments, get_accounting_payments } =
    useContext(DataContext);
  const handle_reload = (e) => {
    set_accounting_payments(false);
    get_accounting_payments();
  };
  return (
    <>
      <Helmet>گزارشات پنل ادمین</Helmet>
      <section className="all-reports-wrapper page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="add-class-page mm-width">
            <div className="section-header">
              <h1 className="page-title">گزارشات فروش</h1>
              <ReloadBtn click={handle_reload} />
            </div>
            <MakeMonthReport />
            <div className="monthly-sales-wrapper">
              <h2 className="section-title">فروش ماهانه</h2>
              <MonthlyDiagram />
            </div>
            <div className="monthly-sales-wrapper">
              <h2 className="section-title">فروش هر فروشنده</h2>
              <SellersReport />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllReports;
