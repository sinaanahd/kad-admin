import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LittleLoading from "../reusable/little-loading";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import axios from "axios";
import urls from "../urls/urls";
import { FaCopy } from "react-icons/fa";
import copy_to_clip_board from "../functions/copy-to-clip-board";
import ReloadBtn from "../reusable/reload-btn";
const make_full_text = (arr) => {
  let full_text = "";
  arr.forEach((item) => {
    full_text += item + "\n";
  });
  return full_text;
};
const SingleTeacher = () => {
  const [single_teacher, set_single_teacher] = useState(false);
  const [description, set_description] = useState(false);
  const [cv_items, set_cv_items] = useState(false);
  const [pause, set_pause] = useState(false);
  const page_slug = window.location.pathname.split("/")[2];
  useEffect(() => {
    if (!single_teacher) {
      find_teacher();
    }
  }, []);
  const find_teacher = () => {
    axios
      .get(`${urls.admin_teachers_page}/${page_slug}`)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          set_single_teacher(response);
          set_cv_items(response.cv);
          // console.log(response);
        } else {
          console.log(error);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const teaching_records = single_teacher
    ? single_teacher.cv.find((c) => c.title === "سوابق تدریس")
    : false;
  const educational_records = single_teacher
    ? single_teacher.cv.find((c) => c.title === "تحصیلات")
    : false;
  const previous_high_ranked_records = single_teacher
    ? single_teacher.cv.find((c) => c.title === "رتبه های برتر سال های گذشته")
    : false;
  const published_records = single_teacher
    ? single_teacher.cv.find((c) => c.title === "تالیفات")
    : false;
  const teaching_quality_records = single_teacher
    ? single_teacher.cv.find((c) => c.title === "ویژگی های آموزشی")
    : false;
  const exam_design_records = single_teacher
    ? single_teacher.cv.find((c) => c.title === "طراحی آزمون")
    : false;
  const convert_arr_to_str = (arr) => {
    if (typeof arr === "object") {
      let str = "";
      arr.forEach((item, i) => {
        if (arr.length - 1 !== i) {
          // console.log(arr.length - 1, i);
          str += item + "\n";
        } else {
          str += item;
        }
        i++;
      });
      return str;
    }
    return arr;
  };
  const change_text = (cv_items) => {
    const arr = [...cv_items];
    arr.forEach((ci) => {
      ci.text = convert_arr_to_str(ci.text);
    });
    return arr;
  };
  const send_data = () => {
    if (description || cv_items) {
      const new_cv = change_text([...cv_items]);
      const data = {
        description: description ? description : single_teacher.description,
        cv: new_cv,
      };
      set_single_teacher(false);
      set_pause(true);
      axios
        .patch(`${urls.admin_teachers_page}/${page_slug}`, data)
        .then((res) => {
          const { response, result, error } = res.data;
          if (result) {
            set_single_teacher(response);
            set_cv_items(response.cv);
            alert("تغییرات با موفقیت اعمال شد");
            window.location.reload();
          } else {
            alert("مشکلی پیش آمده ");
            console.log(error);
          }
          set_pause(false);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };
  const handle_description = (e) => {
    const value = e.target.value;
    if (value.length > 2) {
      set_description(value);
    } else {
      set_description(false);
    }
  };
  const handle_cv = (type, e) => {
    const value = e.target.value;
    if (value.length > 3) {
      const cv_items = handle_cv_change(handle_obj_title(type));
      const obj = {
        title: handle_obj_title(type),
        text: value,
      };
      cv_items.push(obj);
      set_cv_items(cv_items);
    } else {
      const cv_items = handle_cv_change(handle_obj_title(type));
      set_cv_items(cv_items);
    }
  };
  const handle_obj_title = (entry_title) => {
    switch (entry_title) {
      case 1:
        return "سوابق تدریس";
      case 2:
        return "تحصیلات";
      case 3:
        return "رتبه های برتر سال های گذشته";
      case 4:
        return "تالیفات";
      case 5:
        return "ویژگی های آموزشی";
      case 6:
        return "طراحی آزمون";
      default:
        return "نامعتبر";
    }
  };
  const handle_reload = () => {
    set_single_teacher(false);
    find_teacher();
  };
  const handle_cv_change = (type) => {
    let old_cv = [...cv_items];
    const index = old_cv.findIndex((c) => c.title === type);
    if (index !== -1) {
      old_cv.splice(index, 1);
    }
    return old_cv;
  };
  return (
    <>
      <Helmet>
        <title>{single_teacher ? single_teacher.fullname : ""}</title>
      </Helmet>
      <section className="page-wrapper single-teacher-page">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="main-wrapper">
            <div className="teacher-card">
              <img
                src={single_teacher ? single_teacher.image_link : ""}
                alt={single_teacher ? single_teacher.fullname : ""}
              />
              <h1 className="teachers-name">
                {single_teacher ? (
                  single_teacher.fullname.replace("استاد", "")
                ) : (
                  <LittleLoading />
                )}
              </h1>
            </div>
            <div className="edit-teachers-info">
              <div className="section-header">
                <h2 className="edit-title">ویرایش اطلاعات استاد</h2>
                {pause ? (
                  <button className="submit-changes-btn">
                    <LittleLoading />
                  </button>
                ) : (
                  <button className="submit-changes-btn" onClick={send_data}>
                    ثبت تغییرات
                  </button>
                )}

                <ReloadBtn click={handle_reload} />
              </div>
              <div className="all-inputs">
                <span className="input-wrapper full-width">
                  <span
                    className="copy-icon"
                    onClick={() => {
                      copy_to_clip_board(
                        single_teacher
                          ? single_teacher.description
                          : "توضیحات ندارد"
                      );
                    }}
                  >
                    <FaCopy />
                  </span>
                  <span className="input-title">توضیحات استاد : </span>
                  <span className="old-text">
                    {single_teacher ? (
                      single_teacher.description ? (
                        single_teacher.description
                      ) : (
                        "وارد نشده"
                      )
                    ) : (
                      <LittleLoading />
                    )}
                  </span>
                  <textarea
                    className="text-area-details"
                    placeholder="توضیحات را وارد کنید"
                    onInput={handle_description}
                  ></textarea>
                </span>
                <span className="input-wrapper">
                  <span
                    className="copy-icon"
                    onClick={() => {
                      copy_to_clip_board(
                        teaching_records.text
                          ? make_full_text(teaching_records.text)
                          : "توضیحات ندارد"
                      );
                    }}
                  >
                    <FaCopy />
                  </span>
                  <span className="input-title">سوابق تدریس : </span>
                  <span className="old-text">
                    {single_teacher ? (
                      teaching_records ? (
                        teaching_records.text.map((t, i) => (
                          <p key={i++} className="text">
                            {t}
                          </p>
                        ))
                      ) : (
                        "وارد نشده"
                      )
                    ) : (
                      <LittleLoading />
                    )}
                  </span>
                  <textarea
                    onInput={(e) => {
                      handle_cv(1, e);
                    }}
                    className="text-area-details"
                    placeholder="سوابق تدریس را وارد کنید"
                  ></textarea>
                </span>
                <span className="input-wrapper">
                  <span
                    className="copy-icon"
                    onClick={() => {
                      copy_to_clip_board(
                        educational_records.text
                          ? make_full_text(educational_records.text)
                          : "توضیحات ندارد"
                      );
                    }}
                  >
                    <FaCopy />
                  </span>
                  <span className="input-title">تحصیلات : </span>
                  <span className="old-text">
                    {single_teacher ? (
                      educational_records ? (
                        educational_records.text.map((t, i) => (
                          <p key={i++} className="text">
                            {t}
                          </p>
                        ))
                      ) : (
                        "وارد نشده"
                      )
                    ) : (
                      <LittleLoading />
                    )}
                  </span>
                  <textarea
                    onInput={(e) => {
                      handle_cv(2, e);
                    }}
                    className="text-area-details"
                    placeholder="تحصیلات را وارد کنید"
                  ></textarea>
                </span>
                <span className="input-wrapper">
                  <span
                    className="copy-icon"
                    onClick={() => {
                      copy_to_clip_board(
                        previous_high_ranked_records.text
                          ? make_full_text(previous_high_ranked_records.text)
                          : "توضیحات ندارد"
                      );
                    }}
                  >
                    <FaCopy />
                  </span>
                  <span className="input-title">
                    رتبه های برتر سال های گذشته :{" "}
                  </span>
                  <span className="old-text">
                    {single_teacher ? (
                      previous_high_ranked_records ? (
                        previous_high_ranked_records.text.map((t, i) => (
                          <p key={i++} className="text">
                            {t}
                          </p>
                        ))
                      ) : (
                        "وارد نشده"
                      )
                    ) : (
                      <LittleLoading />
                    )}
                  </span>
                  <textarea
                    onInput={(e) => {
                      handle_cv(3, e);
                    }}
                    className="text-area-details"
                    placeholder="رتبه های برتر سال های گذشته را وارد کنید"
                  ></textarea>
                </span>
                <span className="input-wrapper">
                  <span
                    className="copy-icon"
                    onClick={() => {
                      copy_to_clip_board(
                        published_records.text
                          ? make_full_text(published_records.text)
                          : "توضیحات ندارد"
                      );
                    }}
                  >
                    <FaCopy />
                  </span>
                  <span className="input-title">تالیفات : </span>
                  <span className="old-text">
                    {single_teacher ? (
                      published_records ? (
                        published_records.text.map((t, i) => (
                          <p key={i++} className="text">
                            {t}
                          </p>
                        ))
                      ) : (
                        "وارد نشده"
                      )
                    ) : (
                      <LittleLoading />
                    )}
                  </span>
                  <textarea
                    onInput={(e) => {
                      handle_cv(4, e);
                    }}
                    className="text-area-details"
                    placeholder="تالیفات را وارد کنید"
                  ></textarea>
                </span>
                <span className="input-wrapper">
                  <span
                    className="copy-icon"
                    onClick={() => {
                      copy_to_clip_board(
                        teaching_quality_records.text
                          ? make_full_text(teaching_quality_records.text)
                          : "توضیحات ندارد"
                      );
                    }}
                  >
                    <FaCopy />
                  </span>
                  <span className="input-title">ویژگی های آموزشی : </span>
                  <span className="old-text">
                    {single_teacher ? (
                      teaching_quality_records ? (
                        teaching_quality_records.text.map((t, i) => (
                          <p key={i++} className="text">
                            {t}
                          </p>
                        ))
                      ) : (
                        "وارد نشده"
                      )
                    ) : (
                      <LittleLoading />
                    )}
                  </span>
                  <textarea
                    onInput={(e) => {
                      handle_cv(5, e);
                    }}
                    className="text-area-details"
                    placeholder="ویژگی های آموزشی را وارد کنید"
                  ></textarea>
                </span>
                <span className="input-wrapper">
                  <span
                    className="copy-icon"
                    onClick={() => {
                      copy_to_clip_board(
                        exam_design_records.text
                          ? make_full_text(exam_design_records.text)
                          : "توضیحات ندارد"
                      );
                    }}
                  >
                    <FaCopy />
                  </span>
                  <span className="input-title">طراحی آزمون : </span>
                  <span className="old-text">
                    {single_teacher ? (
                      exam_design_records ? (
                        exam_design_records.text.map((t, i) => (
                          <p key={i++} className="text">
                            {t}
                          </p>
                        ))
                      ) : (
                        "وارد نشده"
                      )
                    ) : (
                      <LittleLoading />
                    )}
                  </span>
                  <textarea
                    onInput={(e) => {
                      handle_cv(6, e);
                    }}
                    className="text-area-details"
                    placeholder="طراحی آزمون را وارد کنید"
                  ></textarea>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleTeacher;
