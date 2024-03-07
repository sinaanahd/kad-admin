import React, { useState } from "react";
import axios from "axios";
import urls from "../../urls/urls";
import AparatVideo from "../../reusable/aparat-video/aparat-video";
import LittleLoading from "../../reusable/little-loading";
const MakeNewVideo = ({ get_all_videos, set_videos }) => {
  const [video_src, set_video_src] = useState(false);
  const [video_src_err, set_video_src_err] = useState(false);
  const [title, set_title] = useState(false);
  const [title_err, set_title_err] = useState(false);
  const [pause, set_pause] = useState(false);
  const post_new_video = (e) => {
    if (video_src && title) {
      const send_obj = {
        title: title,
        iframe: video_src,
      };
      set_pause(true);
      axios
        .post(urls.dr_sebti_videos, send_obj)
        .then((res) => {
          const { result, response, error } = res.data;
          set_pause(false);
          if (result && response) {
            set_videos(false);
            get_all_videos();
          } else {
            alert("مشکلی پیش آمده");
            console.log(error);
          }
        })
        .catch((e) => {
          console.log(e);
          alert("مشکلی پیش آمده");
          set_pause(false);
        });
    } else {
      alert("اطلاعات کامل وارد نشده است");
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
  const handle_title = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      set_title(false);
      set_title_err("عنوان وارد شده کوتاه است");
    } else {
      set_title(value);
      set_title_err(false);
    }
  };
  return (
    <div className="make-new-video-wrapper">
      <h2 className="make-new-video-title">اضافه کردن ویدئو جدید</h2>
      <div className="post-video-inputs">
        <input
          type="text"
          placeholder="عنوان ویدئو جدید"
          onInput={handle_title}
        />
        <input
          type="text"
          placeholder="لینک iframe ویدئو آپارات"
          onInput={handle_video_src}
        />
      </div>
      {video_src_err && <span className="video-errors">{video_src_err}</span>}
      {title_err && <span className="video-errors">{title_err}</span>}
      {video_src ? (
        <div className="ap-block-div">
          ویدئو بارگذاری شده :
          <br />
          <AparatVideo src={video_src} />
        </div>
      ) : (
        <></>
      )}
      <button
        className="submit-new-video-btn"
        disabled={pause && title_err && video_src_err}
        onClick={() => {
          post_new_video();
        }}
      >
        {pause ? <LittleLoading /> : "بارگذاری ویدئو"}
      </button>
    </div>
  );
};

export default MakeNewVideo;
