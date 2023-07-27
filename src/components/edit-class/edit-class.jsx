import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../header/header";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";

import sampleImg from "../../asset/images/sample-class-img.png";
import arrowLeft from "../../asset/images/arrow-left.svg";
import sample_user from "../../asset/images/sample-user.svg";
import arrowDown from "../../asset/images/arrow-down.svg";
const EditClassPage = () => {
  const [dropDown, setDropDowm] = useState(false);
  const [dayPicker, setDayPicker] = useState(false);
  const handle_drop_down = () => {
    setDropDowm(!dropDown);
  };
  const handle_day_picker = () => {
    setDayPicker(!dayPicker);
  };
  return (
    <>
      <Helmet>
        <title>ویرایش کلاس</title>
      </Helmet>
      <Header />
      <section className="edit-class-page page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="class-banner-edit">
            <div className="class-card">
              <span to="/classes/:id" className="img-wrapper">
                <img src={sampleImg} alt="اسم کلاس" />
              </span>
              <span className="class-info">
                <span className="class-teacher-name">
                  <span className="class-name">عربی انسانی</span>
                  <span className="teacher-name">استاد پارسا سرائیه</span>
                </span>
                <span className="prices-wrppaer">
                  <span className="normal-price">۱٬۲۰۰٬۰۰۰تومان</span>
                  <span className="discounted-price">۷۰۰٬۰۰۰ تومان</span>
                </span>
              </span>
            </div>
            <div className="edit-satge-area">
              <span className="editing-item">
                <span className="arrow">
                  <img src={arrowLeft} alt="چپ" />
                </span>
                <span className="editing-texts">
                  <span className="editing-text">درحال ویرایش دوره</span>
                  <span className="class-name">
                    عربی انسانی - دکتر مهران ترکمان
                  </span>
                </span>
              </span>
              <div className="filters-wrapper">
                <span className="filter">
                  <span className="filter-title">عنوان درس</span>
                  <input type="text" placeholder="عربی انسانی" />
                </span>
                <span className="filter">
                  <span className="filter-title">مشخصات استاد</span>
                  <span
                    className="drop-down-sample"
                    onClick={() => {
                      handle_drop_down();
                    }}
                  >
                    استاد مهران ترکمان
                  </span>
                  {dropDown ? (
                    <span className="input-options">
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                      <span className="input-option">استاد مهران ترکمان</span>
                    </span>
                  ) : (
                    <></>
                  )}
                </span>
                <span className="filter">
                  <span className="filter-title">قیمت اصلی</span>
                  <input type="number" placeholder="1200000" />
                </span>
                <span className="filter">
                  <span className="filter-title">قیمت پس از اعمال تخفیف</span>
                  <input type="number" placeholder="700000" />
                </span>
              </div>
              <div className="btns-wrapper">
                <span className="edit-btn">حذف دوره</span>
                <span className="edit-btn save-changes-btn">اعمال تغییرات</span>
              </div>
            </div>
          </div>
          <div className="session-edits-wrapper">
            <div className="session-wrapper">
              <div className="teachers-img-name">
                <img src={sample_user} alt="عکس استاد" />
                <span className="teacher-name">دکتر مهران ترکمان</span>
              </div>
              <span className="choose-jalase">اضافه کردن جلسه تدریس:</span>
              <span className="date-picker">
                <span className="date-picker-box">
                  <span className="date-picker-text">انتخاب روز</span>
                  <img
                    src={arrowDown}
                    alt="پایین"
                    className={
                      dayPicker ? "arrow-down rotate-arrow" : "arrow-down"
                    }
                    onClick={() => {
                      handle_day_picker();
                    }}
                  />
                </span>
                <span
                  className={
                    dayPicker
                      ? "pick-days-wrapper"
                      : "pick-days-wrapper no-show"
                  }
                >
                  <span className="select-day selected-day">شنبه</span>
                  <span className="select-day">یکشنبه</span>
                  <span className="select-day">دوشنبه</span>
                  <span className="select-day">سه شنبه</span>
                  <span className="select-day">چهارشنبه</span>
                  <span className="select-day">پنجشنبه</span>
                  <span className="select-day">جمعه</span>
                </span>
                <span className="choose-time">
                  <span className="start time-white">11</span>
                  <span className="till">الی</span>
                  <span className="start time-white">13:30</span>
                </span>
              </span>
            </div>
            <div className="calender-wrapper"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditClassPage;
