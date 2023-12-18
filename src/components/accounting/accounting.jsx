import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import LittleLoading from "../reusable/little-loading";
import convert_to_persian from "../functions/convert-to-persian";
import split_in_three from "../functions/spilit_in_three";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import PaymentDetails from "./payment-details/payment-details";
import Payment from "./payment/payment";
const Accounting = () => {
  const [popup, setPopUpstatus] = useState(false);
  const [factor, setFactor] = useState(false);
  const [kind_to_show, set_kind_to_show] = useState("all");
  const { accounting_payments, products, user, get_accounting_payments } =
    useContext(DataContext);
  const [searched_factors, setSearched_factors] = useState(false);
  const handle_pop_up = (factor) => {
    if (popup) {
      setPopUpstatus(false);
    } else {
      setFactor(factor);
      setPopUpstatus(true);
    }
  };
  useEffect(() => {
    if (!user) {
      window.location.pathname = "/login";
    } else {
      if (user.level < 20) {
        window.location.pathname = "/account";
      } else {
        get_accounting_payments();
      }
    }
  }, []);
  const handle_factor_search = (value) => {
    let result = false;
    if (value.length > 2) {
      set_kind_to_show("searched");
      result = [
        ...accounting_payments.filter(
          (f) =>
            (f.buyer_name && f.buyer_name.includes(value)) ||
            (f.buyer_phone_number && f.buyer_phone_number.startsWith(value))
        ),
      ];
    } else {
      set_kind_to_show("all");
    }
    setSearched_factors(result);
  };
  const not_approved = accounting_payments
    ? accounting_payments.filter((ap) => !ap.manager_confirmation)
    : false;
  const approved = accounting_payments
    ? accounting_payments.filter((ap) => ap.manager_confirmation)
    : false;
  const unpaid = accounting_payments
    ? accounting_payments.filter((ap) => !ap.is_payed)
    : false;
  const paid = accounting_payments
    ? accounting_payments.filter((ap) => ap.is_payed)
    : false;
  const site = accounting_payments
    ? accounting_payments.filter((ap) => ap.seller_name === "سایت")
    : false;
  const show_result = () => {
    switch (kind_to_show) {
      case "all":
        return accounting_payments;
      case "unapproved":
        return not_approved;
      case "approved":
        return approved;
      case "unpaid":
        return unpaid;
      case "paid":
        return paid;
      case "searched":
        return searched_factors;
      case "site":
        return site;
      default:
        return [];
    }
  };
  return (
    <>
      <Helmet>
        <title>حسابداری</title>
      </Helmet>
      <section className="finance-wrapper page-wrapper accounting-page">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="filter-payments">
            <button
              onClick={() => {
                set_kind_to_show("all");
              }}
              className={
                kind_to_show === "all"
                  ? "payment-filter-btn active"
                  : "payment-filter-btn"
              }
            >
              همه
              <span className="btn-count-num">
                {accounting_payments
                  ? `( ${convert_to_persian(accounting_payments.length)} )`
                  : ""}
              </span>
            </button>
            <button
              onClick={() => {
                set_kind_to_show("unapproved");
              }}
              className={
                kind_to_show === "unapproved"
                  ? "payment-filter-btn active"
                  : "payment-filter-btn"
              }
            >
              تایید نشده ها
              <span className="btn-count-num">
                {not_approved
                  ? `( ${convert_to_persian(not_approved.length)} )`
                  : ""}
              </span>
            </button>
            <button
              onClick={() => {
                set_kind_to_show("approved");
              }}
              className={
                kind_to_show === "approved"
                  ? "payment-filter-btn active"
                  : "payment-filter-btn"
              }
            >
              تایید شده ها
              <span className="btn-count-num">
                {approved ? `( ${convert_to_persian(approved.length)} )` : ""}
              </span>
            </button>
            <button
              onClick={() => {
                set_kind_to_show("unpaid");
              }}
              className={
                kind_to_show === "unpaid"
                  ? "payment-filter-btn active"
                  : "payment-filter-btn"
              }
            >
              در انتظار پرداخت
              <span className="btn-count-num">
                {unpaid ? `( ${convert_to_persian(unpaid.length)} )` : ""}
              </span>
            </button>
            <button
              onClick={() => {
                set_kind_to_show("paid");
              }}
              className={
                kind_to_show === "paid"
                  ? "payment-filter-btn active"
                  : "payment-filter-btn"
              }
            >
              پرداخت شده ها
              <span className="btn-count-num">
                {paid ? `( ${convert_to_persian(paid.length)} )` : ""}
              </span>
            </button>
            <button
              onClick={() => {
                set_kind_to_show("site");
              }}
              className={
                kind_to_show === "site"
                  ? "payment-filter-btn active"
                  : "payment-filter-btn"
              }
            >
              سایت
              <span className="btn-count-num">
                {site ? `( ${convert_to_persian(site.length)} )` : ""}
              </span>
            </button>
          </div>
          <div className="bill-and-time-wrapper">
            <div className="bills">
              <div className="bills-header">
                <span className="bill-header-item">شناسه/شماره کاربر</span>
                <span className="bill-header-item">فروشنده</span>
                <span className="bill-header-item">دوره ها</span>
                <span className="bill-header-item">نوع و وضعیت پرداخت</span>
                <span className="bill-header-item">میزان پرداختی</span>
                <span className="bill-header-item">تاریخ پرداخت</span>
                <span className="bill-header-item">موعد پرداخت</span>
                <span className="bill-header-item  show-details">
                  <input
                    type="text"
                    placeholder="جستجو نام یا شماره کاربر"
                    className="finance-search"
                    onInput={({ target }) => {
                      handle_factor_search(target.value);
                    }}
                  />
                </span>
              </div>
              {accounting_payments ? (
                show_result() ? (
                  show_result().length !== 0 ? (
                    show_result().map((f, i) => (
                      <Payment
                        key={i++}
                        factor={f}
                        handle_pop_up={handle_pop_up}
                      />
                    ))
                  ) : (
                    "موردی برای نمایش وجود ندارد"
                  )
                ) : (
                  <LittleLoading />
                )
              ) : (
                <LittleLoading />
              )}
            </div>
          </div>
        </div>
      </section>
      {popup ? (
        <PaymentDetails
          factor={factor}
          handle_pop_up={handle_pop_up}
          products={products}
          set_kind_to_show={set_kind_to_show}
          kind_to_show={kind_to_show}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Accounting;
