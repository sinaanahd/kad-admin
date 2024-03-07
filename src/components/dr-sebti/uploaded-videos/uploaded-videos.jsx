import React, { useState } from "react";
import convert_to_persian from "../../functions/convert-to-persian";
import AparatVideo from "../../reusable/aparat-video/aparat-video";
import { FaTrash } from "react-icons/fa";
const UploadedVideo = ({ v, delete_video, videos, change_sort }) => {
  const [in_change, set_in_change] = useState(false);
  const [new_place, set_new_place] = useState(false);
  const handle_new_place = (e) => {
    const value = parseInt(e.target.value);
    if (v.place !== value && value <= videos.length) {
      set_new_place(value);
    } else {
      set_new_place(false);
    }
  };
  const handle_change_sort = () => {
    if (new_place) {
      change_sort(v.id, new_place);
      set_in_change(false);
    } else {
      alert("مکان انتخاب شده درست نمی باشد");
    }
  };
  const submit_with_key = (e) => {
    const key = e.keyCode;
    if (key === 13) {
      handle_change_sort();
    }
  };
  return (
    <div className="dr-video" key={v.id}>
      <h2 className="video-title">{v.title}</h2>
      <div className="block-need-div">
        <AparatVideo src={v.iframe} />
      </div>
      <button
        className="trash-icon"
        onClick={() => {
          delete_video(v.id);
        }}
      >
        <FaTrash />
      </button>
      <button
        className="video-place-number"
        onClick={() => {
          set_in_change(v.id);
        }}
      >
        {convert_to_persian(v.place)}
      </button>
      {in_change === v.id && (
        <div className="change-place-inputs">
          <input
            type="number"
            placeholder="مکان جدید"
            className="new-pos-input"
            onKeyDown={submit_with_key}
            onInput={(e) => {
              handle_new_place(e);
            }}
          />
          <button
            className="submit-new-place-btn"
            onClick={() => {
              handle_change_sort();
            }}
          >
            ثبت
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadedVideo;
