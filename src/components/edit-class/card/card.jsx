import React, { useState } from "react";
import LittleLoading from "../../reusable/little-loading";
import split_in_three from "../../functions/spilit_in_three";
import convert_to_persian from "../../functions/convert-to-persian";

const Card = ({ single_class, teachers }) => {
  return (
    <div className="class-card">
      <span to="/classes/:id" className="img-wrapper">
        <img src={single_class.image_link} alt="اسم کلاس" />
      </span>
      <span className="class-info">
        <span className="class-teacher-name">
          <span className="class-name">
            {single_class ? single_class.kelas_title : <LittleLoading />}
          </span>
          <span className="teacher-name">
            {single_class ? single_class.ostad_name : <LittleLoading />}
          </span>
        </span>
        <span className="prices-wrppaer">
          <span
            className={
              single_class
                ? single_class.discounted_price !== single_class.price
                  ? "normal-price discounted"
                  : "normal-price"
                : "normal-price"
            }
          >
            {single_class ? (
              !single_class.discounted_price ? (
                0
              ) : (
                split_in_three(convert_to_persian(single_class.price))
              )
            ) : (
              <LittleLoading />
            )}{" "}
            تومان
          </span>
          <span className="discounted-price">
            {single_class ? (
              !single_class.discounted_price ? (
                split_in_three(convert_to_persian(single_class.price))
              ) : (
                split_in_three(
                  convert_to_persian(single_class.discounted_price)
                )
              )
            ) : (
              <LittleLoading />
            )}{" "}
            تومان
          </span>
        </span>
      </span>
    </div>
  );
};

export default Card;
