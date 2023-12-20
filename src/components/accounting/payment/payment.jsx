import React, { useContext, useState } from "react";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";
import { DataContext } from "../../context/DataContext";
const Payment = ({ handle_pop_up, factor }) => {
  const [selected_course, setSelected] = useState(false);
  const { products } = useContext(DataContext);
  return (
    <>
      <div className="bill">
        <span
          className={
            factor.manager_confirmation
              ? "factor-status-label passed"
              : "factor-status-label"
          }
        >
          {factor.manager_confirmation ? "تایید شده" : "تایید نشده"}
        </span>
        <span className="bill-item num-name">
          <span className="inside-item">{factor.buyer_name}</span>
          <span className="inside-item">{factor.buyer_phone_number}</span>
        </span>
        <span className="bill-item">
          {factor.seller_name !== "-" ? factor.seller_name : "نامشخص"}
        </span>
        <span
          className="bill-item poiter-cursor"
          onClick={() => {
            setSelected(!selected_course);
          }}
        >
          {convert_to_persian(factor.products_ids.length)} دوره
        </span>
        <span className="bill-item pay-kind">
          {factor.is_beyane ? "بیعانه" : factor.is_ghest ? "قسطی" : "نقدی"}
        </span>
        <span className="bill-item">
          {split_in_three(convert_to_persian(factor.payment_amount))} تومان
        </span>
        <span className="bill-item pay-date-info">
          <span className="pay-date">
            {factor.paying_datetime
              ? new Date(factor.paying_datetime).toLocaleDateString("fa")
              : "وارد نشده"}
          </span>
        </span>
        <span className="bill-item pay-date-info no-neccesary">
          <span className="pay-date">
            {factor.deadline_datetime
              ? new Date(factor.deadline_datetime).toLocaleDateString("fa")
              : "وارد نشده"}
          </span>
        </span>
        <span
          onClick={() => {
            handle_pop_up(factor);
          }}
          className="bill-item show-details"
        >
          <span className="show-btn">مشاهده جزئیات</span>
        </span>{" "}
      </div>
      {selected_course ? (
        <div className="selected-courses">
          <span className="selected-title">دوره های کابر انتخاب شده:</span>
          {factor.products_ids.map((k_id) => (
            <span className="selected-item" key={k_id}>
              {{ ...products.find((p) => k_id === p.product_id) }.product_title}
            </span>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Payment;
