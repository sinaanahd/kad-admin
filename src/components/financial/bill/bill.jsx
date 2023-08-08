import React, { useState } from "react";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";
const Bill = ({ handle_pop_up, factor, kelasses }) => {
  const [selected_course, setSelected] = useState(false);
  return (
    <>
      <div className="bill">
        <span className="bill-item">{factor.user_fullname}</span>
        <span
          className="bill-item poiter-cursor"
          onClick={() => {
            setSelected(!selected_course);
          }}
        >
          {convert_to_persian(factor.kelases_ids.length)} دوره
        </span>
        <span className="bill-item pay-kind">
          {factor.is_ghesti ? "قسطی" : "نقدی"}
        </span>
        <span className="bill-item">
          {split_in_three(convert_to_persian(factor.price))} تومان
        </span>
        <span className="bill-item pay-date-info">
          <span className="pay-date">
            {factor.pay_naghd_datetime
              ? new Date(factor.pay_naghd_datetime).toLocaleDateString("fa")
              : factor.pay3_datetime
              ? new Date(factor.pay3_datetime).toLocaleDateString("fa")
              : factor.pay2_datetime
              ? new Date(factor.pay2_datetime).toLocaleDateString("fa")
              : factor.pay1_datetime
              ? new Date(factor.pay1_datetime).toLocaleDateString("fa")
              : "وارد نشده"}
          </span>
          <span className="pay-time">
            {factor.pay_naghd_datetime
              ? factor.pay_naghd_datetime
                  .split("T")[1]
                  .split("+")[0]
                  .split(".")[0]
              : factor.pay3_datetime
              ? factor.pay3_datetime.split("T")[1].split("+")[0].split(".")[0]
              : factor.pay2_datetime
              ? factor.pay2_datetime.split("T")[1].split("+")[0].split(".")[0]
              : factor.pay1_datetime
              ? factor.pay1_datetime.split("T")[1].split("+")[0].split(".")[0]
              : "وارد نشده"}
          </span>
        </span>
        <span
          onClick={() => {
            handle_pop_up(factor);
          }}
          className="bill-item show-details"
        >
          مشاهده جزئیات
        </span>{" "}
      </div>
      {selected_course ? (
        <div className="selected-courses">
          <span className="selected-title">دوره های کابر انتخاب شده:</span>
          {factor.kelases_ids.map((k_id) => (
            <span className="selected-item">
              {{ ...kelasses.find((k) => k_id === k.kelas_id) }.kelas_title}
            </span>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Bill;
