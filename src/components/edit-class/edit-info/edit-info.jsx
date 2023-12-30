import React, { useContext, useState } from "react";
import convert_to_persian from "../../functions/convert-to-persian";
import LittleLoading from "../../reusable/little-loading";
import split_in_three from "../../functions/spilit_in_three";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import scrollToTop from "../../functions/scroll";
import axios from "axios";
import urls from "../../urls/urls";
import { DataContext } from "../../context/DataContext";
import arrow_down from "../../../asset/images/arrow-down.svg";

const Edit_info = ({ single_class, setSingle_class }) => {
  const { get_kelas_summery, teachers, doreha } = useContext(DataContext);
  const [price, setPrice] = useState(false);
  const [discout_price, setDiscount_price] = useState(false);
  const [class_name, set_class_name] = useState(false);
  const [spot_data, set_spot_data] = useState(false);
  const [class_name_err, set_class_name_err] = useState(false);
  const [pause, setPause] = useState(false);
  const [drop_down, set_drop_down] = useState(false);
  const [dore, set_dore] = useState(false);
  const [description, set_description] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // console.log(file);
  };
  const handle_img = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
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
  const handle_description = (e) => {
    const value = e.target.value;
    set_description(value);
  };
  const convert_arr_to_str = (arr) => {
    let main = "";
    arr.forEach((element) => {
      main += element;
    });
    return main;
  };
  const send_changes_request = () => {
    const send_price = price || single_class.price;
    const send_discount = discout_price || single_class.discounted_price;
    const send_desc =
      description || convert_arr_to_str(single_class.description);
    if (send_discount > send_price) {
      const admin_notice = `ادمین عزیز - قیمت تخفیف پس از اعمال تخفیف نباید از قیمت اصلی بیشتر باشه`;
      alert(admin_notice);
    } else if (
      price ||
      discout_price ||
      class_name ||
      description ||
      dore ||
      selectedFile ||
      spot_data
    ) {
      let send_obj;
      if (selectedFile) {
        send_obj = new FormData();
        send_obj.append("image", selectedFile);
        send_obj.append("price", send_price);
        send_obj.append("discounted_price", send_discount);
        send_obj.append(
          "kelas_title",
          class_name ? class_name : single_class.kelas_title
        );
        send_obj.append(
          "parent_dore",
          dore ? dore.dore_title : single_class.parent_dore
        );
        send_obj.append("description", send_desc);
        send_obj.append(
          "spot_player_id",
          spot_data ? spot_data : single_class.spot_player_id
        );
      } else {
        send_obj = {
          price: send_price,
          discounted_price: send_discount,
          kelas_title: class_name ? class_name : single_class.kelas_title,
          description: send_desc,
          parent_dore: dore ? dore.dore_title : single_class.parent_dore,
          spot_player_id: spot_data ? spot_data : single_class.spot_player_id,
        };
      }
      setPause(true);
      // console.log(send_obj);
      axios
        .patch(`${urls.kelas_summery}/${single_class.kelas_id}`, send_obj)
        .then((res) => {
          console.log(res.data);
          const { response, result, error } = res.data;
          if (result) {
            setSingle_class(response);
            get_kelas_summery();
            alert("تغییرات اعمال شد");
          } else {
            alert("مشکلی پیش آمده");
            console.log(error);
          }
          setPause(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const handle_class_name = (e) => {
    const value = e.target.value;
    if (value.length === 0) {
      set_class_name(false);
      set_class_name_err("نام کلاس وارد نشده است");
    } else if (value.length < 5) {
      set_class_name(false);
      set_class_name_err("نام وارد شده کوتاه است");
    } else {
      set_class_name(value);
      set_class_name_err(false);
    }
  };
  const handle_spot_data = (e) => {
    const value = e.target.value;
    set_spot_data(value);
  };
  const handle_drop_down = (entry) => {
    set_drop_down(entry);
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
          <textarea
            type="text"
            onInput={handle_class_name}
            placeholder={single_class ? single_class.kelas_title : "وارد نشده"}
            className="name-text-area"
          />
          <span className="info-errors">
            {class_name_err ? class_name_err : <></>}
          </span>
        </span>
        <span className="filter">
          <span className="filter-title">شناسه اسپات</span>
          <textarea
            type="text"
            onInput={handle_spot_data}
            placeholder={
              single_class ? single_class.spot_player_id : "وارد نشده"
            }
            className="name-text-area"
          />
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
                ? single_class.discounted_price
                  ? split_in_three(
                      convert_to_persian(single_class.discounted_price)
                    ) + " تومان"
                  : split_in_three(convert_to_persian(1000000)) + " تومان"
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
      <div className="filters-wrapper">
        <span className="filter">
          <span className="filter-title">دوره کلاس</span>
          <span
            className="custom-drop-down-wrapper"
            onClick={() => {
              handle_drop_down(!drop_down);
            }}
          >
            <span className="custom-drop-down-text">
              {dore ? dore.dore_title : "انتخاب کنید"}
            </span>
            <img src={arrow_down} alt="باز کردن" />
          </span>
          {drop_down ? (
            <span className="drop-down-wrapper">
              {doreha ? (
                doreha.map((d) => (
                  <span
                    key={d.dore_id}
                    className="drop-down-item"
                    onClick={() => {
                      set_dore(d);
                      handle_drop_down(false);
                    }}
                  >
                    {d.dore_title}
                  </span>
                ))
              ) : (
                <LittleLoading />
              )}
            </span>
          ) : (
            <></>
          )}
        </span>
        <span className="filter file-filter">
          <span className="filter-title">عکس کلاس</span>
          <label htmlFor="class-photo">انتخاب عکس</label>
          <input
            type="file"
            name="class-photo"
            id="class-photo"
            className="class-photo"
            accept=".png, .jpg, .jpeg, .webp"
            onChange={(e) => {
              handleFileChange(e);
              handle_img(e);
            }}
          />
          {img ? (
            <>
              <span className="new-photo-text">عکس انتخاب شده : </span>
              <span className="new-photo-wrapper">
                <img src={img} alt="عکس جدید" />
              </span>
            </>
          ) : (
            <></>
          )}
        </span>
        <span className="filter text-area-filter">
          <span className="filter-title">توضیحات کلاس</span>
          <textarea
            placeholder={single_class ? single_class.description : "وارد نشده"}
            onInput={handle_description}
          ></textarea>
        </span>
      </div>
      <div className="btns-wrapper">
        <span
          onClick={() => {
            send_changes_request();
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
