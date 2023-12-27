import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import split_in_three from "../../functions/spilit_in_three";
import convert_to_persian from "../../functions/convert-to-persian";
import LittleLoading from "../../reusable/little-loading";
import ReloadBtn from "../../reusable/reload-btn";

const UserFinanceData = ({
  set_user_paymnets,
  user_paymnets,
  single_user,
  get_finance_records,
}) => {
  const { seller, products } = useContext(DataContext);
  const handle_reload = (e) => {
    set_user_paymnets(false);
    get_finance_records(single_user);
  };
  return (
    <section className="user-finance-records">
      <div className="finance-header">
        <span className="finanace-records-title">اطلاعات مالی کاربر</span>
        <ReloadBtn click={handle_reload} />
      </div>
      <div className="finance-data-table">
        <div className="finance-table-row finance-table-header-row">
          <span className="finance-table-item finance-table-header-item">
            دوره ها
          </span>
          <span className="finance-table-item finance-table-header-item">
            نوع و وضعیت پرداخت
          </span>
          <span className="finance-table-item finance-table-header-item">
            میزان پرداختی
          </span>
          <span className="finance-table-item finance-table-header-item">
            تاریخ پرداخت
          </span>
          <span className="finance-table-item finance-table-header-item">
            موعد پرداخت
          </span>
        </div>
        {user_paymnets ? (
          user_paymnets.length !== 0 ? (
            user_paymnets.map((p) => (
              <div className="finance-table-row" key={p.payment_id}>
                <span className="finance-table-item">
                  {convert_to_persian(p.products_ids.length)} دوره
                </span>
                <span className="finance-table-item">
                  {p.is_beyane ? "بیعانه" : p.is_ghest ? "قسطی" : "نقدی"}
                </span>
                <span className="finance-table-item">
                  {split_in_three(convert_to_persian(p.payment_amount))} تومان
                </span>
                <span className="finance-table-item">
                  {p.paying_datetime
                    ? new Date(p.paying_datetime).toLocaleDateString("fa")
                    : "وارد نشده"}
                </span>
                <span className="finance-table-item">
                  {p.deadline_datetime
                    ? new Date(p.deadline_datetime).toLocaleDateString("fa")
                    : "وارد نشده"}
                </span>
              </div>
            ))
          ) : (
            "موردی برای نمایش موجود نیست"
          )
        ) : (
          <LittleLoading />
        )}
      </div>
    </section>
  );
};

export default UserFinanceData;
