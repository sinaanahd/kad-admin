import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import scrollToTop from "../functions/scroll";

import dasboardIcon from "../../asset/images/dashboard.svg";
import dasboardIconActive from "../../asset/images/dashboard-active.svg";
import financeIconActive from "../../asset/images/finance-icon.svg";
import financeIcon from "../../asset/images/finance-icon-active.svg";
import classesIcon from "../../asset/images/classes-icon.svg";
import classesIconActive from "../../asset/images/class-icon-active.svg";
import usersIcon from "../../asset/images/users-icon.svg";
import usersIconActive from "../../asset/images/users-icon-active.svg";
import bannersIcon from "../../asset/images/banners-icon.svg";
import bannersIconActive from "../../asset/images/banner-icon-active.svg";
import elanatIcon from "../../asset/images/elanat-icon.svg";
import gozasheratIcon from "../../asset/images/gozareshat.svg";
import my_accountIcon from "../../asset/images/my-account.svg";
import my_accountIconActive from "../../asset/images/my-account-active.svg";
const SideBar = () => {
  const [menu_items, setMenuItems] = useState([
    {
      imgs: [dasboardIcon, dasboardIconActive],
      type: true,
      url: "reports",
      text: "گزارش ها",
      required_level: [20],
      id: 0,
    },
    {
      imgs: [financeIcon, financeIconActive],
      type: true,
      url: "accounting",
      text: "حسابداری",
      required_level: [20],
      id: 1,
    },
    {
      imgs: [classesIcon, classesIconActive],
      type: true,
      url: "payments",
      text: "پرداختی ها",
      required_level: [12, 20],
      id: 11,
    },
    {
      imgs: [classesIcon, classesIconActive],
      type: true,
      url: "classes",
      text: "کلاس ها",
      required_level: [10, 20],
      id: 2,
    },
    {
      imgs: [classesIcon, classesIconActive],
      type: true,
      url: "doreha",
      text: "دوره ها",
      required_level: [10, 20],
      id: 13,
    },
    {
      imgs: [usersIcon, usersIconActive],
      type: true,
      url: "users",
      text: "کاربران",
      required_level: [10, 20],
      id: 3,
    },
    {
      imgs: [my_accountIcon, my_accountIconActive],
      type: true,
      url: "essentials",
      text: "پیشنیاز ها",
      required_level: [20, 10, 9, 7],
      id: 4,
    },
    {
      imgs: [my_accountIcon, my_accountIconActive],
      type: true,
      url: "account",
      text: "حساب من",
      required_level: [20, 10, 9, 7, 12],
      id: 5,
    },
    {
      imgs: [bannersIcon, bannersIconActive],
      type: true,
      url: "banners",
      text: "بنر ها",
      required_level: [20],
      id: 6,
    },
    // {
    //   imgs: [elanatIcon],
    //   type: false,
    //   url: "notify",
    //   text: "اعلانات",
    //   required_level: [20, 10, 9, 7],
    //   id: 7,
    // },
    // {
    //   imgs: [gozasheratIcon],
    //   type: false,
    //   url: "reports",
    //   text: "گزارشات",
    //   required_level: [20, 10, 9, 7],
    //   id: 8,
    // },
    {
      imgs: [financeIcon, financeIconActive],
      type: true,
      url: "all-admins",
      text: "ادمین ها",
      required_level: [20],
      id: 10,
    },
    {
      imgs: [financeIcon, financeIconActive],
      type: true,
      url: "all-teachers",
      text: "اساتید",
      required_level: [20, 10, 9],
      id: 12,
    },
  ]);
  const { user } = useContext(DataContext);
  const [active_item, setActive] = useState(
    window.location.pathname.split("/")[1]
  );
  useEffect(() => {
    const sample_menu = [];
    menu_items.forEach((menu_item) => {
      if (menu_item.required_level.includes(user.level)) {
        sample_menu.push(menu_item);
      }
    });
    setMenuItems(sample_menu);
  }, []);
  return (
    <aside className="side-bar-wrapper">
      <nav>
        {menu_items.map((menu_item) =>
          menu_item.type ? (
            <Link
              key={menu_item.id}
              onClick={() => {
                scrollToTop();
              }}
              to={`/${menu_item.url}`}
              className={
                active_item === menu_item.url
                  ? "side-bar-item active-item"
                  : "side-bar-item"
              }
            >
              <img
                src={
                  active_item === menu_item.url
                    ? menu_item.imgs[1]
                    : menu_item.imgs[0]
                }
                alt={menu_item.text}
              />
              <span className="side-bar-item-text">{menu_item.text}</span>
            </Link>
          ) : (
            <span key={menu_item.id} className={"side-bar-item"}>
              <img src={menu_item.imgs[0]} alt={menu_item.text} />
              <span className="side-bar-item-text">{menu_item.text}</span>
            </span>
          )
        )}
        {/* <span
          onClick={() => {
            scrollToTop();
          }}
          to="/dashboard"
          className={
            active_item === "dashboard"
              ? "side-bar-item active-item"
              : "side-bar-item"
          }
        >
          <img
            src={active_item === "dashboard" ? "" : dasboardIcon}
            alt="داشبورد"
          />
          <span className="side-bar-item-text">داشبورد</span>
        </span>
        <Link
          onClick={() => {
            scrollToTop();
          }}
          to="/finance"
          className={
            active_item === "finance"
              ? "side-bar-item active-item"
              : "side-bar-item"
          }
        >
          <img
            src={active_item === "finance" ? financeIconActive : financeIcon}
            alt="امور مالی"
          />
          <span className="side-bar-item-text">امور مالی</span>
        </Link>
        <span
          onClick={() => {
            scrollToTop();
          }}
          to="/classes"
          className={
            active_item === "classes"
              ? "side-bar-item active-item"
              : "side-bar-item"
          }
        >
          <img
            src={active_item === "classes" ? "" : classesIcon}
            alt="کلاس ها"
          />
          <span className="side-bar-item-text">کلاس ها</span>
        </span>
        <span
          onClick={() => {
            scrollToTop();
          }}
          to="/users"
          className={
            active_item === "users"
              ? "side-bar-item active-item"
              : "side-bar-item"
          }
        >
          <img
            src={active_item === "users" ? "" : dasboardIcon}
            alt="کاربران"
          />
          <span className="side-bar-item-text">کاربران</span>
        </span>
        <Link
          onClick={() => {
            scrollToTop();
          }}
          to="/essentials"
          className={
            active_item === "essentials"
              ? "side-bar-item active-item"
              : "side-bar-item"
          }
        >
          <img
            src={
              active_item === "essentials"
                ? my_accountIconActive
                : my_accountIcon
            }
            alt="پیشنیازها"
          />
          <span className="side-bar-item-text">پیشنیاز ها</span>
        </Link>
        <Link
          onClick={() => {
            scrollToTop();
          }}
          to="/account"
          className={
            active_item === "account"
              ? "side-bar-item active-item"
              : "side-bar-item"
          }
        >
          <img
            src={
              active_item === "account" ? my_accountIconActive : my_accountIcon
            }
            alt="حساب من"
          />
          <span className="side-bar-item-text">حساب من</span>
        </Link>
        <span
          onClick={() => {
            scrollToTop();
          }}
          to="/banners"
          className={
            active_item === "banners"
              ? "side-bar-item active-item"
              : "side-bar-item"
          }
        >
          <img
            src={active_item === "banners" ? "" : bannersIcon}
            alt="بنر ها"
          />
          <span className="side-bar-item-text">بنر ها</span>
        </span>
        <span
          onClick={() => {
            scrollToTop();
          }}
          to="/notify"
          className={
            active_item === "notify"
              ? "side-bar-item active-item"
              : "side-bar-item"
          }
        >
          <img src={active_item === "notify" ? "" : elanatIcon} alt="اعلانات" />
          <span className="side-bar-item-text">اعلانات</span>
        </span>
        <span
          onClick={() => {
            scrollToTop();
          }}
          to="/reports"
          className={
            active_item === "reports"
              ? "side-bar-item active-item"
              : "side-bar-item"
          }
        >
          <img
            src={active_item === "reports" ? "" : gozasheratIcon}
            alt="گزارشات"
          />
          <span className="side-bar-item-text">گزارشات</span>
        </span> */}
      </nav>
      <span className="kad-panel-version">
        <span className="text">کاد پنل</span>
        <span className="version-wrapper">Version: 1.0.0.11</span>
      </span>
    </aside>
  );
};

export default SideBar;
