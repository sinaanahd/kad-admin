import React, { useContext, useState } from "react";
import AparatVideo from "../../reusable/aparat-video/aparat-video";
import { DataContext } from "../../context/DataContext";
import axios from "axios";
import urls from "../../urls/urls";
import LittleLoading from "../../reusable/little-loading";
const AddVideo = ({ kelas }) => {
  const { teachers } = useContext(DataContext);
  const [video_kind, set_video_kind] = useState(false);
  const [title, set_title] = useState(false);
  const [title_err, set_title_err] = useState(false);
  const [video_src, set_video_src] = useState(false);
  const [video_src_err, set_video_src_err] = useState(false);
  const [pause, set_pause] = useState(false);
  const find_teacher = () => {
    const teacher = teachers.find((t) => t.fullname === kelas.ostad_name);
    if (teachers) {
      return teacher.teacher_id;
    } else {
      return false;
    }
  };
  const handle_title = (e) => {
    const value = e.target.value;
    if (value.length > 3) {
      set_title(value);
      set_title_err(false);
    } else {
      set_title(false);
      set_title_err("تایتل وارد شده کوتاه است");
    }
  };
  const handle_video_src = (e) => {
    const value = e.target.value;
    if (value.startsWith("https://") && value.endsWith("/frame")) {
      set_video_src(value);
      set_video_src_err(false);
    } else if (value.length === 0) {
      set_video_src(false);
      set_video_src_err("سورس ویدئو وارد نشده");
    } else {
      set_video_src(false);
      set_video_src_err("سورس وارد شده درست نیست");
    }
  };
  const send_data = () => {
    if (title && video_src && video_kind) {
      const teacher_id = find_teacher();
      // const teacher_id = 15205;
      set_pause(true);
      if (teacher_id) {
        const send_obj = {
          title: title,
          kelas_id: kelas.kelas_id,
          teacher_id: teacher_id,
          file_type: video_kind,
          file_link: video_src,
        };
        console.log(send_obj);
        axios
          .post(urls.admin_sample_video_file, send_obj)
          .then((res) => {
            const { result, response, error } = res.data;
            if (result) {
              console.log(response);
              alert("با موفقیت اضافه شد");
              window.location.reload();
            } else {
              console.log(error);
              alert("مشکلی پیش آمده");
            }
            set_pause(false);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        alert("کمی منتظر بمانید و دوباره امتحان کنید");
      }
    }
  };
  return (
    <section className="add-video-wrapper-part">
      <h2 className="add-voideo-title">اضافه کردن ویدئو</h2>
      <div className="all-add-video-inputs">
        <span className="add-video-input-wrapper">
          <span className="add-video-input-text">عنوان ویدئو : </span>
          <input
            type="text"
            placeholder=" عنوان ویدئو را وارد کنید"
            onInput={handle_title}
          />
        </span>
        <span className="add-video-input-wrapper">
          <span className="add-video-input-text">سورس ویدئو : </span>
          <input
            type="text"
            placeholder=" سورس ویدئو را وارد کنید"
            onInput={handle_video_src}
          />
        </span>
        <span className="add-video-input-wrapper">
          <span className="add-video-input-text">نوع ویدئو : </span>
          <span className="video-type-btns">
            <button
              className={
                video_kind === "نمونه تدریس"
                  ? "video-type-btn active"
                  : "video-type-btn"
              }
              onClick={() => {
                set_video_kind("نمونه تدریس");
              }}
            >
              نمونه تدریس
            </button>
            <button
              className={
                video_kind === "معرفی کلاس"
                  ? "video-type-btn active"
                  : "video-type-btn"
              }
              onClick={() => {
                set_video_kind("معرفی کلاس");
              }}
            >
              معرفی کلاس
            </button>
            <button
              className={
                video_kind === "کلاس رایگان"
                  ? "video-type-btn active"
                  : "video-type-btn"
              }
              onClick={() => {
                set_video_kind("کلاس رایگان");
              }}
            >
              کلاس رایگان
            </button>
          </span>
        </span>
        <div className="aparat-needed-div">
          <span className="upload-video-text">ویدئو باگذاری شده : </span>
          {video_src ? <AparatVideo src={video_src} /> : "ویدئو وارد نشده است"}
        </div>
        <div className="upload-video-errors">
          <span className="video-err">{title_err ? title_err : ""}</span>
          <span className="video-err">
            {video_src_err ? video_src_err : ""}
          </span>
        </div>
      </div>
      <span className="button-wrapper">
        {pause ? (
          <button className="submit-add-video-btn">
            <LittleLoading />
          </button>
        ) : (
          <button className="submit-add-video-btn" onClick={send_data}>
            اضافه کردن ویدئو
          </button>
        )}
      </span>
    </section>
  );
};

export default AddVideo;

// user
// title
// src
// video type

// api
// kelas_id
// ostad_id
// title
// link
// video type
