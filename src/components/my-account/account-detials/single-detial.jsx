import React, { useState } from "react";
import LittleLoading from "../../reusable/little-loading";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";
const SingleDetials = ({ transaction, i, kelasses }) => {
  const [selected_course, setSelected] = useState(false);

  return (
    <>
      <div className="chart-data" key={i++}>
        <span className="chart-item first-item">
          {transaction.pay_obj.user_fullname}
        </span>
        <span
          className="chart-item second-item cursor-needed"
          onClick={() => {
            setSelected(!selected_course);
          }}
        >
          {convert_to_persian(transaction.pay_obj.kelases_ids.length)} دوره
        </span>
        <span className="chart-item">
          {transaction.pay_obj.is_ghesti
            ? ` قسط ${convert_to_persian(transaction.ghest_index)}`
            : "پرداخت شده"}
        </span>
        <span className="chart-item">
          {split_in_three(convert_to_persian(transaction.main_amount))} تومان
        </span>
        <span className="chart-item">
          {split_in_three(convert_to_persian(transaction.amount))} تومان
        </span>
        <span className="chart-item">
          {new Date(transaction.action_datetime).toLocaleDateString("fa")}
          <br />
          {transaction.action_datetime.split("T")[1].split("+")[0]}
        </span>
        <span className="chart-item">
          {transaction.pay_obj ? (
            transaction.pay_obj.ref_id ? (
              convert_to_persian(transaction.pay_obj.ref_id)
            ) : transaction.pay_obj.ref_id1 ? (
              convert_to_persian(transaction.pay_obj.ref_id1)
            ) : transaction.pay_obj.ref_id2 ? (
              convert_to_persian(transaction.pay_obj.ref_id2)
            ) : transaction.pay_obj.ref_id3 ? (
              convert_to_persian(transaction.pay_obj.ref_id3)
            ) : (
              "وارد نشده"
            )
          ) : (
            <LittleLoading />
          )}
        </span>
      </div>
      {selected_course ? (
        <div className="selected-courses">
          <span className="selected-title">دوره های کابر انتخاب شده:</span>
          {transaction.pay_obj.kelases_ids.map((k_id) => (
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

export default SingleDetials;
