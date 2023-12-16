import React, { useState } from "react";
import copy_to_clip_board from "../../../functions/copy-to-clip-board";
import check_img from "../../../../asset/images/checked.webp";
import uncheck_img from "../../../../asset/images/unchecked.webp";
import LittleLoading from "../../../reusable/little-loading";
import axios from "axios";
import urls from "../../../urls/urls";
const UserClass = ({
  kelasses,
  k,
  show_copied,
  single_user,
  setSingle_user,
  setAll_users,
  get_all_users,
  all_users,
}) => {
  const [pause, setPause] = useState(false);
  const controll_accsess = (entry) => {
    setPause(true);
    const { kelas_id } = k;
    const access = entry;
    const { user_id } = single_user;
    const send_obj = {
      user_id: user_id,
      accesses: [{ kelas_id: kelas_id, access: access }],
    };
    axios
      .patch(urls.admin_edit_accesses, send_obj)
      .then((res) => {
        console.log(res.data);
        const single_user = res.data;
        setSingle_user(single_user);
        setPause(false);
        change_main_data(single_user.user_id, single_user);
      })
      .catch((e) => console.log(e.message));
    //console.log(send_obj);
  };
  const change_main_data = (id, user) => {
    const new_all_users = [...all_users];
    const index = new_all_users.findIndex((u) => u.user_id === id);
    new_all_users[index] = user;
    setAll_users(new_all_users);
    localStorage.setItem("all_users", JSON.stringify(new_all_users));
    get_all_users();
  };
  return (
    <div className="kelas-details-content">
      <span className="kelas-detail-item first-col">
        {
          {
            ...kelasses.find((kelas) => kelas.kelas_id === k.kelas_id),
          }.kelas_title_and_ostad_name
        }
      </span>
      <span className="kelas-detail-item">
        {{
          ...kelasses.find((kelas) => kelas.kelas_id === k.kelas_id),
        }.skyRoom_link ? (
          <span
            className="inside-item copy"
            onClick={() => {
              copy_to_clip_board(
                {
                  ...kelasses.find((kelas) => kelas.kelas_id === k.kelas_id),
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
          <span className="inside-item img-text">
            <img src={check_img} width={16} height={16} alt="دسترسی دارد" />

            {pause ? (
              <span className="accssess-control">
                <LittleLoading />
              </span>
            ) : (
              <span
                className="accssess-control"
                onClick={() => {
                  controll_accsess(false);
                }}
              >
                لغو دسترسی
              </span>
            )}
          </span>
        ) : (
          <span className="inside-item  img-text">
            <img src={uncheck_img} width={16} height={16} alt="دسترسی ندارد" />
            {pause ? (
              <span className="accssess-control">
                <LittleLoading />
              </span>
            ) : (
              <span
                className="accssess-control cancel"
                onClick={() => {
                  controll_accsess(true);
                }}
              >
                تایید دسترسی
              </span>
            )}
          </span>
        )}
      </span>
    </div>
  );
};

export default UserClass;
