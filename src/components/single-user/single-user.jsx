import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../header/header";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import LittleLoading from "../reusable/little-loading";
import { DataContext } from "../context/DataContext";
import convert_to_persian from "../functions/convert-to-persian";
import split_in_three from "../functions/spilit_in_three";
import axios from "axios";

import cross_svg from "../../asset/images/cross-svg.svg";
import arrow_icon from "../../asset/images/arrow-down.svg";
import check_img from "../../asset/images/checked.webp";
import uncheck_img from "../../asset/images/unchecked.webp";
import copy_to_clip_board from "../functions/copy-to-clip-board";

const SingleUser = () => {
  const { kelasses, all_users, user, history, setNewHistory } =
    useContext(DataContext);
  const [added_classes, setAdded_classes] = useState([]);
  const [show_classes, setShow_classes] = useState(false);
  const [single_user, setSingle_user] = useState(false);
  const [not_user_kelasses, setNot_kelasses] = useState(false);
  const [is_ghesti, setIs_ghesti] = useState(false);
  const [total_price, set_total_price] = useState(0);
  const [total_price_err, set_total_price_error] = useState(false);
  const [update_pause, set_update_pause] = useState(false);
  const [save_pause, set_save_pause] = useState(false);
  const [liecene_pause, set_liecene_pause] = useState(false);
  const [copy, setCopy] = useState(false);
  useEffect(() => {
    if (user) {
      if (user.level >= 10) {
        get_single();
      } else {
        window.location.pathname = "/account";
      }
    } else {
      window.location.pathname = "/account";
    }
  }, []);
  const history_actions = (user) => {
    const old_history = [...history];
    let duplicate = false;
    old_history.forEach((h) => {
      if (h.user_id === user.user_id) {
        duplicate = true;
      }
    });
    if (!duplicate) {
      setNewHistory([user, ...old_history]);
    }
  };
  const get_single = () => {
    const slug = parseInt(window.location.pathname.split("/")[2]);
    if (all_users && kelasses) {
      const single_user = { ...all_users.find((u) => u.user_id === slug) };
      if (Object.keys(single_user).length !== 0) {
        setSingle_user(single_user);
        fill_not_users(single_user);
        history_actions(single_user);
      } else {
        window.location.pathname = "/not-found";
      }
    }
  };
  const fill_not_users = (single_user) => {
    const not_user_kelasses = [];
    kelasses.forEach((k) => {
      const kelas = {
        ...single_user.kelases.find((uk) => uk.kelas_id === k.kelas_id),
      };
      if (Object.keys(kelas).length === 0) {
        not_user_kelasses.push(k);
      }
    });
    setNot_kelasses(not_user_kelasses);
  };
  const add_class = (kelas) => {
    const active_kelasses = [...added_classes];
    const contains = Object.keys({
      ...active_kelasses.find((k) => k.kelas_id === kelas.kelas_id),
    }).length;
    if (contains === 0) {
      active_kelasses.push(kelas);
      setAdded_classes(active_kelasses);
    } else {
      remove_class(kelas);
    }
  };
  const remove_class = (kelas) => {
    const all_actives = [...added_classes];
    const index = all_actives.indexOf(kelas);
    all_actives.splice(index, 1);
    setAdded_classes(all_actives);
  };
  const convert_subject = (s) => {
    switch (s) {
      case 0:
        return "ریاضی";
      case 1:
        return "تجربی";
      case 2:
        return "انسانی";
      case 3:
        return "هنر";
      default:
        return "وارد نشده";
    }
  };
  const convert_year = (y) => {
    switch (y) {
      case 10:
        return "دهم";
      case 11:
        return "یازدهم";
      case 12:
        return "دوازدهم";
      case 18:
        return "کنکور";
      case 0:
        return "فارغ التحصیل";
      default:
        return "وارد نشده";
    }
  };
  const get_total_price = (value) => {
    set_total_price(value);
    set_total_price_error("ok");
  };
  const send_data = () => {
    const kelasses_ids = [];
    added_classes.forEach((c) => {
      kelasses_ids.push(c.kelas_id);
    });
    const data = {
      user_id: single_user.user_id,
      kelases_ids: kelasses_ids,
      total_price: total_price,
      is_ghesti: is_ghesti,
    };
    set_save_pause(true);
    axios
      .patch("https://kadschool.com/backend/kad_api/admin_users", data)
      .then((res) => {
        const single_user = res.data;
        setSingle_user(single_user);
        fill_not_users(single_user);
        setAdded_classes([]);
        set_save_pause(false);
      })
      .catch((e) => console.log(e.message));
  };
  const make_spot_liecence = (id) => {
    set_liecene_pause(true);
    axios
      .get(
        `https://kadschool.com/backend/kad_api/admin_create_spot_licence_for_user/${id}`
      )
      .then((res) => {
        const single_user = res.data;
        setSingle_user(single_user);
        set_liecene_pause(false);
      })
      .catch((e) => console.log(e.message));
  };
  const update_sky_room = (id) => {
    set_update_pause(true);
    axios
      .get(
        `https://kadschool.com/backend/kad_api/admin_update_skyroom_for_user/${id}`
      )
      .then((res) => {
        const single_user = res.data;
        setSingle_user(single_user);
        set_update_pause(false);
        // console.log(res.data);
      })
      .catch((e) => console.log(e.message));
  };
  const show_copied = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 500);
  };
  return (
    <>
      <Helmet>
        <title>{single_user ? single_user.name : "در حال بارگذاری"}</title>
      </Helmet>
      <Header />
      <section className="single-user-wrapper page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="pop-up-content">
            <span className="account-detials">
              کارنامه مالی {single_user ? single_user.name : <LittleLoading />}{" "}
              - {single_user ? single_user.user_id : <LittleLoading />}
            </span>
            <div className="main-details">
              <div className="details-header">
                <span className="detial-item first-col">شماره موبایل</span>
                <span className="detial-item">پایه</span>
                <span className="detial-item">رشته</span>
                <span className="detial-item">تاریخ ثبت‌نام</span>
                <span className="detial-item">ورود از کمپین</span>
                <span className="detial-item">تعداد کلاس </span>
                <span className="detial-item">نام معرف</span>
              </div>
              {single_user ? (
                <div className="details-content">
                  <span className="detial-item first-col">
                    {single_user.phone_number}
                  </span>
                  <span className="detial-item">
                    {convert_year(single_user.year)}
                  </span>
                  <span className="detial-item">
                    {convert_subject(single_user.subject)}
                  </span>
                  <span className="detial-item">
                    {new Date(single_user.register_date).toLocaleDateString(
                      "fa-ir"
                    )}
                  </span>
                  <span className="detial-item">
                    {single_user.is_from_campaign_mordad_1402 ? "بله" : "خیر"}
                  </span>
                  <span className="detial-item">
                    {convert_to_persian(single_user.kelases.length)} کلاس{" "}
                  </span>
                  <span className="detial-item">
                    {single_user.parent ? single_user.parent : "ندارد"}
                  </span>
                </div>
              ) : (
                <div className="details-content">
                  <span className="detial-item first-col">
                    <LittleLoading />
                  </span>
                  <span className="detial-item">
                    <LittleLoading />
                  </span>
                  <span className="detial-item">
                    <LittleLoading />
                  </span>
                  <span className="detial-item">
                    <LittleLoading />
                  </span>
                  <span className="detial-item">
                    <LittleLoading />
                  </span>
                  <span className="detial-item">
                    <LittleLoading />{" "}
                  </span>
                  <span className="detial-item">
                    <LittleLoading />
                  </span>
                </div>
              )}
            </div>
            <div className="kelas-details-wrapper">
              <span className="title">اطلاعات کلاس های کاربر</span>
              <div className="kelas-details">
                <div className="sky-room-details">
                  <div className="sky-room-item">
                    <span className="sky-title">شناسه کاربری اسکای‌روم</span>
                    <span
                      className={
                        single_user
                          ? single_user.skyRoom_username
                            ? "sky-box-to-copy copy"
                            : "sky-box-to-copy"
                          : "sky-box-to-copy"
                      }
                      onClick={() => {
                        if (single_user) {
                          if (single_user.skyRoom_username) {
                            copy_to_clip_board(single_user.skyRoom_username);
                            show_copied();
                          }
                        }
                      }}
                    >
                      {single_user ? (
                        single_user.skyRoom_username ? (
                          "کپی!"
                        ) : (
                          "ندارد"
                        )
                      ) : (
                        <LittleLoading />
                      )}
                    </span>
                  </div>
                  <div className="sky-room-item">
                    <span className="sky-title">پسوورد اسکای‌روم</span>
                    <span
                      className={
                        single_user
                          ? single_user.skyRoom_password
                            ? "sky-box-to-copy copy"
                            : "sky-box-to-copy"
                          : "sky-box-to-copy"
                      }
                      onClick={() => {
                        if (single_user) {
                          if (single_user.skyRoom_password) {
                            copy_to_clip_board(single_user.skyRoom_password);
                            show_copied();
                          }
                        }
                      }}
                    >
                      {single_user ? (
                        single_user.skyRoom_password ? (
                          "کپی!"
                        ) : (
                          "ندارد"
                        )
                      ) : (
                        <LittleLoading />
                      )}
                    </span>
                  </div>
                  <div className="sky-room-item">
                    <span className="sky-title">لایسنس اسپات پلیر</span>
                    <span
                      className={
                        single_user
                          ? single_user.spot_license
                            ? "sky-box-to-copy copy"
                            : "sky-box-to-copy"
                          : "sky-box-to-copy"
                      }
                      onClick={() => {
                        if (single_user) {
                          if (single_user.spot_license) {
                            copy_to_clip_board(single_user.spot_license);
                            show_copied();
                          }
                        }
                      }}
                    >
                      {single_user ? (
                        single_user.spot_license ? (
                          "کپی!"
                        ) : (
                          "ندارد"
                        )
                      ) : (
                        <LittleLoading />
                      )}
                    </span>
                  </div>
                  <div className="sky-room-item">
                    <span
                      className="get-sky-data"
                      onClick={() => {
                        if (!liecene_pause) {
                          make_spot_liecence(single_user.user_id);
                        }
                      }}
                    >
                      {liecene_pause ? <LittleLoading /> : "ایجاد لایسنس اسپات"}
                    </span>
                  </div>
                </div>
                <div className="kelas-details-heder">
                  <span className="kelas-detail-item first-col">
                    کلاس های کاربر
                  </span>
                  <span className="kelas-detail-item">لینک اسکای روم</span>
                  <span className="kelas-detail-item">
                    لینک مستقیم اسکای روم
                  </span>
                  <span className="kelas-detail-item">وضعیت دسترسی</span>
                </div>
                <div className="kelas-details-contents-wrapper">
                  {single_user ? (
                    single_user.kelases.length !== 0 ? (
                      single_user.kelases.map((k, i) => (
                        <div key={i++} className="kelas-details-content">
                          <span className="kelas-detail-item first-col">
                            {
                              {
                                ...kelasses.find(
                                  (kelas) => kelas.kelas_id === k.kelas_id
                                ),
                              }.kelas_title_and_ostad_name
                            }
                          </span>
                          <span className="kelas-detail-item">
                            {{
                              ...kelasses.find(
                                (kelas) => kelas.kelas_id === k.kelas_id
                              ),
                            }.skyRoom_link ? (
                              <span
                                className="inside-item copy"
                                onClick={() => {
                                  copy_to_clip_board(
                                    {
                                      ...kelasses.find(
                                        (kelas) => kelas.kelas_id === k.kelas_id
                                      ),
                                    }.skyRoom_link
                                  );
                                  show_copied();
                                }}
                              >
                                کپی
                              </span>
                            ) : (
                              <span className="inside-item">ندارد</span>
                            )}
                          </span>
                          <span className="kelas-detail-item">
                            {k.sky_direct_link ? (
                              <span
                                className="inside-item copy"
                                onClick={() => {
                                  copy_to_clip_board(k.sky_direct_link);
                                  show_copied();
                                }}
                              >
                                کپی
                              </span>
                            ) : (
                              <span className="inside-item">ندارد</span>
                            )}
                          </span>
                          <span className="kelas-detail-item check-box">
                            {k.has_access ? (
                              <span className="inside-item">
                                <img
                                  src={check_img}
                                  width={16}
                                  height={16}
                                  alt="دسترسی دارد"
                                />
                              </span>
                            ) : (
                              <span className="inside-item">
                                <img
                                  src={uncheck_img}
                                  width={16}
                                  height={16}
                                  alt="دسترسی ندارد"
                                />
                              </span>
                            )}
                          </span>
                        </div>
                      ))
                    ) : (
                      "موردی برای نمایش وجود ندارد"
                    )
                  ) : (
                    <LittleLoading />
                  )}
                </div>
                <div className="add-kelas-wrapper">
                  <span className="add-title">ثبت‌نام کابر</span>
                  <div className="active-kelasses">
                    {added_classes.length !== 0
                      ? added_classes.map((k) => (
                          <div key={k.kelas_id} className="active-kelas">
                            <span className="kelas-title">
                              {k.kelas_title_and_ostad_name}
                            </span>
                            <img
                              src={cross_svg}
                              alt="حذف"
                              onClick={() => {
                                remove_class(k);
                              }}
                            />
                          </div>
                        ))
                      : "موردی انتخاب نشده"}
                  </div>
                  <div className="add-kelas-wrapper">
                    <div className="add-kelas-option">
                      <span className="add-text">+ اضافه کردن کلاس</span>
                      <img
                        src={arrow_icon}
                        alt="بازکردن"
                        onClick={() => {
                          setShow_classes(!show_classes);
                        }}
                      />
                    </div>
                    {show_classes ? (
                      <div className="kelas-options">
                        {not_user_kelasses ? (
                          not_user_kelasses.map((k) => (
                            <span
                              key={k.kelas_id}
                              className={
                                added_classes.indexOf(k) !== -1
                                  ? "kelas-option added"
                                  : "kelas-option"
                              }
                              onClick={() => {
                                add_class(k);
                              }}
                            >
                              {k.kelas_title_and_ostad_name}
                            </span>
                          ))
                        ) : (
                          <LittleLoading />
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {added_classes.length !== 0 ? (
              <div className="price-and-ghesti-option">
                <span className="total-wrapper">
                  <span className="option-text">کل مبلغ پرداختی</span>
                  <input
                    type="number"
                    placeholder="کل مبلغ پرداختی"
                    onInput={({ target }) => {
                      get_total_price(target.value);
                    }}
                  />
                  <span className="all-price">
                    {split_in_three(total_price)} تومان
                  </span>
                  {!total_price_err ? (
                    <span className="error">مبلغی وارد نشده است</span>
                  ) : (
                    ""
                  )}
                </span>
                <span className="total-wrapper">
                  <span className="option-text">ثبت نام قسطی بوده ؟</span>
                  <span
                    onClick={() => {
                      setIs_ghesti(!is_ghesti);
                    }}
                    className={
                      is_ghesti ? "is-ghesti-box yes" : "is-ghesti-box"
                    }
                  ></span>
                </span>
              </div>
            ) : (
              <></>
            )}
            <div className="btns-wrapper">
              <div className="btn-wrapper">
                {/* <span className="wait-text">صبر کنید ...</span> */}
                {added_classes.length !== 0 && total_price_err === "ok" ? (
                  <span
                    className="save-actions btn-style"
                    onClick={() => {
                      if (!save_pause) {
                        send_data();
                      }
                    }}
                  >
                    {save_pause ? <LittleLoading /> : "ذخیره"}
                  </span>
                ) : (
                  <span className="save-actions btn-style">ذخیره</span>
                )}
                {/* <span className="save-actions btn-style">ذخیره</span> */}
                {/* <span className="status-text">
                  ذخیره شده! / عدم نیاز به ذخیره!
                </span> */}
              </div>
              <div className="btn-wrapper">
                {/* <span className="wait-text">صبر کنید ...</span> */}
                <span
                  className="btn-style"
                  onClick={() => {
                    if (single_user && !update_pause) {
                      update_sky_room(single_user.user_id);
                    }
                  }}
                >
                  {update_pause ? <LittleLoading /> : "آپدیت اسکایروم‌"}
                </span>
                {/* <span className="status-text">
                  ذخیره شده! / عدم نیاز به ذخیره!
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {copy ? <div className="copy-pop-up">کپی شد!</div> : <></>}
    </>
  );
};

export default SingleUser;
