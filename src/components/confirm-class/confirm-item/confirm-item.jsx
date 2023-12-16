import React, { useEffect, useState } from "react";
import split_in_three from "../../functions/spilit_in_three";
import convert_to_persian from "../../functions/convert-to-persian";
import LittleLoading from "../../reusable/little-loading";
import axios from "axios";
import urls from "../../urls/urls";
const ConfirmItem = ({
  kelas,
  years,
  subjects,
  courses,
  set_not_approved_classes,
}) => {
  const [pause, setPause] = useState(false);
  const [pause2, setPause2] = useState(false);
  const delete_class = () => {
    const send_obj = {
      action: "delete",
      kelas_id: kelas.kelas_id,
    };
    setPause(true);
    axios
      .patch(
        "https://kadschool.com/backend/kad_api/admin_confirm_kelas",
        send_obj
      )
      .then((res) => {
        const { result, response, error } = res.data;
        console.log(res.data);
        if (result) {
          set_not_approved_classes(response);
          localStorage.setItem("n-approved", JSON.stringify(response));
        } else {
          console.log(error);
        }
        setPause(false);
      })
      .catch((e) => console.log(e.message));
  };
  const confirm_class = () => {
    const send_obj = {
      action: "confirm",
      kelas_id: kelas.kelas_id,
    };
    setPause2(true);
    axios
      .patch(urls.admin_confirm_kelas, send_obj)
      .then((res) => {
        const { result, response, error } = res.data;
        console.log(res.data);
        if (result) {
          set_not_approved_classes(response);
          localStorage.setItem("n-approved", JSON.stringify(response));
        } else {
          console.log(error);
        }
        setPause2(false);
      })
      .catch((e) => console.log(e.message));
  };
  return (
    <div className="kelas-item">
      <div className="first-row">
        <div className="col">
          <img
            src={kelas.image_link}
            alt={kelas.kelas_title ? kelas.kelas_title : "وارد نشده"}
            width={150}
            height={150}
          />
          <span className="text-item">
            <span className="item-title">عنوان کلاس :</span>
            <span className="item-text">
              {kelas.kelas_title ? kelas.kelas_title : "وارد نشده"}
            </span>
          </span>
        </div>
        <div className="col">
          <span className="text-item">
            <span className="item-title">استاد : </span>
            <span className="item-text">
              {kelas.ostad_name ? kelas.ostad_name : "وارد نشده"}
            </span>
          </span>
          <span className="text-item">
            <span className="item-title">دوره : </span>
            <span className="item-text">
              {kelas.parent_dore ? kelas.parent_dore : "وارد نشده"}
            </span>
          </span>
          <span className="text-item">
            <span className="item-title">درس : </span>
            <span className="item-text">
              {courses ? (
                courses.find((c) => c.course_id === kelas.course) ? (
                  courses.find((c) => c.course_id === kelas.course).name
                ) : (
                  "وارد نشده"
                )
              ) : (
                <LittleLoading />
              )}
            </span>
          </span>
          <span className="text-item">
            <span className="item-title">شناسه اسپات : </span>
            <span className="item-text">
              {kelas.spot_player_id ? kelas.spot_player_id : "وارد نشده"}
            </span>
          </span>
          <span className="text-item">
            <span className="item-title">نوع کلاس : </span>
            <span className="item-text">
              {kelas.in_run ? "آنلاین" : "آفلاین"}
            </span>
          </span>
        </div>
        <div className="col">
          <span className="text-item">
            <span className="item-title">پایه : </span>
            <span className="item-text">
              {years ? (
                years.find((y) => y.id === kelas.year) ? (
                  years.find((y) => y.id === kelas.year).name
                ) : (
                  "وارد نشده"
                )
              ) : (
                <LittleLoading />
              )}
            </span>
          </span>
          <span className="text-item">
            <span className="item-title">رشته ( ها ) : </span>
            <span className="item-text">
              {subjects ? (
                kelas.subject.map((s) => (
                  <span key={s}>
                    {subjects.find((su) => s === su.id)
                      ? subjects.find((su) => s === su.id).name
                      : "وارد نشده"}
                    ,
                  </span>
                ))
              ) : (
                <LittleLoading />
              )}
            </span>
          </span>
          <span className="text-item">
            <span className="item-title">قیمت اصلی : </span>
            <span className="item-text">
              {kelas.price
                ? split_in_three(convert_to_persian(kelas.price)) + "تومان"
                : "وارد نشده"}
            </span>
          </span>
          <span className="text-item">
            <span className="item-title">قیمت تخفیف خورده : </span>
            <span className="item-text">
              {kelas.discounted_price
                ? split_in_three(convert_to_persian(kelas.discounted_price)) +
                  "تومان"
                : "وارد نشده"}
            </span>
          </span>
        </div>
      </div>
      <div className="second-row">
        <span className="text-item">
          <span className="item-title">توضیحات کلاس : </span>
          <span className="item-text">
            {kelas.description.length !== 0
              ? kelas.description.map((d, i) => <p key={i++}>{d}</p>)
              : "توضیحات وارد نشده"}
          </span>
        </span>
      </div>
      <div className="action-btns">
        {pause2 ? (
          <span className="btn confirm-btn">
            <LittleLoading />
          </span>
        ) : (
          <span
            className="btn confirm-btn"
            onClick={() => {
              confirm_class();
            }}
          >
            تائید کلاس
          </span>
        )}
        {pause ? (
          <span className="btn delete-btn">
            <LittleLoading />
          </span>
        ) : (
          <span
            className="btn delete-btn"
            onClick={() => {
              delete_class();
            }}
          >
            حذف کلاس
          </span>
        )}
        {/* <span
          className="btn delete-btn"
          onClick={() => {
            delete_class();
          }}
        >
          حذف کلاس
        </span> */}
      </div>
    </div>
  );
};

export default ConfirmItem;
