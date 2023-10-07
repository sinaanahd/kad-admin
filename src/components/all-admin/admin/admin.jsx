import React, { useState } from "react";
import convert_to_persian from "../../functions/convert-to-persian";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import scrollToTop from "../../functions/scroll";
import split_in_three from "../../functions/spilit_in_three";

const Admin = ({ admin }) => {
  return (
    <div className="table-content">
      <span className="data-wrapper">{admin.fullname}</span>
      <span className="data-wrapper">{admin.admin_type}</span>
      <span className="data-wrapper">
        {convert_to_persian(admin.children_count)} دعوت
      </span>
      <span className="data-wrapper">
        {split_in_three(convert_to_persian(admin.account_balance))} تومان
      </span>
      <span className="data-wrapper btn-box">
        <Link
          className="details-btn"
          to={`/admin/${admin.admin_id}`}
          onClick={() => {
            scrollToTop();
          }}
        >
          جزئیات کاربر
        </Link>
      </span>
    </div>
  );
};

export default Admin;
