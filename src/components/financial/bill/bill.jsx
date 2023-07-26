import React from "react";
const Bill = ({ handle_pop_up }) => {
  return (
    <div className="bill">
      <span className="bill-item">پارسا سرائیه</span>
      <span className="bill-item">۳ دوره</span>
      <span className="bill-item pay-kind">نقدی</span>
      <span className="bill-item">۱۲٬۰۰۰٬۰۰۰ تومان</span>
      <span className="bill-item pay-date-info">
        <span className="pay-date">۱۴۰۲/۰۹/۱۸ </span>
        <span className="pay-time">۱۳:۲۳:۱۲</span>
      </span>
      <span
        onClick={() => {
          handle_pop_up();
        }}
        className="bill-item show-details"
      >
        مشاهده جزئیات
      </span>{" "}
    </div>
  );
};

export default Bill;
