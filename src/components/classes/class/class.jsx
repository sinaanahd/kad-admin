import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import scroll_to_top from "../../functions/scroll";
import split_in_three from "../../functions/spilit_in_three";
import convert_to_persian from "../../functions/convert-to-persian";

const Kelas = ({ kelas, doreha }) => {
  return (
    <div className="class-wrapper">
      <Link to={`/classes/${kelas.kelas_id}`} className="img-wrapper">
        <img
          src={kelas.image_link}
          width={262}
          height={262}
          loading="lazy"
          alt="اسم کلاس"
        />
      </Link>
      <span className="class-info">
        <span className="class-teacher-name">
          <span className="class-name">{kelas.kelas_title_and_ostad_name}</span>
          <span className="teacher-name">
            {
              {
                ...doreha.find((d) => d.dore_id === kelas.parent_dore_id),
              }.dore_title
            }
          </span>
        </span>
        <span className="prices-wrppaer">
          <span
            className={
              kelas.discounted_price === kelas.price
                ? "normal-price"
                : "normal-price discounted"
            }
          >
            {split_in_three(convert_to_persian(kelas.price))} تومان
          </span>
          <span className="discounted-price">
            {split_in_three(convert_to_persian(kelas.discounted_price))} تومان
          </span>
        </span>
      </span>
      <Link
        to={`/classes/${kelas.kelas_id}`}
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
