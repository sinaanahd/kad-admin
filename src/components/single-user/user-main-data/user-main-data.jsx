import React, { useState } from "react";
import convert_to_persian from "../../functions/convert-to-persian";
import LittleLoading from "../../reusable/little-loading";

const UserMainData = ({ single_user }) => {
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
  return (
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
      {single_user ? (
        <div className="details-content">
          <span className="detial-item first-col">
            {single_user.phone_number}
          </span>
          <span className="detial-item">{convert_year(single_user.year)}</span>
          <span className="detial-item">
            {convert_subject(single_user.subject)}
          </span>
          <span className="detial-item">
            {new Date(single_user.register_date).toLocaleDateString("fa-ir")}
          </span>
          <span className="detial-item">
            {single_user.is_from_campaign_mordad_1402 ? "بله" : "خیر"}
          </span>
          <span className="detial-item">
            {convert_to_persian(single_user.kelases.length)} کلاس{" "}
          </span>
          <span className="detial-item">
            {single_user.parent ? single_user.parent : "ندارد"}
          </span>
        </div>
      ) : (
        <div className="details-content">
          <span className="detial-item first-col">
            <LittleLoading />
          </span>
          <span className="detial-item">
            <LittleLoading />
          </span>
          <span className="detial-item">
            <LittleLoading />
          </span>
          <span className="detial-item">
            <LittleLoading />
          </span>
          <span className="detial-item">
            <LittleLoading />
          </span>
          <span className="detial-item">
            <LittleLoading />{" "}
          </span>
          <span className="detial-item">
            <LittleLoading />
          </span>
        </div>
      )}
    </div>
  );
};

export default UserMainData;
