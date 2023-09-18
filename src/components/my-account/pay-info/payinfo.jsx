import React, { useState } from "react";
import conver_to_persian from "../../functions/convert-to-persian";
import spilit_in_three from "../../functions/spilit_in_three";
const PayInfo = ({ pay_info, kelasses }) => {
  const [selected_course, setSelected] = useState(false);
  return (
    <>
      <div className="sold-item">
        <span
          className="sold-details-inside cursor-needed"
          onClick={() => {
            setSelected(!selected_course);
          }}
        >
          {conver_to_persian(pay_info.kelases_ids.length)} دوره
        </span>
        <span className="sold-details-inside space-middle">
          {pay_info.pay_naghd_datetime
            ? new Date(pay_info.pay_naghd_datetime).toLocaleDateString("fa")
            : pay_info.pay3_datetime
            ? new Date(pay_info.pay3_datetime).toLocaleDateString("fa")
            : pay_info.pay2_datetime
            ? new Date(pay_info.pay2_datetime).toLocaleDateString("fa")
            : pay_info.pay1_datetime
            ? new Date(pay_info.pay1_datetime).toLocaleDateString("fa")
            : "وارد نشده"}{" "}
          -{" "}
          {pay_info.pay_naghd_datetime
            ? pay_info.pay_naghd_datetime
                .split("T")[1]
                .split("+")[0]
                .split(".")[0]
            : pay_info.pay3_datetime
            ? pay_info.pay3_datetime.split("T")[1].split("+")[0].split(".")[0]
            : pay_info.pay2_datetime
            ? pay_info.pay2_datetime.split("T")[1].split("+")[0].split(".")[0]
            : pay_info.pay1_datetime
            ? pay_info.pay1_datetime.split("T")[1].split("+")[0].split(".")[0]
            : "وارد نشده"}
        </span>
        <span className="sold-details-inside">
          {spilit_in_three(conver_to_persian(pay_info.porfit))} تومان
        </span>
      </div>
      {selected_course ? (
        <div className="selected-courses">
          <span className="selected-title">دوره های کابر انتخاب شده:</span>
          {pay_info.kelases_ids.map((k_id) => (
            <span className="selected-item">
              {
                { ...kelasses.find((k) => k_id === k.kelas_id) }
                  .kelas_title_and_ostad_name
              }
            </span>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PayInfo;
