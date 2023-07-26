import React from "react";
const FinanceDetails = ({ handle_pop_up }) => {
  return (
    <div className="finanace-pop-up-wrapper">
      <div className="finance-pop-up">
        <div className="finance-record-title">
          کارنامه مالی
          {" اسم کاربر "}-{123456}
        </div>
        <div className="finance-record-table">
          <div className="finance-record-table-header">
            <span className="finanace-record-header-item first-col">
              دوره ها
            </span>
            <span className="finanace-record-header-item">
              نوع و وضعیت پرداخت
            </span>
            <span className="finanace-record-header-item">میزان پرداختی</span>
            <span className="finanace-record-header-item">
              تایخ و زمان آخرین پرداخت
            </span>
            <span className="finanace-record-header-item">شناسه پرداخت</span>
          </div>
          <div className="finance-record-item">
            <span className="finanace-record-header-item table-item first-col">
              ریاضی
            </span>
            <span className="finanace-record-header-item table-item">
              <span className="inside-item">قسط ۱</span>
              <span className="inside-item">قسط ۲</span>
              <span className="inside-item">قسط ۳</span>
            </span>
            <span className="finanace-record-header-item table-item">
              <span className="inside-item">۱۲٬۰۰۰٬۰۰۰ تومان</span>
              <span className="inside-item">۱۲٬۰۰۰٬۰۰۰ تومان</span>
              <span className="inside-item waiting-to-pay">
                در انتظار پرداخت
              </span>
            </span>
            <span className="finanace-record-header-item table-item">
              <span className="inside-item">
                <span className="date-table-item">۱۴۰۲/۰۹/۱۸</span>
                <span className="exact-time">۱۳:۲۳:۱۲</span>
              </span>
              <span className="inside-item">
                <span className="date-table-item">۱۴۰۲/۰۹/۱۸</span>
                <span className="exact-time">۱۳:۲۳:۱۲</span>
              </span>
              <span className="inside-item">
                <span className="date-table-item">موعد پرداخت:</span>
                <span className="date-table-item">۱۴۰۲/۰۹/۱۸</span>
              </span>
            </span>
            <span className="finanace-record-header-item table-item">
              <span className="inside-item">۱۲۹۷۳۲۳۳۵</span>
              <span className="inside-item">۱۲۹۷۳۲۳۳۵</span>
              <span className="inside-item">-</span>
            </span>
          </div>
          <div className="finance-record-item single">
            <span className="finanace-record-header-item table-item first-col">
              ریاضی
            </span>
            <span className="finanace-record-header-item table-item">
              <span className="inside-item">نقدی</span>
            </span>
            <span className="finanace-record-header-item table-item">
              <span className="inside-item">۱۲٬۰۰۰٬۰۰۰ تومان</span>
            </span>
            <span className="finanace-record-header-item table-item">
              <span className="inside-item">
                <span className="date-table-item">۱۴۰۲/۰۹/۱۸</span>
                <span className="exact-time">۱۳:۲۳:۱۲</span>
              </span>
            </span>
            <span className="finanace-record-header-item table-item">
              <span className="inside-item">۱۲۹۷۳۲۳۳۵</span>
            </span>
          </div>
        </div>
        <div className="actions-btns">
          <span className="get-records action-btn">دریافت</span>
          <span
            className="close-pop-up action-btn"
            onClick={() => {
              handle_pop_up();
            }}
          >
            بستن
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinanceDetails;
