import React, { useContext, useEffect, useState } from "react";
import LittleLoading from "../../reusable/little-loading";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";
import axios from "axios";
import urls from "../../urls/urls";
import { DataContext } from "../../context/DataContext";
const PaymentDetails = ({
  handle_pop_up,
  factor,
  products,
  set_kind_to_show,
  kind_to_show,
  set_selected_month,
}) => {
  const {
    accounting_payments,
    set_accounting_payments,
    get_accounting_payments,
  } = useContext(DataContext);
  const [pause, set_pause] = useState(false);
  const handle_approvement = (type) => {
    const send_obj = {
      payment_id: factor.payment_id,
      confirmation: type,
    };
    // console.log(send_obj);
    set_pause(true);
    axios
      .patch(urls.accounting_payments, send_obj)
      .then((res) => {
        // console.log(res.data);
        const { result, response, error } = res.data;
        if (result) {
          handle_pop_up();
          change_main_data(response);
          if (kind_to_show === "searched") {
            set_kind_to_show("all");
          }
        } else {
          console.log(error);
          alert("مشکلی پیش آمده");
        }
      })
      .catch((e) => {
        alert("مشکلی پیش آمده");
        console.log(e.message);
      });
  };
  const change_main_data = (obj) => {
    const new_accounting_payments = [...accounting_payments];
    const index = new_accounting_payments.findIndex(
      (p) => p.payment_id === obj.payment_id
    );
    new_accounting_payments[index] = obj;
    // console.log(index, obj, new_accounting_payments[index]);
    set_selected_month(false);
    set_accounting_payments(false);
    set_accounting_payments(new_accounting_payments);
    localStorage.setItem(
      "accounting_payments",
      JSON.stringify(new_accounting_payments)
    );
    set_pause(false);
    get_accounting_payments();
  };
  return (
    <div className="finanace-pop-up-wrapper accounting-pop-up-wrapper">
      <div className="finance-pop-up">
        <div className="finance-record-title">
          پرداختی {factor ? factor.buyer_name : <LittleLoading />}
        </div>
        <div className="finance-record-table">
          <div className="finance-record-table-header">
            <span className="finanace-record-header-item first-col">
              محصولات
            </span>
            <span className="finanace-record-header-item">نوع</span>
            <span className="finanace-record-header-item">میزان پرداختی</span>
            <span className="finanace-record-header-item">تاریخ پرداخت</span>
            <span className="finanace-record-header-item">موعد پرداخت</span>
            <span className="finanace-record-header-item">فیش واریزی</span>
          </div>
          {factor ? (
            <div className="finance-record-item">
              <span className="finanace-record-header-item table-item first-col">
                {factor.products_ids.map((k_id) => (
                  <span className="inside-item" key={k_id}>
                    {
                      { ...products.find((k) => k_id === k.product_id) }
                        .product_title
                    }
                  </span>
                ))}
              </span>
              <span className="finanace-record-header-item table-item">
                {factor.is_beyane
                  ? "بیعانه"
                  : factor.is_ghest
                  ? "قسطی"
                  : "نقدی"}
              </span>
              <span className="finanace-record-header-item table-item">
                <span className={"inside-item"}>
                  {split_in_three(convert_to_persian(factor.payment_amount))}{" "}
                  تومان
                </span>
              </span>
              <span className="finanace-record-header-item table-item">
                <span className="inside-item">
                  {factor.paying_datetime
                    ? new Date(factor.paying_datetime).toLocaleDateString("fa")
                    : "وارد نشده"}
                </span>
              </span>
              <span className="finanace-record-header-item table-item">
                <span className="inside-item">
                  {factor.deadline_datetime
                    ? new Date(factor.deadline_datetime).toLocaleDateString(
                        "fa"
                      )
                    : "وارد نشده"}
                </span>
              </span>
              <span className="finanace-record-header-item table-item">
                {factor.image ? (
                  <img
                    src={factor.image}
                    alt="فیش واریزی"
                    onClick={() => {
                      window.open(factor.image);
                    }}
                    className="cursor-need"
                  />
                ) : factor.pay_ref_id ? (
                  factor.pay_ref_id
                ) : (
                  "فیش ندارد"
                )}
              </span>
            </div>
          ) : (
            <LittleLoading />
          )}
        </div>
        <div className="actions-btns">
          {pause ? (
            <button className="get-records action-btn approve-btn">
              <LittleLoading />
            </button>
          ) : (
            <button
              className="get-records action-btn approve-btn"
              onClick={() => {
                handle_approvement(true);
              }}
            >
              تایید پرداختی
            </button>
          )}
          {pause ? (
            <button className="get-records action-btn decline-btn">
              <LittleLoading />
            </button>
          ) : (
            <button
              className="get-records action-btn decline-btn"
              onClick={() => {
                handle_approvement(false);
              }}
            >
              رد پرداختی
            </button>
          )}

          <button
            className="close-pop-up action-btn close-btn"
            onClick={() => {
              handle_pop_up();
            }}
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
