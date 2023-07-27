import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import scroll_to_top from "../../functions/scroll";

import sampleClassImg from "../../../asset/images/sample-class-img.png";
const Kelas = () => {
  return (
    <div className="class-wrapper">
      <Link to="/classes/:id" className="img-wrapper">
        <img src={sampleClassImg} alt="اسم کلاس" />
      </Link>
      <span className="class-info">
        <span className="class-teacher-name">
          <span className="class-name">عربی انسانی</span>
          <span className="teacher-name">استاد پارسا سرائیه</span>
        </span>
        <span className="prices-wrppaer">
          <span className="normal-price">۱٬۲۰۰٬۰۰۰تومان</span>
          <span className="discounted-price">۷۰۰٬۰۰۰ تومان</span>
        </span>
      </span>
      <Link
        to="/classes/:id"
        className="edit-class-btn"
        onClick={() => {
          scroll_to_top();
        }}
      >
        ویرایش دوره
      </Link>
    </div>
  );
};

export default Kelas;
