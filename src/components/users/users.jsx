import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import Header from "../header/header";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import { DataContext } from "../context/DataContext";
import conver_to_persian from "../functions/convert-to-persian";
import LittleLoading from "../reusable/little-loading";
import scrollToTop from "../functions/scroll";
import History from "./history/history";

import search_icon from "../../asset/images/search-icon-users.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const UsersPage = () => {
  const { user, all_users } = useContext(DataContext);
  const [searched_users, setSearched_users] = useState(false);
  useEffect(() => {
    if (user) {
      if (user.level < 10) {
        window.location.pathname = "/account";
      }
    } else {
      window.location.pathname = "/account";
    }
  }, []);
  const convert_subject = (s) => {
    switch (s) {
      case 0:
        return "ریاضی";
      case 1:
        return "تجربی";
      case 2:
        return "انسانی";
      case 3:
        return "هنر";
      default:
        return "وارد نشده";
    }
  };
  const convert_year = (y) => {
    switch (y) {
      case 10:
        return "دهم";
      case 11:
        return "یازدهم";
      case 12:
        return "دوازدهم";
      case 18:
        return "کنکور";
      case 0:
        return "فارغ التحصیل";
      default:
        return "وارد نشده";
    }
  };
  const search_user = (value) => {
    const users = [...all_users];
    if (value.length > 2) {
      const filtered = users.filter(
        (u) => u.phone_number.startsWith(value) || u.name.includes(value)
      );
      setSearched_users(filtered);
    }
  };
  return (
    <>
      <Helmet>
        <title>کاربران</title>
      </Helmet>
      <Header />
      <section className="users-page page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="cols-wrapper">
            <div className="users-table">
              <div className="table-header">
                <span className="item-wrapper">شناسه کاربر</span>
                <span className="item-wrapper">شماره موبایل</span>
                <span className="item-wrapper">پایه</span>
                <span className="item-wrapper">رشته</span>
                <span className="item-wrapper">کلاس ها</span>
                <span className="item-wrapper search-item">
                  <input
                    type="text"
                    placeholder="جست و جو شماره تلفن یا نام کاربر"
                    onInput={({ target }) => {
                      search_user(target.value);
                    }}
                  />
                  <img src={search_icon} alt="جستجو" />
                </span>
              </div>
              {searched_users ? (
                searched_users.length === 0 ? (
                  <div className="table-content">موردی یافت نشد</div>
                ) : (
                  searched_users.map((u) => (
                    <div key={u.user_id} className="table-content">
                      <span className="data-wrapper">{u.name}</span>
                      <span className="data-wrapper">{u.phone_number}</span>
                      <span className="data-wrapper">
                        {convert_year(u.year)}
                      </span>
                      <span className="data-wrapper">
                        {convert_subject(u.subject)}
                      </span>
                      <span className="data-wrapper">
                        {conver_to_persian(u.kelases.length)} کلاس
                      </span>
                      <span className="data-wrapper btn-box">
                        <Link
                          className="details-btn"
                          to={`/users/${u.user_id}`}
                          onClick={() => {
                            scrollToTop();
                          }}
                        >
                          جزئیات کاربر
                        </Link>
                      </span>
                    </div>
                  ))
                )
              ) : all_users ? (
                all_users.map((u) => (
                  <div key={u.user_id} className="table-content">
                    <span className="data-wrapper">{u.name}</span>
                    <span className="data-wrapper">{u.phone_number}</span>
                    <span className="data-wrapper">{convert_year(u.year)}</span>
                    <span className="data-wrapper">
                      {convert_subject(u.subject)}
                    </span>
                    <span className="data-wrapper">
                      {conver_to_persian(u.kelases.length)} کلاس
                    </span>
                    <span className="data-wrapper btn-box">
                      <Link
                        className="details-btn"
                        to={`/users/${u.user_id}`}
                        onClick={() => {
                          scrollToTop();
                        }}
                      >
                        جزئیات کاربر
                      </Link>
                    </span>
                  </div>
                ))
              ) : (
                <LittleLoading />
              )}
              {/* <div className="table-content">
                <span className="data-wrapper">پارسا سرائیه</span>
                <span className="data-wrapper">۰۹۱۲۱۲۳۴۵۶۷</span>
                <span className="data-wrapper">دوازدهم</span>
                <span className="data-wrapper">انسانی</span>
                <span className="data-wrapper">۳ کلاس</span>
                <span className="data-wrapper btn-box">
                  <Link
                    className="details-btn"
                    to="/users/:id"
                    onClick={() => {
                      scrollToTop();
                    }}
                  >
                    جزئیات کاربر
                  </Link>
                </span>
              </div>
              <div className="table-content">
                <span className="data-wrapper">پارسا سرائیه</span>
                <span className="data-wrapper">۰۹۱۲۱۲۳۴۵۶۷</span>
                <span className="data-wrapper">دوازدهم</span>
                <span className="data-wrapper">انسانی</span>
                <span className="data-wrapper">۳ کلاس</span>
                <span className="data-wrapper btn-box">
                  <Link
                    className="details-btn"
                    to="/users/:id"
                    onClick={() => {
                      scrollToTop();
                    }}
                  >
                    جزئیات کاربر
                  </Link>
                </span>
              </div>
              <div className="table-content">
                <span className="data-wrapper">پارسا سرائیه</span>
                <span className="data-wrapper">۰۹۱۲۱۲۳۴۵۶۷</span>
                <span className="data-wrapper">دوازدهم</span>
                <span className="data-wrapper">انسانی</span>
                <span className="data-wrapper">۳ کلاس</span>
                <span className="data-wrapper btn-box">
                  <Link
                    className="details-btn"
                    to="/users/:id"
                    onClick={() => {
                      scrollToTop();
                    }}
                  >
                    جزئیات کاربر
                  </Link>
                </span>
              </div>
              <div className="table-content">
                <span className="data-wrapper">پارسا سرائیه</span>
                <span className="data-wrapper">۰۹۱۲۱۲۳۴۵۶۷</span>
                <span className="data-wrapper">دوازدهم</span>
                <span className="data-wrapper">انسانی</span>
                <span className="data-wrapper">۳ کلاس</span>
                <span className="data-wrapper btn-box">
                  <Link
                    className="details-btn"
                    to="/users/:id"
                    onClick={() => {
                      scrollToTop();
                    }}
                  >
                    جزئیات کاربر
                  </Link>
                </span>
              </div>
              <div className="table-content">
                <span className="data-wrapper">پارسا سرائیه</span>
                <span className="data-wrapper">۰۹۱۲۱۲۳۴۵۶۷</span>
                <span className="data-wrapper">دوازدهم</span>
                <span className="data-wrapper">انسانی</span>
                <span className="data-wrapper">۳ کلاس</span>
                <span className="data-wrapper btn-box">
                  <Link
                    className="details-btn"
                    to="/users/:id"
                    onClick={() => {
                      scrollToTop();
                    }}
                  >
                    جزئیات کاربر
                  </Link>
                </span>
              </div>
              <div className="table-content">
                <span className="data-wrapper">پارسا سرائیه</span>
                <span className="data-wrapper">۰۹۱۲۱۲۳۴۵۶۷</span>
                <span className="data-wrapper">دوازدهم</span>
                <span className="data-wrapper">انسانی</span>
                <span className="data-wrapper">۳ کلاس</span>
                <span className="data-wrapper btn-box">
                  <Link
                    className="details-btn"
                    to="/users/:id"
                    onClick={() => {
                      scrollToTop();
                    }}
                  >
                    جزئیات کاربر
                  </Link>
                </span>
              </div> */}
            </div>
            <History />
          </div>
        </div>
      </section>
    </>
  );
};

export default UsersPage;
