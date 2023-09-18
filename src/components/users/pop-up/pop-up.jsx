import React, { useState } from "react";

import cross_svg from "../../../asset/images/cross-svg.svg";
import arrow_icon from "../../../asset/images/arrow-down.svg";

const PopUp = ({ close_pop_up }) => {
  return (
    <div
      className="account-pop-up-wrapper"
      onClick={(e) => {
        close_pop_up(e);
      }}
    >
      <div className="pop-up-content">
        <span className="account-detials">
          کارنامه مالی پارسا سرائیه - ۱۲۳۴۵۶۷
        </span>
        <div className="main-details">
          <div className="details-header">
            <span className="detial-item first-col">شماره موبایل</span>
            <span className="detial-item">پایه</span>
            <span className="detial-item">رشته</span>
            <span className="detial-item">تاریخ ثبت‌نام</span>
            <span className="detial-item">ورود از کمپین</span>
            <span className="detial-item">تعداد کلاس </span>
            <span className="detial-item">نام معرف</span>
          </div>
          <div className="details-content">
            <span className="detial-item first-col">۰۹۱۲۱۲۳۴۵۶۷</span>
            <span className="detial-item">دوازدهم</span>
            <span className="detial-item">انسانی</span>
            <span className="detial-item">۳۱ شهریور ۱۴۰۲ </span>
            <span className="detial-item">بله</span>
            <span className="detial-item">۳ کلاس </span>
            <span className="detial-item">مجیدی</span>
          </div>
        </div>
        <div className="kelas-details-wrapper">
          <span className="title">اطلاعات کلاس های کاربر</span>
          <div className="kelas-details">
            <div className="kelas-details-heder">
              <span className="kelas-detail-item first-col">
                کلاس های کاربر
              </span>
              <span className="kelas-detail-item">لینک اسکای روم</span>
              <span className="kelas-detail-item">شناسه کاربری اسکای‌روم</span>
              <span className="kelas-detail-item">پسوورد اسکای‌روم</span>
              <span className="kelas-detail-item">لایسنس اسپات پلیر</span>
            </div>
            <div className="kelas-details-content">
              <span className="kelas-detail-item first-col">
                <span className="inside-item">ریاضی انسانی - جواهری</span>
                <span className="inside-item">ریاضی انسانی - جواهری</span>
                <span className="inside-item">ریاضی انسانی - جواهری</span>
                <span className="inside-item">ریاضی انسانی - جواهری</span>
              </span>
              <span className="kelas-detail-item">ندارد</span>
              <span className="kelas-detail-item">ندارد</span>
              <span className="kelas-detail-item">ندارد</span>
              <span className="kelas-detail-item">کپی!</span>
            </div>
            <div className="add-kelas-wrapper">
              <span className="add-title">ثبت‌نام کابر</span>
              <div className="active-kelasses">
                <div className="active-kelas">
                  <span className="kelas-title">اسم کلاس و استاد</span>
                  <img src={cross_svg} alt="حذف" />
                </div>
                <div className="active-kelas">
                  <span className="kelas-title">اسم کلاس و استاد</span>
                  <img src={cross_svg} alt="حذف" />
                </div>
                <div className="active-kelas">
                  <span className="kelas-title">اسم کلاس و استاد</span>
                  <img src={cross_svg} alt="حذف" />
                </div>
              </div>
              <div className="add-kelas-wrapper">
                <div className="add-kelas-option">
                  <span className="add-text">+ اضافه کردن کلاس</span>
                  <img src={arrow_icon} alt="بازکردن" />
                </div>
                <div className="kelas-options">
                  <span className="kelas-option">
                    ریاضی انسانی مثلا بلند - جواهری
                  </span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                  <span className="kelas-option">
                    علوم و فنون ادبی - دکتر هامون سبطی
                  </span>
                  <span className="kelas-option">
                    عربی دوازدهم - استاد مهران ترکمان
                  </span>
                  <span className="kelas-option">
                    فلسفه و منطق - استاد حمید سودیان
                  </span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                  <span className="kelas-option">ریاضی انسانی - جواهری</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btns-wrapper">
          <div className="btn-wrapper">
            <span className="wait-text">صبر کنید ...</span>
            <span className="save-actions btn-style">ذخیره</span>
            <span className="status-text">ذخیره شده! / عدم نیاز به ذخیره!</span>
          </div>
          <div className="btn-wrapper">
            <span className="wait-text">صبر کنید ...</span>
            <span className="btn-style">آپدیت اسکایروم‌</span>
            <span className="status-text">ذخیره شده! / عدم نیاز به ذخیره!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
