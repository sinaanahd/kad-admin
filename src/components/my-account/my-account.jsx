import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import Header from "../header/header";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import { DataContext } from "../context/DataContext";
import AccountDetails from "./account-detials/account-details";
import conver_to_persian from "../functions/convert-to-persian";
import spilit_in_three from "../functions/spilit_in_three";
import PayInfo from "./pay-info/payinfo";
import LittleLoading from "../reusable/little-loading";

const MyAccount = () => {
  const { user, account_info, kelasses } = useContext(DataContext);
  const [popUp, setPopUp] = useState(false);
  const handle_pop_up = () => {
    setPopUp(!popUp);
  };
  useEffect(() => {
    if (!user) {
      window.location.pathname = "/login";
    }
  }, []);
  const convert_month = (num) => {
    switch (num) {
      case "۱":
        return "فروردین";
      case "۲":
        return "اردیبهشت";
      case "۳":
        return "خرداد";
      case "۴":
        return "تیر";
      case "۵":
        return "مرداد";
      case "۶":
        return "شهریور";
      case "۷":
        return "مهر";
      case "۸":
        return "آبان";
      case "۹":
        return "آذر";
      case "۱۰":
        return "دی";
      case "۱۱":
        return "بهمن";
      case "۱۲":
        return "اسفند";
      default:
        return "ماه نامعتبر";
    }
  };
  return (
    <>
      <Helmet>
        <title>حساب من</title>
      </Helmet>
      <Header />
      <section className="account-page page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="cols-wrapper">
            <div className="account-detials">
              <div className="balance-wrapper">
                <h2 className="balance-wrapper-title">بالانس حساب</h2>
                <span className="balance-quan">
                  {spilit_in_three(
                    conver_to_persian(account_info.account_balance)
                  )}{" "}
                  تومان
                </span>
              </div>
              <span className="pay-quan">
                دریافتی های{" "}
                {convert_month(
                  new Date().toLocaleDateString("fa").split("/")[1]
                )}{" "}
                ماه
              </span>
              <div className="sold-details-wrapper">
                <div className="sold-details-header">
                  <span className="sold-details-inside">تعداد دوره‌ها</span>
                  <span className="sold-details-inside space-middle">
                    تاریخ و ساعت پرداخت
                  </span>
                  <span className="sold-details-inside">میزان سود</span>
                </div>
                {account_info ? (
                  account_info.this_month_pays.length !== 0 ? (
                    account_info.this_month_pays.map((po, i) => (
                      <PayInfo key={i++} pay_info={po} kelasses={kelasses} />
                    ))
                  ) : (
                    <div className="nothing">موردی برای نمایش وجود ندارد</div>
                  )
                ) : (
                  <LittleLoading />
                )}
                <div className="sold-details-footer">
                  <span className="this-month-balance">
                    بالانس حساب{" "}
                    {convert_month(
                      new Date().toLocaleDateString("fa").split("/")[1]
                    )}{" "}
                    ماه
                  </span>
                  <span className="pay-amount">
                    {spilit_in_three(
                      conver_to_persian(account_info.monthly_profit)
                    )}{" "}
                    تومان
                  </span>
                </div>
              </div>
              <p className="notice-text">
                بالانس حساب در کل تاریخ فعالیت کاربر لحاظ شده است
              </p>
            </div>
            <div className="left-col">
              <div className="marketing-data-wrapper">
                <span className="title-count">
                  <span className="data-title">
                    تعداد ثبت نام کاریر با لینک دعوت
                  </span>
                  <span className="data-count">
                    {account_info ? (
                      conver_to_persian(account_info.children_count)
                    ) : (
                      <LittleLoading />
                    )}{" "}
                    کاربر
                  </span>
                </span>
                <span className="title-count">
                  <span className="data-title">
                    تعداد کاربر با حداقل یک خرید
                  </span>
                  <span className="data-count">
                    {account_info ? (
                      conver_to_persian(
                        account_info.children_at_least_in_one_kelas_count
                      )
                    ) : (
                      <LittleLoading />
                    )}{" "}
                    کاربر
                  </span>
                </span>
                <span className="title-count">
                  <span className="data-title">تعداد کل خرید</span>
                  <span className="data-count">
                    {account_info ? (
                      conver_to_persian(
                        account_info.total_payment_done_by_children_done_count
                      )
                    ) : (
                      <LittleLoading />
                    )}{" "}
                    خرید
                  </span>
                </span>
                <span className="title-count">
                  <span className="data-title">تعداد خرید کلاس‌ها</span>
                  <span className="data-count">
                    {account_info ? (
                      conver_to_persian(account_info.total_sold_kelases_count)
                    ) : (
                      <LittleLoading />
                    )}{" "}
                    کلاس
                  </span>
                </span>
                <span
                  className="see-all-data-btn"
                  onClick={() => {
                    handle_pop_up();
                  }}
                >
                  مشاهده جزئیات صورت مالی
                </span>
              </div>
              <div className="register-records">
                <div className="register-record-header">
                  <span className="register-record-item">شناسه دانش آموز</span>
                  <span className="register-record-item">شماره موبایل</span>
                  <span className="register-record-item">تاریخ ثبت نام</span>
                </div>
                {account_info ? (
                  account_info.children.length !== 0 ? (
                    account_info.children.map((chil) => (
                      <div key={chil.user_id} className="register-record-data">
                        <span className="register-record-item">
                          {chil.name}
                        </span>
                        <span className="register-record-item">
                          {chil.phone_number}
                        </span>
                        <span className="register-record-item">
                          <span className="indside-line">
                            {new Date(chil.register_date).toLocaleDateString(
                              "fa-ir"
                            )}
                          </span>
                          <span className="indside-line">
                            {new Date(chil.register_date).toLocaleTimeString(
                              "fa-ir"
                            )}
                          </span>
                        </span>
                      </div>
                    ))
                  ) : (
                    "موردی برای نمایش وجود ندارد"
                  )
                ) : (
                  <LittleLoading />
                )}
                {/* <div className="register-record-data">
                  <span className="register-record-item">پارسا سرائیه</span>
                  <span className="register-record-item">۰۹۱۲۱۲۳۴۵۶۷</span>
                  <span className="register-record-item">
                    <span className="indside-line">۳۱ شهریور ۱۴۰۲ </span>
                    <span className="indside-line">۱۲:۲۳</span>
                  </span>
                </div>
                <div className="register-record-data">
                  <span className="register-record-item">پارسا سرائیه</span>
                  <span className="register-record-item">۰۹۱۲۱۲۳۴۵۶۷</span>
                  <span className="register-record-item">
                    <span className="indside-line">۳۱ شهریور ۱۴۰۲ </span>
                    <span className="indside-line">۱۲:۲۳</span>
                  </span>
                </div>
                <div className="register-record-data">
                  <span className="register-record-item">پارسا سرائیه</span>
                  <span className="register-record-item">۰۹۱۲۱۲۳۴۵۶۷</span>
                  <span className="register-record-item">
                    <span className="indside-line">۳۱ شهریور ۱۴۰۲ </span>
                    <span className="indside-line">۱۲:۲۳</span>
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {popUp ? (
        <AccountDetails
          transactions={account_info.transactions}
          handle_pop_up={handle_pop_up}
          kelasses={kelasses}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default MyAccount;
