import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import axios from "axios";
import urls from "../urls/urls";
import ReloadBtn from "../reusable/reload-btn";
import LittleLoading from "../reusable/little-loading";
import AparatVideo from "../reusable/aparat-video/aparat-video";
import { FaTrash } from "react-icons/fa6";
import convert_to_persian from "../functions/convert-to-persian";
import MakeNewVideo from "./make-new-video/make-new-video";
import UploadedVideo from "./uploaded-videos/uploaded-videos";

const videos_data = JSON.parse(localStorage.getItem("videos"))
  ? JSON.parse(localStorage.getItem("videos"))
  : false;
const DrSebti = () => {
  const [videos, set_videos] = useState(videos_data);
  const [change_in_action, set_change_in_action] = useState(false);
  const [pause, set_pause] = useState(false);
  const get_all_videos = (e) => {
    axios
      .get(urls.dr_sebti_videos)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          const soreted = sort_videos_by_place(response.toReversed());
          set_videos(soreted);
          localStorage.setItem("videos", JSON.stringify(soreted));
        } else {
          console.log(error);
          alert("مشکلی در دریافت ویدئو‌ها بوجود آمده است");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("مشکلی در دریافت ویدئو‌ها بوجود آمده است");
      });
  };
  useEffect(() => {
    get_all_videos();
  }, []);
  const sort_videos_by_place = (arr) => {
    const sorted = [];
    for (let i = 1; i <= arr.length; i++) {
      const in_place = arr.find((item) => item.place === i);
      if (in_place) sorted.push(in_place);
    }
    return sorted;
  };
  const handle_reload_btn = () => {
    set_videos(false);
    get_all_videos();
  };
  const delete_video = (id) => {
    const send_obj = {
      action: "delete",
      params: [id],
    };
    axios
      .patch(urls.dr_sebti_videos, send_obj)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          console.log(response);
          set_videos(response);
        } else {
          console.log(error);
          alert("مشکلی پیش آمده");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("مشکلی پیش آمده");
      });
  };
  const change_sort = (id, place) => {
    set_change_in_action(true);
    const ref_videos = [...videos];
    const video = ref_videos.find((v) => v.id === id);
    const swap_video = ref_videos.find((v) => v.place === place);
    if (video.id !== swap_video) {
      swap_video.place = video.place;
      video.place = place;
    } else {
      alert("مکان نمایش انتخاب شده با مکان قبلی تفاوتی ندارد");
    }
    const sorted = sort_videos_by_place(ref_videos);
    set_videos(sorted);
  };
  const request_change_sort = () => {
    set_pause(true);
    const send_obj = {
      action: "edit",
      params: [...videos],
    };
    axios
      .patch(urls.dr_sebti_videos, send_obj)
      .then((res) => {
        set_pause(false);
        const { result, response, error } = res.data;
        if (result) {
          const sorted = sort_videos_by_place(response);
          set_videos(sorted);
          localStorage.setItem("videos", JSON.stringify(sorted));
          set_change_in_action(false);
        } else {
          console.log(error);
          alert("تغیرات ذخیره نشد");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("مشکلی پیش آمده");
      });
  };
  return (
    <>
      <Helmet>
        <title>ویدئو‌های دکتر سبطی</title>
      </Helmet>
      <section className="dr-sebti-videos-wrapper page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="dr-sebti-videos mm-width">
            <h1 className="title">ویدئو‌های دکتر سبطی</h1>
            <ReloadBtn click={handle_reload_btn} />
            <MakeNewVideo
              get_all_videos={get_all_videos}
              set_videos={set_videos}
            />
            {change_in_action && (
              <button
                className="submit-order-change-btn"
                onClick={() => {
                  request_change_sort();
                }}
                disabled={pause}
              >
                {pause ? <LittleLoading /> : "ثبت تغییرات چیدمان"}
              </button>
            )}
            <div className="all-videos">
              {videos ? (
                videos.map((v) => (
                  <UploadedVideo
                    v={v}
                    key={v.id}
                    delete_video={delete_video}
                    videos={videos}
                    change_sort={change_sort}
                  />
                ))
              ) : (
                <LittleLoading />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DrSebti;
