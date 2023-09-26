import React, { useState } from "react";
import convert_days from "../../functions/convert-days";
import convert_to_persian from "../../functions/convert-to-persian";
import axios from "axios";
import LittleLoading from "../../reusable/little-loading";
const Session_edit = ({
  jalasat,
  single_class,
  active_session,
  set_active_session,
  set_allow_upload,
  get_jalasat,
  find_single_class,
}) => {
  const class_jalasat = single_class
    ? jalasat
      ? [...jalasat.filter((j) => single_class.jalasat.includes(j.jalase_id))]
      : false
    : false;
  const [pause, setPause] = useState(false);
  const [edit_pause, setEdit_pause] = useState(false);
  const [new_title, set_new_title] = useState(false);
  const delete_file = (id) => {
    setEdit_pause(true);
    // prettier-ignore
    axios
      .patch("https://kadschool.com/backend/kad_api/admin_pdfs",
       {'spf_id': id}
      )
      .then((res) => {
        //console.log(res.data);
        set_active_session(res.data);
        get_jalasat();
        find_single_class();
        setEdit_pause(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const update_session = () => {
    let send_obj = {
      action: "update title",
      jalase_id: active_session.jalase_id,
      new_title: new_title,
    };
    setPause(true);
    if (new_title) {
      // console.log(send_obj);
      axios
        .patch("https://kadschool.com/backend/kad_api/admin_jalasat", send_obj)
        .then((res) => {
          //console.log(res.data);
          set_active_session(res.data);
          get_jalasat();
          find_single_class();
          setPause(false);
          set_allow_upload(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("عنوان جلسه وارد شده کوتاه است ");
      return;
    }
  };
  const fill_input = (value) => {
    if (value.length > 3) {
      set_new_title(value);
    } else {
      set_new_title(false);
    }
  };
  const delete_session = () => {
    const send_obj = {
      action: "delete",
      jalase_id: active_session.jalase_id,
      jalase_id: 124,
    };
    axios
      .patch("https://kadschool.com/backend/kad_api/admin_jalasat", send_obj)
      .then((res) => {
        //console.log(res.data);
        set_active_session(false);
        get_jalasat();
        find_single_class();
        setPause(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="choose-sessions-wrapper">
      <h2 className="semi-title">انتخاب جلسه</h2>
      <div className="sessions-wrapper">
        {class_jalasat && class_jalasat.length !== 0
          ? class_jalasat.map((j, i) => (
              <span
                className={
                  active_session
                    ? active_session.jalase_id === j.jalase_id
                      ? "session-wrapper focused"
                      : "session-wrapper"
                    : "session-wrapper"
                }
                key={j.jalase_id}
                onClick={() => {
                  set_active_session({ ...j, num: i });
                }}
              >
                <span className="session-text">
                  جلسه {convert_to_persian(i++ + 1)}
                  {/* {" " + j.jalase_id} */}
                </span>
                <span className="session-date">
                  <span className="date-box">
                    {new Date(j.jalase_date).toLocaleDateString("fa-ir")}
                  </span>
                  <span className="date-box">
                    {convert_days(j.week_day_name)}{" "}
                    {j.start_time.split(":")[0] +
                      ":" +
                      j.start_time.split(":")[1]}
                    -
                    {j.finish_time.split(":")[0] +
                      ":" +
                      j.finish_time.split(":")[1]}
                  </span>
                </span>
              </span>
            ))
          : "جلسه ای برای نمایش وجود ندارد"}
      </div>
      {active_session ? (
        <>
          <div className="edit-session-name-or-delete">
            <h2 className="semi-title">اطلاعات جلسه</h2>
            <h3 className="session-name-detail">
              <span className="session-num">
                جلسه {active_session.jalase_title}
              </span>
              {convert_days(active_session.week_day_name)} -
              {active_session.start_time.split(":")[0] +
                ":" +
                active_session.start_time.split(":")[1]}
              -
              {active_session.finish_time.split(":")[0] +
                ":" +
                active_session.finish_time.split(":")[1]}
            </h3>
            <div className="session-info-btns-wrapper">
              <input
                type="text"
                className="chose-title-input"
                placeholder={active_session.jalase_title}
                onInput={({ target }) => {
                  fill_input(target.value);
                }}
              />
              <div className="hold-btns">
                <span
                  className="submit-changes-btn"
                  onClick={() => {
                    update_session();
                  }}
                >
                  {pause ? <LittleLoading /> : "اعمال تغییرات"}
                </span>
                <span
                  className="submit-changes-btn delete-also"
                  onClick={() => {
                    delete_session();
                  }}
                >
                  {pause ? <LittleLoading /> : "حذف جلسه"}
                </span>
              </div>
            </div>
          </div>
          <div className="selected-session-wrapper">
            <h2 className="semi-title">فایل های جلسه</h2>
            <h3 className="session-name-detail">
              <span className="session-num">
                جلسه {active_session.jalase_title}
              </span>
              {convert_days(active_session.week_day_name)} -
              {active_session.start_time.split(":")[0] +
                ":" +
                active_session.start_time.split(":")[1]}
              -
              {active_session.finish_time.split(":")[0] +
                ":" +
                active_session.finish_time.split(":")[1]}
            </h3>
            <div className="session-uploaded-files">
              {edit_pause ? (
                <span className="loading-time">
                  <LittleLoading />
                </span>
              ) : (
                ""
              )}
              <div className="upload-detials-wrapper">
                <div className="detail-row">
                  <span className="detail-title">جزوه</span>
                  <span className="detail-file-link">
                    {active_session.pdfs
                      ? active_session.pdfs
                          .filter((p) => p.file_type === "نمونه جزوه")
                          .map((l, i) => (
                            <a
                              href={l.file_link}
                              target="_blank"
                              className="inside-item"
                              key={i++}
                            >
                              {l.title}
                            </a>
                          ))
                      : "ندارد"}
                  </span>
                  <span className="detail-delete">
                    {active_session.pdfs
                      ? active_session.pdfs
                          .filter((p) => p.file_type === "نمونه جزوه")
                          .map((l) => (
                            <span
                              onClick={() => {
                                delete_file(l.spf_id);
                              }}
                              className="inside-item"
                              key={l.spf_id}
                            >
                              حذف فایل X
                            </span>
                          ))
                      : ""}
                    {/* <span className="inside-item">حذف فایل X</span>
                  <span className="inside-item">حذف فایل X</span> */}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-title">تکلیف</span>
                  <span className="detail-file-link">
                    {active_session.pdfs
                      ? active_session.pdfs
                          .filter((p) => p.file_type === "نمونه تکلیف")
                          .map((l) => (
                            <a
                              href={l.file_link}
                              target="_blank"
                              className="inside-item"
                              key={l.spf_id}
                            >
                              {l.title}
                            </a>
                          ))
                      : "ندارد"}
                  </span>
                  <span className="detail-delete">
                    {active_session.pdfs
                      ? active_session.pdfs
                          .filter((p) => p.file_type === "نمونه تکلیف")
                          .map((l) => (
                            <span
                              onClick={() => {
                                delete_file(l.spf_id);
                              }}
                              className="inside-item"
                              key={l.spf_id}
                            >
                              حذف فایل X
                            </span>
                          ))
                      : ""}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-title">آزمون</span>
                  <span className="detail-file-link">
                    {active_session.pdfs
                      ? active_session.pdfs
                          .filter((p) => p.file_type === "نمونه آزمون")
                          .map((l) => (
                            <a
                              href={l.file_link}
                              target="_blank"
                              className="inside-item"
                              key={l.spf_id}
                            >
                              {l.title}
                            </a>
                          ))
                      : "ندارد"}
                  </span>
                  <span className="detail-delete">
                    {active_session.pdfs
                      ? active_session.pdfs
                          .filter((p) => p.file_type === "نمونه آزمون")
                          .map((l) => (
                            <span
                              onClick={() => {
                                delete_file(l.spf_id);
                              }}
                              className="inside-item"
                              key={l.spf_id}
                            >
                              حذف فایل X
                            </span>
                          ))
                      : ""}
                  </span>
                </div>
              </div>
              <div className="upload-btn-palce">
                <span
                  className="make-file-btn"
                  onClick={() => {
                    set_allow_upload(true);
                  }}
                >
                  تعریف فایل
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Session_edit;
