import React, { useEffect, useState } from "react";
import ReloadBtn from "../reusable/reload-btn";
import LittleLoading from "../reusable/little-loading";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import { Helmet } from "react-helmet";
import axios from "axios";
import urls from "../urls/urls";
import * as shamsi from "shamsi-date-converter";
const SingleDore = () => {
  const [dore, set_dore] = useState(false);
  const [pause, set_pause] = useState(false);
  const [title, set_title] = useState(false);
  const [day, set_day] = useState(false);
  const [month, set_month] = useState(false);
  const [year, set_year] = useState(false);
  const [description, set_description] = useState(false);
  const [file, set_file] = useState(false);
  const [dore_img, set_dore_img] = useState(false);
  const [reason_title_1, set_reason_title_1] = useState(false);
  const [reason_title_2, set_reason_title_2] = useState(false);
  const [reason_title_3, set_reason_title_3] = useState(false);
  const [reason_text_1, set_reason_text_1] = useState(false);
  const [reason_text_2, set_reason_text_2] = useState(false);
  const [reason_text_3, set_reason_text_3] = useState(false);
  const [title_err, set_title_err] = useState(false);
  const [day_err, set_day_err] = useState(false);
  const [month_err, set_month_err] = useState(false);
  const [year_err, set_year_err] = useState(false);
  const [description_err, set_description_err] = useState(false);
  const [reason_title_err_1, set_reason_title_err_1] = useState(false);
  const [reason_title_err_2, set_reason_title_err_2] = useState(false);
  const [reason_title_err_3, set_reason_title_err_3] = useState(false);
  const [reason_text_err_1, set_reason_text_err_1] = useState(false);
  const [reason_text_err_2, set_reason_text_err_2] = useState(false);
  const [reason_text_err_3, set_reason_text_err_3] = useState(false);
  const page_slug = parseInt(window.location.pathname.split("/")[2]);
  const get_dore = () => {
    axios
      .get(`${urls.doreha}/${page_slug}`)
      .then((res) => {
        set_dore(res.data);
      })
      .catch();
  };
  useEffect(() => {
    get_dore();
  }, []);
  const handle_reload = () => {
    set_dore(false);
    get_dore();
  };
  const handle_title = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      set_title(false);
      set_title_err("تایتل وارد شده کوتاه است");
    } else {
      set_title(value);
      set_title_err(false);
    }
  };
  const handle_day = (e) => {
    const value = e.target.value;
    if (value > 31 || value < 1) {
      set_day(false);
      set_day_err("روز وارد شده درست نیست");
    } else {
      set_day(value);
      set_day_err(false);
    }
  };
  const handle_month = (e) => {
    const value = e.target.value;
    if (value > 12 || value < 1) {
      set_month(false);
      set_month_err("ماه وارد شده درست نیست");
    } else {
      set_month(value);
      set_month_err(false);
    }
  };
  const handle_year = (e) => {
    const value = e.target.value;
    if (value > 1500 || value < 1401) {
      set_year(false);
      set_year_err("سال وارد شده درست نیست");
    } else {
      set_year(value);
      set_year_err(false);
    }
  };
  const handle_description = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      set_description(false);
      set_description_err("توضیحات وارد شده کوتاه است");
    } else {
      set_description(value);
      set_description_err(false);
    }
  };
  const handle_reason_title_1 = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      set_reason_title_1(false);
      set_reason_title_err_1("تایتل دلیل وارد شده کوتاه است");
    } else {
      set_reason_title_1(value);
      set_reason_title_err_1(false);
    }
  };
  const handle_reason_title_2 = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      set_reason_title_2(false);
      set_reason_title_err_2("تایتل دلیل وارد شده کوتاه است");
    } else {
      set_reason_title_2(value);
      set_reason_title_err_2(false);
    }
  };
  const handle_reason_title_3 = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      set_reason_title_3(false);
      set_reason_title_err_3("تایتل دلیل وارد شده کوتاه است");
    } else {
      set_reason_title_3(value);
      set_reason_title_err_3(false);
    }
  };
  const handle_reason_text_1 = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      set_reason_text_1(false);
      set_reason_text_err_1("توضیح دلیل وارد شده کوتاه است");
    } else {
      set_reason_text_1(value);
      set_reason_text_err_1(false);
    }
  };
  const handle_reason_text_2 = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      set_reason_text_2(false);
      set_reason_text_err_2("توضیح دلیل وارد شده کوتاه است");
    } else {
      set_reason_text_2(value);
      set_reason_text_err_2(false);
    }
  };
  const handle_reason_text_3 = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      set_reason_text_3(false);
      set_reason_text_err_3("توضیح دلیل وارد شده کوتاه است");
    } else {
      set_reason_text_3(value);
      set_reason_text_err_3(false);
    }
  };
  const handle_img = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        set_dore_img(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    set_file(file);
  };
  const convert_month = () => {
    const miladi_date = shamsi.jalaliToGregorian(
      parseInt(year),
      parseInt(month),
      parseInt(day)
    );
    const joined_date = miladi_date.join("-");
    return joined_date;
  };
  const send_data_obj = () => {
    set_pause(true);
    const send_obj = {
      dore_title: title ? title : dore.dore_title,
      descriptions: description ? description : dore.descriptions,
      dore_start_date:
        day && month && year
          ? convert_month(day, month, year)
          : dore.dore_start_date,
      reasons_full:
        reason_title_1 &&
        reason_title_2 &&
        reason_title_3 &&
        reason_text_1 &&
        reason_text_2 &&
        reason_text_3
          ? [
              { title: reason_title_1, text: reason_text_1 },
              { title: reason_title_2, text: reason_text_2 },
              { title: reason_title_3, text: reason_text_3 },
            ]
          : dore.reasons_full,
    };
    axios
      .patch(`${urls.doreha}/${page_slug}`, send_obj)
      .then((res) => {
        const dore = res.data;
        console.log(dore);
        if (typeof dore === "object") {
          set_dore(dore);
          send_data_img();
        } else {
          alert("مشکلی پیش آمده");
        }
      })
      .catch((e) => {
        console.log(e.message);
        alert("مشکلی پیش آمده");
      });
  };
  const send_data_img = () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      axios
        .patch(`${urls.doreha}/${page_slug}`, formData)
        .then((res) => {
          console.log(res.data);
          if (typeof dore === "object") {
            set_dore(dore);
            alert("تغییرات با موفقیت اعمال شد");
            window.location.reload();
          } else {
            alert("مشکلی پیش آمده");
          }
          set_pause(false);
        })
        .catch((e) => {
          console.log(e);
          alert("مشکلی پیش آمده");
        });
    } else {
      alert("تغییرات با موفقیت اعمال شد");
      window.location.reload();
      set_pause(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>دوره فلان</title>
      </Helmet>
      <section className="single-dore-page-wrapper page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="single-dore-wrapper">
            <div className="dore-card">
              <img src={dore ? dore.image_link : ""} alt={dore.dore_title} />
              <h1 className="page-title">
                دوره {dore ? dore.dore_title : <LittleLoading />}
              </h1>
              <span className="dore-start-time">
                {dore
                  ? new Date(dore.dore_start_date).toLocaleDateString("fa-ir")
                  : "وارد نشده"}
              </span>
            </div>
            <div className="change-data">
              <div className="section-header">
                <h2 className="change-title">
                  ویرایش اطلاعات دوره{" "}
                  {dore ? dore.dore_title : <LittleLoading />}
                </h2>
                <ReloadBtn click={handle_reload} />
              </div>
              <div className="dore-inputs">
                <span className="input-wrapper">
                  <span className="input-title">نام دوره : </span>
                  <span className="input-box">
                    <input
                      type="text"
                      placeholder={
                        dore ? dore.dore_title : "نام دوره را وارد کنید"
                      }
                      onInput={handle_title}
                    />
                  </span>
                </span>
                <span className="input-wrapper">
                  <span className="input-title">تاریخ شروع :</span>
                  <span className="input-box date-box">
                    <input
                      type="number"
                      placeholder="روز"
                      onInput={handle_day}
                    />
                    <input
                      type="number"
                      placeholder="ماه"
                      onInput={handle_month}
                    />
                    <input
                      type="number"
                      placeholder="سال"
                      onInput={handle_year}
                    />
                  </span>
                </span>
                <span className="input-wrapper">
                  <span className="input-title">توضیحات دوره :</span>
                  <span className="input-box">
                    <textarea
                      type="text"
                      placeholder={
                        dore ? dore.descriptions : "توضیحات دوره را وارد کنید"
                      }
                      onInput={handle_description}
                    />
                  </span>
                </span>
                <span className="input-wrapper">
                  <span className="input-title">تصویر جدید :</span>
                  <span className="input-box">
                    <label htmlFor="dore-img" className="choose-img-btn">
                      انتخاب تصویر
                    </label>
                    <input
                      type="file"
                      name="dore-img"
                      id="dore-img"
                      accept=".png, .jpg, .jpeg, .webp"
                      onInput={(e) => {
                        handle_img(e);
                        handleFileChange(e);
                      }}
                    />
                    {dore_img ? <img src={dore_img} /> : <></>}
                  </span>
                </span>
                <span className="input-wrapper">
                  <span className="input-title">دلیل اول برای دوره :</span>
                  <span className="input-box">
                    <input
                      type="text"
                      onInput={handle_reason_title_1}
                      placeholder={
                        dore
                          ? dore.reasons_full[0]
                            ? dore.reasons_full[0].title
                            : "تایتل برای دلیل اول"
                          : "تایتل برای دلیل اول"
                      }
                    />
                    <textarea
                      type="text"
                      onInput={handle_reason_text_1}
                      placeholder={
                        dore
                          ? dore.reasons_full[0]
                            ? dore.reasons_full[0].text
                            : "متن توضیحات برای دلیل اول"
                          : "متن توضیحات برای دلیل اول"
                      }
                    />
                  </span>
                </span>
                <span className="input-wrapper">
                  <span className="input-title">دلیل دوم برای دوره :</span>
                  <span className="input-box">
                    <input
                      type="text"
                      onInput={handle_reason_title_2}
                      placeholder={
                        dore
                          ? dore.reasons_full[1]
                            ? dore.reasons_full[1].title
                            : "تایتل برای دلیل دوم"
                          : "تایتل برای دلیل دوم"
                      }
                    />
                    <textarea
                      type="text"
                      onInput={handle_reason_text_2}
                      placeholder={
                        dore
                          ? dore.reasons_full[1]
                            ? dore.reasons_full[1].text
                            : "متن توضیحات برای دلیل دوم"
                          : "متن توضیحات برای دلیل دوم"
                      }
                    />
                  </span>
                </span>
                <span className="input-wrapper">
                  <span className="input-title">دلیل سوم برای دوره :</span>
                  <span className="input-box">
                    <input
                      type="text"
                      onInput={handle_reason_title_3}
                      placeholder={
                        dore
                          ? dore.reasons_full[2]
                            ? dore.reasons_full[2].title
                            : "تایتل برای دلیل سوم"
                          : "تایتل برای دلیل سوم"
                      }
                    />
                    <textarea
                      type="text"
                      onInput={handle_reason_text_3}
                      placeholder={
                        dore
                          ? dore.reasons_full[2]
                            ? dore.reasons_full[2].text
                            : "متن توضیحات برای دلیل سوم"
                          : "متن توضیحات برای دلیل سوم"
                      }
                    />
                  </span>
                </span>
              </div>
              <div className="all-errors">
                {title_err ? (
                  <span className="error-wrapper">{title_err}</span>
                ) : (
                  ""
                )}
                {day_err ? (
                  <span className="error-wrapper">{day_err}</span>
                ) : (
                  ""
                )}
                {month_err ? (
                  <span className="error-wrapper">{month_err}</span>
                ) : (
                  ""
                )}
                {year_err ? (
                  <span className="error-wrapper">{year_err}</span>
                ) : (
                  ""
                )}
                {description_err ? (
                  <span className="error-wrapper">{description_err}</span>
                ) : (
                  ""
                )}
                {reason_title_err_1 ? (
                  <span className="error-wrapper">{reason_title_err_1}</span>
                ) : (
                  ""
                )}
                {reason_title_err_2 ? (
                  <span className="error-wrapper">{reason_title_err_2}</span>
                ) : (
                  ""
                )}
                {reason_title_err_3 ? (
                  <span className="error-wrapper">{reason_title_err_3}</span>
                ) : (
                  ""
                )}
                {reason_text_err_1 ? (
                  <span className="error-wrapper">{reason_text_err_1}</span>
                ) : (
                  ""
                )}
                {reason_text_err_2 ? (
                  <span className="error-wrapper">{reason_text_err_2}</span>
                ) : (
                  ""
                )}
                {reason_text_err_3 ? (
                  <span className="error-wrapper">{reason_text_err_3}</span>
                ) : (
                  ""
                )}
              </div>
              <div className="submit-btn-wrapper">
                {pause ? (
                  <button className="submit-btn">
                    <LittleLoading />
                  </button>
                ) : (
                  <button className="submit-btn" onClick={send_data_obj}>
                    ثبت تغییرات
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleDore;
