import React, { useState } from "react";
import LittleLoading from "../../reusable/little-loading";
import split_in_three from "../../functions/spilit_in_three";
import convert_to_persian from "../../functions/convert-to-persian";
import SingleDetials from "./single-detial";
const AccountDetails = ({ handle_pop_up, transactions, kelasses }) => {
  return (
    <>
      <div className="details-pop-up">
        <div className="content-wrapper">
          <span className="detail-header">جزئیات صورت مالی</span>
          <div className="chart">
            <div className="chart-header">
              <span className="chart-item first-item">نام کاربران</span>
              <span className="chart-item second-item">دوره ها</span>
              <span className="chart-item">نوع و وضعیت پرداخت</span>
              <span className="chart-item">میزان پرداختی</span>
              <span className="chart-item">میزان سود مشارکت</span>
              <span className="chart-item">تاریخ و زمان آخرین پرداخت</span>
              <span className="chart-item">شناسه آخرین پرداخت</span>
            </div>
            <div className="chart-items-wrapper">
              {transactions ? (
                transactions.length !== 0 ? (
                  transactions.map((t, i) => (
                    <SingleDetials
                      key={i++}
                      transaction={t}
                      kelasses={kelasses}
                    />
                  ))
                ) : (
                  <span className="no-data">موردی برای نمایش وجود ندارد</span>
                )
              ) : (
                <LittleLoading />
              )}
            </div>
          </div>
          <div className="btns-wrapper">
            <span className="pop-up-btn">دریافت</span>
            <span
              className="pop-up-btn"
              onClick={() => {
                handle_pop_up();
              }}
            >
              بستن
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
