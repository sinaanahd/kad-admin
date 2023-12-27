import React, { useState } from "react";
import copy_to_clip_board from "../../functions/copy-to-clip-board";
import LittleLoading from "../../reusable/little-loading";

import UserClass from "./user-class/user-class";

const UserClasses = ({
  single_user,
  make_spot_liecence,
  show_copied,
  liecene_pause,
  not_user_kelasses,
  kelasses,
  add_class,
  added_classes,
  remove_class,
  setShow_classes,
  show_classes,
  setSingle_user,
  setAll_users,
  get_all_users,
  all_users,
}) => {
  return (
    <div className="kelas-details-wrapper">
      <span className="title">اطلاعات کلاس های کاربر</span>
      <div className="kelas-details">
        <div className="sky-room-details">
          <div className="sky-room-item">
            <span className="sky-title">شناسه کاربری اسکای‌روم</span>
            <span
              className={
                single_user
                  ? single_user.skyRoom_username
                    ? "sky-box-to-copy copy"
                    : "sky-box-to-copy"
                  : "sky-box-to-copy"
              }
              onClick={() => {
                if (single_user) {
                  if (single_user.skyRoom_username) {
                    copy_to_clip_board(single_user.skyRoom_username);
                    show_copied();
                  }
                }
              }}
            >
              {single_user ? (
                single_user.skyRoom_username ? (
                  "کپی!"
                ) : (
                  "ندارد"
                )
              ) : (
                <LittleLoading />
              )}
            </span>
          </div>
          <div className="sky-room-item">
            <span className="sky-title">پسوورد اسکای‌روم</span>
            <span
              className={
                single_user
                  ? single_user.skyRoom_password
                    ? "sky-box-to-copy copy"
                    : "sky-box-to-copy"
                  : "sky-box-to-copy"
              }
              onClick={() => {
                if (single_user) {
                  if (single_user.skyRoom_password) {
                    copy_to_clip_board(single_user.skyRoom_password);
                    show_copied();
                  }
                }
              }}
            >
              {single_user ? (
                single_user.skyRoom_password ? (
                  "کپی!"
                ) : (
                  "ندارد"
                )
              ) : (
                <LittleLoading />
              )}
            </span>
          </div>
          <div className="sky-room-item">
            <span className="sky-title">لایسنس اسپات پلیر</span>
            <span
              className={
                single_user
                  ? single_user.spot_license
                    ? "sky-box-to-copy copy"
                    : "sky-box-to-copy"
                  : "sky-box-to-copy"
              }
              onClick={() => {
                if (single_user) {
                  if (single_user.spot_license) {
                    copy_to_clip_board(single_user.spot_license);
                    show_copied();
                  }
                }
              }}
            >
              {single_user ? (
                single_user.spot_license ? (
                  "کپی!"
                ) : (
                  "ندارد"
                )
              ) : (
                <LittleLoading />
              )}
            </span>
          </div>
          <div className="sky-room-item">
            <span
              className="get-sky-data"
              onClick={() => {
                if (!liecene_pause) {
                  make_spot_liecence(single_user.user_id);
                }
              }}
            >
              {liecene_pause ? <LittleLoading /> : "ایجاد لایسنس اسپات"}
            </span>
          </div>
        </div>
        <div className="kelas-details-heder">
          <span className="kelas-detail-item first-col">کلاس های کاربر</span>
          <span className="kelas-detail-item">لینک اسکای روم</span>
          <span className="kelas-detail-item">لینک مستقیم اسکای روم</span>
          <span className="kelas-detail-item">وضعیت دسترسی</span>
        </div>
        <div className="kelas-details-contents-wrapper">
          {single_user ? (
            single_user.kelases.length !== 0 ? (
              single_user.kelases.map((k, i) => (
                <UserClass
                  key={i++}
                  show_copied={show_copied}
                  kelas_data={k}
                  single_user={single_user}
                  setSingle_user={setSingle_user}
                  setAll_users={setAll_users}
                  get_all_users={get_all_users}
                  all_users={all_users}
                />
                // <div key={i++} className="kelas-details-content">
                //   <span className="kelas-detail-item first-col">
                //     {
                //       {
                //         ...kelasses.find(
                //           (kelas) => kelas.kelas_id === k.kelas_id
                //         ),
                //       }.kelas_title_and_ostad_name
                //     }
                //   </span>
                //   <span className="kelas-detail-item">
                //     {{
                //       ...kelasses.find(
                //         (kelas) => kelas.kelas_id === k.kelas_id
                //       ),
                //     }.skyRoom_link ? (
                //       <span
                //         className="inside-item copy"
                //         onClick={() => {
                //           copy_to_clip_board(
                //             {
                //               ...kelasses.find(
                //                 (kelas) => kelas.kelas_id === k.kelas_id
                //               ),
                //             }.skyRoom_link
                //           );
                //           show_copied();
                //         }}
                //       >
                //         کپی
                //       </span>
                //     ) : (
                //       <span className="inside-item">ندارد</span>
                //     )}
                //   </span>
                //   <span className="kelas-detail-item">
                //     {k.sky_direct_link ? (
                //       <span
                //         className="inside-item copy"
                //         onClick={() => {
                //           copy_to_clip_board(k.sky_direct_link);
                //           show_copied();
                //         }}
                //       >
                //         کپی
                //       </span>
                //     ) : (
                //       <span className="inside-item">ندارد</span>
                //     )}
                //   </span>
                //   <span className="kelas-detail-item check-box">
                //     {k.has_access ? (
                //       <span className="inside-item">
                //         <img
                //           src={check_img}
                //           width={16}
                //           height={16}
                //           alt="دسترسی دارد"
                //         />
                //         <span className="accssess-control">لغو دسترسی</span>
                //       </span>
                //     ) : (
                //       <span className="inside-item">
                //         <img
                //           src={uncheck_img}
                //           width={16}
                //           height={16}
                //           alt="دسترسی ندارد"
                //         />
                //         <span className="accssess-control cancell">
                //           تایید دسترسی
                //         </span>
                //       </span>
                //     )}
                //   </span>
                // </div>
              ))
            ) : (
              "موردی برای نمایش وجود ندارد"
            )
          ) : (
            <LittleLoading />
          )}
        </div>
        {/* <div className="add-kelas-wrapper">
          <span className="add-title">ثبت‌نام کابر</span>
          <div className="active-kelasses">
            {added_classes.length !== 0
              ? added_classes.map((k) => (
                  <div key={k.kelas_id} className="active-kelas">
                    <span className="kelas-title">
                      {k.kelas_title_and_ostad_name}
                    </span>
                    <img
                      src={cross_svg}
                      alt="حذف"
                      onClick={() => {
                        remove_class(k);
                      }}
                    />
                  </div>
                ))
              : "موردی انتخاب نشده"}
          </div>
          <div className="add-kelas-wrapper">
            <div className="add-kelas-option">
              <span className="add-text">+ اضافه کردن کلاس</span>
              <img
                src={arrow_icon}
                alt="بازکردن"
                onClick={() => {
                  setShow_classes(!show_classes);
                }}
              />
            </div>
            {show_classes ? (
              <div className="kelas-options">
                {not_user_kelasses ? (
                  not_user_kelasses.map((k) => (
                    <span
                      key={k.kelas_id}
                      className={
                        added_classes.indexOf(k) !== -1
                          ? "kelas-option added"
                          : "kelas-option"
                      }
                      onClick={() => {
                        add_class(k);
                      }}
                    >
                      {k.kelas_title_and_ostad_name}
                    </span>
                  ))
                ) : (
                  <LittleLoading />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UserClasses;
