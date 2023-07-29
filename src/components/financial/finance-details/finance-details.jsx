import React, { useEffect } from "react";
import LittleLoading from "../../reusable/little-loading";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";
const FinanceDetails = ({ handle_pop_up, factor, kelasses }) => {
  return (
    <div className="finanace-pop-up-wrapper">
      <div className="finance-pop-up">
        <div className="finance-record-title">
          کارنامه مالی {factor ? factor.user_fullname : <LittleLoading />} -{" "}
          {factor ? (
            factor.ref_id ? (
              factor.ref_id
            ) : factor.ref_id1 ? (
              factor.ref_id1
            ) : factor.ref_id2 ? (
              factor.ref_id2
            ) : factor.ref_id3 ? (
              factor.ref_id3
            ) : (
              "وارد نشده"
            )
          ) : (
            <LittleLoading />
          )}
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
          {factor ? (
            factor.is_ghesti ? (
              <div className="finance-record-item">
                <span className="finanace-record-header-item table-item first-col">
                  {factor.kelases_ids.map((k_id) => (
                    <span className="inside-item" key={k_id}>
                      {
                        { ...kelasses.find((k) => k_id === k.kelas_id) }
                          .kelas_title
                      }
                    </span>
                  ))}
                </span>
                <span className="finanace-record-header-item table-item">
                  <span className="inside-item">قسط ۱</span>
                  <span className="inside-item">قسط ۲</span>
                  <span className="inside-item">قسط ۳</span>
                </span>
                <span className="finanace-record-header-item table-item">
                  <span
                    className={
                      factor.pay1_datetime
                        ? "inside-item"
                        : "inside-item waiting-to-pay"
                    }
                  >
                    {split_in_three(convert_to_persian(factor.price1))} تومان
                  </span>
                  <span
                    className={
                      factor.pay2_datetime
                        ? "inside-item"
                        : "inside-item waiting-to-pay"
                    }
                  >
                    {factor.price2 !== null
                      ? `${split_in_three(
                          convert_to_persian(factor.price2)
                        )} تومان`
                      : "پرداخت نشده"}
                  </span>
                  <span
                    className={
                      factor.pay3_datetime
                        ? "inside-item"
                        : "inside-item waiting-to-pay"
                    }
                  >
                    {split_in_three(convert_to_persian(factor.price1))} تومان
                  </span>
                </span>
                <span className="finanace-record-header-item table-item">
                  <span className="inside-item">
                    <span className="date-table-item">
                      {factor.pay1_datetime
                        ? new Date(factor.pay1_datetime).toLocaleDateString(
                            "fa"
                          )
                        : "-"}
                    </span>
                    <span className="exact-time">
                      {factor.pay1_datetime
                        ? factor.pay1_datetime.split("T")[1].split("+")[0]
                        : ""}
                    </span>
                  </span>
                  <span className="inside-item">
                    {factor.pay2_datetime ? (
                      new Date(factor.pay2_datetime).toLocaleDateString("fa")
                    ) : (
                      <>
                        <span className="date-table-item">موعد پرداخت:</span>
                        <span className="date-table-item">
                          {new Date(factor.deadline2).toLocaleDateString("fa")}
                        </span>
                      </>
                    )}
                    <span className="exact-time">
                      {factor.pay2_datetime
                        ? factor.pay2_datetime.split("T")[1].split("+")[0]
                        : ""}
                    </span>
                  </span>
                  <span className="inside-item">
                    {factor.pay3_datetime ? (
                      new Date(factor.pay3_datetime).toLocaleDateString("fa")
                    ) : (
                      <>
                        <span className="date-table-item">موعد پرداخت:</span>
                        <span className="date-table-item">
                          {new Date(factor.deadline3).toLocaleDateString("fa")}
                        </span>
                      </>
                    )}
                    <span className="exact-time">
                      {factor.pay2_datetime
                        ? factor.pay2_datetime.split("T")[1].split("+")[0]
                        : ""}
                    </span>
                  </span>
                </span>
                <span className="finanace-record-header-item table-item">
                  <span className="inside-item">
                    {factor.ref_id1 ? factor.ref_id1 : "-"}
                  </span>
                  <span className="inside-item">
                    {factor.ref_id2 ? factor.ref_id2 : "-"}
                  </span>
                  <span className="inside-item">
                    {factor.ref_id3 ? factor.ref_id3 : "-"}
                  </span>
                </span>
              </div>
            ) : (
              <div className="finance-record-item single">
                <span className="finanace-record-header-item table-item first-col">
                  {factor.kelases_ids.map((k_id) => (
                    <span className="inside-item" key={k_id}>
                      {
                        { ...kelasses.find((k) => k_id === k.kelas_id) }
                          .kelas_title
                      }
                    </span>
                  ))}
                </span>
                <span className="finanace-record-header-item table-item">
                  <span className="inside-item">نقدی</span>
                </span>
                <span className="finanace-record-header-item table-item">
                  <span className="inside-item">
                    {split_in_three(convert_to_persian(factor.price))} تومان
                  </span>
                </span>
                <span className="finanace-record-header-item table-item">
                  <span className="inside-item">
                    <span className="date-table-item">
                      {factor.pay_naghd_datetime
                        ? new Date(
                            factor.pay_naghd_datetime
                          ).toLocaleDateString("fa")
                        : "وارد نشده"}
                    </span>
                    <span className="exact-time">
                      {
                        factor.pay_naghd_datetime
                          .split("T")[1]
                          .split("+")[0]
                          .split(".")[0]
                      }
                    </span>
                  </span>
                </span>
                <span className="finanace-record-header-item table-item">
                  <span className="inside-item">{factor.ref_id}</span>
                </span>
              </div>
            )
          ) : (
            <LittleLoading />
          )}
          {/* <div className="finance-record-item">
            <span className="finanace-record-header-item table-item first-col">
              {factor ? (
                factor.kelases_ids.map((k_id) => (
                  <span className="inside-item" key={k_id}>
                    {
                      { ...kelasses.find((k) => k_id === k.kelas_id) }
                        .kelas_title
                    }
                  </span>
                ))
              ) : (
                <LittleLoading />
              )}
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
          </div> */}
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
