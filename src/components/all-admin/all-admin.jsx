import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import Header from "../header/header";
import WelcomeName from "../welcome-name/welcome-name";
import { DataContext } from "../context/DataContext";
import conver_to_persian from "../functions/convert-to-persian";
import LittleLoading from "../reusable/little-loading";
import scrollToTop from "../functions/scroll";

import search_icon from "../../asset/images/search-icon-users.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Admin from "./admin/admin";
const AllAdminPage = () => {
  const { all_admins, user, get_all_admins } = useContext(DataContext);
  const [searched_admins, setSearchedAdmins] = useState(false);
  const search_admin = (value) => {
    const ref_admins = [...all_admins];
    if (value.length >= 3) {
      const searched_admins = ref_admins.filter((a) =>
        a.fullname.includes(value)
      );
      setSearchedAdmins(searched_admins);
    } else {
      setSearchedAdmins(false);
    }
  };
  useEffect(() => {
    if (!user) {
      window.location.pathname = "/login";
    } else {
      if (user.level < 20) {
        window.location.pathname = "/account";
      } else {
        get_all_admins();
      }
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>ادمین ها</title>
      </Helmet>
      <Header />
      <section className="users-page page-wrapper all-admins-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="cols-wrapper">
            <div className="users-table">
              <div className="table-header">
                <span className="item-wrapper">اسم ادمین</span>
                <span className="item-wrapper">نوع ادمین</span>
                <span className="item-wrapper">تعداد ثبت نامی</span>
                <span className="item-wrapper">موجودی حساب</span>
                <span className="item-wrapper search-item">
                  <input
                    type="text"
                    placeholder="نام ادمین را جستجو کنید"
                    onInput={({ target }) => {
                      search_admin(target.value);
                    }}
                  />
                  <img src={search_icon} alt="جستجو" />
                </span>
              </div>
              {searched_admins ? (
                searched_admins.length === 0 ? (
                  <div className="table-content">موردی یافت نشد</div>
                ) : (
                  searched_admins.map((a) => (
                    <Admin key={a.admin_id} admin={a} />
                  ))
                )
              ) : all_admins ? (
                all_admins.map((a) => <Admin key={a.admin_id} admin={a} />)
              ) : (
                <LittleLoading />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllAdminPage;
