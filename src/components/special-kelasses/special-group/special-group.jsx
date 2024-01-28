import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import axios from "axios";
import urls from "../../urls/urls";
import LittleLoading from "../../reusable/little-loading";
const SpecialGroup = ({ kelasses, type, setter_func }) => {
  const { kelasses: all_kelasses } = useContext(DataContext);
  const [to_delete_selected, set_to_delete_selected] = useState([]);
  const [show_choose_kelasses, set_show_choose_kelasses] = useState(false);
  const [to_add_kelasses, set_to_add_kelasses] = useState([]);
  const [pause, set_pause] = useState(false);
  const [delete_pause, set_delete_pause] = useState(false);
  const handle_select_to_delete = (id) => {
    const old_selected_ids = [...to_delete_selected];
    if (!old_selected_ids.includes(id)) {
      old_selected_ids.push(id);
    } else {
      const index = old_selected_ids.indexOf(id);
      old_selected_ids.splice(index, 1);
    }
    set_to_delete_selected(old_selected_ids);
  };
  const already_in_kelasses = kelasses ? kelasses.map((k) => k.kelas_id) : [];
  const kelasses_to_render =
    kelasses && all_kelasses && already_in_kelasses
      ? all_kelasses.filter((k) => !already_in_kelasses.includes(k.kelas_id))
      : [];
  const handle_select_to_add = (id) => {
    const old_selected_ids = [...to_add_kelasses];
    if (!old_selected_ids.includes(id)) {
      old_selected_ids.push(id);
    } else {
      const index = old_selected_ids.indexOf(id);
      old_selected_ids.splice(index, 1);
    }
    set_to_add_kelasses(old_selected_ids);
  };
  const send_add_kelas_request = () => {
    const all_ids = already_in_kelasses.concat(to_add_kelasses);
    set_pause(true);
    axios
      .patch(`${urls.specialKelasesList}${type}`, { ids: all_ids })
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          setter_func(response);
          set_show_choose_kelasses(false);
          set_pause(false);
          set_to_add_kelasses([]);
          alert("با موفقیت انجام شد");
        } else {
          alert("مشکلی پیش آمده");
          console.log(error);
          set_pause(false);
        }
      })
      .catch((e) => {
        alert("مشکلی پیش آمده");
        console.log(e);
      });
  };
  const request_delete = () => {
    const remains_kelasses = [];
    already_in_kelasses.forEach((k) => {
      if (!to_delete_selected.includes(k)) {
        remains_kelasses.push(k);
      }
    });
    set_delete_pause(true);
    axios
      .patch(`${urls.specialKelasesList}${type}`, { ids: remains_kelasses })
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          setter_func(response);
          set_show_choose_kelasses(false);
          set_delete_pause(false);
          set_to_delete_selected([]);
          alert("با موفقیت انجام شد");
        } else {
          alert("مشکلی پیش آمده");
          console.log(error);
          set_delete_pause(false);
        }
      })
      .catch((e) => {
        alert("مشکلی پیش آمده");
        console.log(e);
      });
  };
  return (
    <>
      {kelasses.length !== 0
        ? kelasses.map((k) => (
            <div
              className={
                to_delete_selected.includes(k.kelas_id)
                  ? "kelas-wrapper selected"
                  : "kelas-wrapper"
              }
              key={k.kelas_id}
              onClick={() => {
                handle_select_to_delete(k.kelas_id);
              }}
            >
              <img src={k.image_link} alt={k.kelas_title} />
              <span className="kelas-title-name">
                {k.kelas_title_and_ostad_name}
              </span>
              <span className="kelas-name">{k.kelas_title}</span>
            </div>
          ))
        : "موردی برای نمایش وجود ندارد"}

      <div className="kelas-btns">
        <button
          className="choose-new-classes-btn"
          onClick={() => {
            set_show_choose_kelasses(!show_choose_kelasses);
          }}
        >
          {show_choose_kelasses ? "بستن" : "انتخاب کلاس جدید"}
        </button>
        {delete_pause ? (
          <button className="delete-selected-classes-btn">
            <LittleLoading />
          </button>
        ) : (
          <button
            className="delete-selected-classes-btn"
            onClick={() => {
              request_delete();
            }}
          >
            حذف کلاس های انتخاب شده
          </button>
        )}
      </div>
      {show_choose_kelasses ? (
        kelasses_to_render ? (
          <>
            {kelasses_to_render.map((k) => (
              <div
                className={
                  to_add_kelasses.includes(k.kelas_id)
                    ? "kelas-wrapper to-choose choosen"
                    : "kelas-wrapper to-choose"
                }
                key={k.kelas_id}
                onClick={() => {
                  handle_select_to_add(k.kelas_id);
                }}
              >
                <img src={k.image_link} alt={k.kelas_title} />
                <span className="kelas-title-name">
                  {k.kelas_title_and_ostad_name}
                </span>
                <span className="kelas-name">{k.kelas_title}</span>
              </div>
            ))}
            <div className="kelas-btns">
              {pause ? (
                <button className="submit-new-classes-btn">
                  <LittleLoading />
                </button>
              ) : (
                <button
                  className="submit-new-classes-btn"
                  onClick={() => {
                    send_add_kelas_request();
                  }}
                >
                  اضافه کردن کلاس ها
                </button>
              )}
            </div>
          </>
        ) : (
          "در حال بارگذاری"
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default SpecialGroup;
