import React, { useState } from "react";
import convert_to_persian from "../../functions/convert-to-persian";
import LittleLoading from "../../reusable/little-loading";
import split_in_three from "../../functions/spilit_in_three";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import scrollToTop from "../../functions/scroll";
import axios from "axios";

const Edit_info = ({
  single_class,
  teachers,
  setSingle_class,
  get_kelasses,
}) => {
  const [price, setPrice] = useState(false);
  const [discout_price, setDiscount_price] = useState(false);
  const [pause, setPause] = useState(false);
  const handle_price = (value) => {
    if (value.length !== 0) {
      setPrice(parseInt(value));
    } else {
      setPrice(false);
    }
  };
  const handle_discounted_price = (value) => {
    if (value.length !== 0) {
      setDiscount_price(parseInt(value));
    } else {
      setDiscount_price(false);
    }
  };
  const send_price_change_request = () => {
    const send_price = price || single_class.price;
    const send_discount = discout_price || single_class.discounted_price;
    if (send_discount > send_price) {
      const admin_notice = `ادمین عزیز - قیمت تخفیف پس از اعمال تخفیف نباید از قیمت اصلی بیشتر باشه`;
      alert(admin_notice);
    } else {
      const send_obj = {
        kelas_id: single_class.kelas_id,
        price: send_price,
        discounted_price: send_discount,
      };
      setPause(true);
      axios
        .patch(`https://kadschool.com/backend/kad_api/admin_kelases`, send_obj)
        .then((res) => {
          const single_class = res.data;
          setSingle_class(single_class);
          get_kelasses();
          setPause(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div className="edit-satge-area">
      <h1 className="edit-title">
        ویرایش اطلاعات کلی درس
        {single_class ? " " + single_class.kelas_title : ""}
      </h1>
      <div className="filters-wrapper">
        <span className="filter">
          <span className="filter-title">عنوان درس</span>
          <span className="just-watch-content">
            {single_class ? single_class.kelas_title : <LittleLoading />}
          </span>
        </span>
        <span className="filter">
          <span className="filter-title">مشخصات استاد</span>
          <span className="just-watch-content">
            {single_class ? (
              {
                ...teachers.find(
                  (t) => t.teacher_id === single_class.teachers[0]
                ),
              }.fullname
            ) : (
              <LittleLoading />
            )}
          </span>
        </span>
        <span className="filter">
          <span className="filter-title">قیمت اصلی</span>
          <input
            type="number"
            onInput={({ target }) => {
              handle_price(target.value);
            }}
            placeholder={
              single_class
                ? split_in_three(convert_to_persian(single_class.price)) +
                  " تومان"
                : split_in_three(convert_to_persian(1000000)) + " تومان"
            }
          />
          <span className="entered-price">
            {price ? split_in_three(convert_to_persian(price)) + " تومان" : ""}
          </span>
        </span>
        <span className="filter">
          <span className="filter-title">قیمت پس از اعمال تخفیف</span>
          <input
            type="number"
            onInput={({ target }) => {
              handle_discounted_price(target.value);
            }}
            placeholder={
              single_class
                ? split_in_three(
                    convert_to_persian(single_class.discounted_price)
                  ) + " تومان"
                : split_in_three(convert_to_persian(1000000)) + " تومان"
            }
          />
          <span className="entered-price">
            {discout_price
              ? split_in_three(convert_to_persian(discout_price)) + " تومان"
              : ""}{" "}
          </span>
        </span>
      </div>
      <div className="btns-wrapper">
        <span
          onClick={() => {
            send_price_change_request();
          }}
          className="return-to-classes save-changes-btn"
        >
          {pause ? <LittleLoading /> : "اعمال تغییرات"}
        </span>
        <Link
          onClick={() => {
            scrollToTop();
          }}
          to="/classes"
          className="return-to-classes"
        >
          بازگشت به کلاس‌ها
        </Link>
      </div>
    </div>
  );
};

export default Edit_info;
