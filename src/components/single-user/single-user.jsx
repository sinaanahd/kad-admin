import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import LittleLoading from "../reusable/little-loading";
import { DataContext } from "../context/DataContext";
import split_in_three from "../functions/spilit_in_three";
import axios from "axios";

import UserMainData from "./user-main-data/user-main-data";
import UserClasses from "./user-classes/user-classes";
import urls from "../urls/urls";

const SingleUser = () => {
  const {
    kelasses,
    all_users,
    user,
    history,
    setNewHistory,
    setAll_users,
    get_all_users,
  } = useContext(DataContext);
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
  const [sms_code, setSms_code] = useState(false);
  const [sms_pause, setSms_pause] = useState(false);
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
    axios
      .get(urls.site_user + slug)
      .then((res) => {
        console.log(res.data);
        const { result, response, error } = res.data;
        if (result) {
          setSingle_user(response);
          history_actions(response);
        } else {
          console.log(error);
          alert("مشکلی پیش آمده");
        }
        // fill_not_users(single_user);
      })
      .catch((e) => {
        console.log(e.message);
        alert("مشکلی پیش آمده");
      });
    // if (all_users && kelasses) {
    //   const single_user = { ...all_users.find((u) => u.user_id === slug) };
    //   if (Object.keys(single_user).length !== 0) {
    //     // setSingle_user(single_user);
    //     // console.log(single_user);
    //   } else {
    //     window.location.pathname = "/not-found";
    //   }
    // }
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
    // kelasses.filter((k) =>
    //   single_user.kelases.includes(k.kelas_id)
    // );
    // setNot_kelasses(not_user_kelasses);
    // console.log(not_user_kelasses);
    return not_user_kelasses;
  };
  const repair_not_user_kelasses =
    kelasses && single_user ? fill_not_users(single_user) : false;
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
      .patch(urls.admin_users, data)
      .then((res) => {
        const single_user = res.data;
        setSingle_user(single_user);
        // fill_not_users(single_user);
        setAdded_classes([]);
        set_save_pause(false);
      })
      .catch((e) => console.log(e.message));
  };
  const make_spot_liecence = (id) => {
    set_liecene_pause(true);
    axios
      .get(`${urls.admin_create_spot_licence_for_user}${id}`)
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
      .get(`${urls.admin_update_skyroom_for_user}${id}`)
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
  const get_last_code = () => {
    setSms_pause(true);
    axios
      .get(`${urls.admin_check_last_verification_code}${single_user.user_id}`)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          setSms_code(response);
        } else {
          console.log(error);
        }
        setSms_pause(false);
      })
      .catch((e) => console.log(e.message));
  };
  return (
    <>
      <Helmet>
        <title>{single_user ? single_user.name : "در حال بارگذاری"}</title>
      </Helmet>
      <section className="single-user-wrapper page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="pop-up-content">
            <span className="account-detials">
              کارنامه مالی {single_user ? single_user.name : <LittleLoading />}{" "}
              - {single_user ? single_user.user_id : <LittleLoading />}
              <span className="get-code">
                {sms_pause ? (
                  <span className="get-code-btn">
                    <LittleLoading />
                  </span>
                ) : (
                  <span
                    className="get-code-btn"
                    onClick={() => {
                      get_last_code();
                    }}
                  >
                    دریافت کد پیامکی
                  </span>
                )}
                <span className="get-code-result">
                  {sms_code ? "کد تائید : " + sms_code : ""}
                </span>
              </span>
            </span>
            <UserMainData single_user={single_user} />
            <UserClasses
              single_user={single_user}
              show_copied={show_copied}
              make_spot_liecence={make_spot_liecence}
              not_user_kelasses={repair_not_user_kelasses}
              liecene_pause={liecene_pause}
              add_class={add_class}
              added_classes={added_classes}
              remove_class={remove_class}
              setShow_classes={setShow_classes}
              show_classes={show_classes}
              setSingle_user={setSingle_user}
              setAll_users={setAll_users}
              get_all_users={get_all_users}
              all_users={all_users}
            />
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
