import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import Bill from "./bill/bill";
import FinanceDetails from "./finance-details/finance-details";
import { DataContext } from "../context/DataContext";
import LittleLoading from "../reusable/little-loading";

const FinancePage = () => {
  const [popup, setPopUpstatus] = useState(false);
  const [factor, setFactor] = useState(false);
  const { factors, kelasses, user, get_factors } = useContext(DataContext);
  const [searched_factors, setSearched_factors] = useState(false);
  const handle_pop_up = (factor) => {
    if (popup) {
      setPopUpstatus(false);
    } else {
      setFactor(factor);
      setPopUpstatus(true);
    }
  };
  useEffect(() => {
    if (!user) {
      window.location.pathname = "/login";
    } else {
      if (user.level < 20) {
        window.location.pathname = "/account";
      } else {
        get_factors();
      }
    }
  }, []);
  const handle_factor_search = (value) => {
    let result = false;
    if (value.length > 2) {
      result = [
        ...factors.filter(
          (f) =>
            f.user_fullname.includes(value) || f.phone_number.startsWith(value)
        ),
      ];
    }
    setSearched_factors(result);
    // console.log(result);
  };
  return (
    <>
      <Helmet>
        <title>امور مالی</title>
      </Helmet>
      <section className="finance-wrapper page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="bill-and-time-wrapper">
            <div className="bills">
              <div className="bills-header">
                <span className="bill-header-item">شناسه/شماره کاربر</span>
                <span className="bill-header-item">دوره ها</span>
                <span className="bill-header-item">نوع و وضعیت پرداخت</span>
                <span className="bill-header-item">میزان پرداختی</span>
                <span className="bill-header-item">
                  تاریخ و زمان آخرین پرداخت
                </span>
                <span className="bill-header-item  show-details">
                  <input
                    type="text"
                    placeholder="جستجو نام یا شماره کاربر"
                    className="finance-search"
                    onInput={({ target }) => {
                      handle_factor_search(target.value);
                    }}
                  />
                </span>
              </div>
              {factors ? (
                searched_factors && searched_factors.length !== 0 ? (
                  searched_factors.map((f, i) => (
                    <Bill
                      key={i++}
                      factor={f}
                      handle_pop_up={handle_pop_up}
                      kelasses={kelasses}
                    />
                  ))
                ) : searched_factors.length === 0 ? (
                  "موردی برای نمایش وجود ندارد"
                ) : (
                  factors.map((f, i) => (
                    <Bill
                      key={i++}
                      factor={f}
                      handle_pop_up={handle_pop_up}
                      kelasses={kelasses}
                    />
                  ))
                )
              ) : (
                <LittleLoading />
              )}
            </div>
            {/* <div className="choose-time-wrapper">
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
            </div> */}
          </div>
        </div>
      </section>
      {popup ? (
        <FinanceDetails
          factor={factor}
          handle_pop_up={handle_pop_up}
          kelasses={kelasses}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default FinancePage;
