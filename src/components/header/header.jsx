import React from "react";
import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

import arrow_drop_down from "../../asset/images/arrow_drop_down.svg";
import searchImg from "../../asset/images/search.svg";
import bellImg from "../../asset/images/bell.svg";
const Header = () => {
  const { user } = useContext(DataContext);
  const [active_notif, setActive_notif] = useState(false);
  const handel_notif_status = () => {
    setActive_notif(!active_notif);
  };
  const [logOut, setLogOut] = useState(false);
  const delete_local = () => {
    window.localStorage.clear();
  };
  return (
    <header className="main-header">
      <div className="user-img-name">
        <span className="user-img">
          <img src="" alt="" />
        </span>
        <span className="user-name">{user.fullname}</span>
        <span
          className="open-drop-down"
          onClick={() => {
            setLogOut(!logOut);
          }}
        >
          <img src={arrow_drop_down} alt="پایین" />
        </span>
        {logOut ? (
          <span
            className="exit-from-user"
            onClick={() => {
              delete_local();
              window.location.pathname = "/login";
            }}
          >
            خروج از حساب کاربری
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="search-part">
        <img src={searchImg} alt="جستجو" />
        <input type="text" placeholder="جست و جو سریع" />
      </div>
      <div
        className="notif-part"
        onClick={() => {
          handel_notif_status();
        }}
      >
        {!active_notif ? <span className="active-notif"></span> : <></>}
        <img src={bellImg} alt="نوتیفیکشین ها" />
      </div>
    </header>
  );
};

export default Header;
