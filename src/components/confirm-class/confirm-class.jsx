import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import LittleLoading from "../reusable/little-loading";
import { DataContext } from "../context/DataContext";
import ConfirmItem from "./confirm-item/confirm-item";
const ConfirmClass = () => {
  const {
    not_approved_classes,
    subjects,
    courses,
    years,
    set_not_approved_classes,
  } = useContext(DataContext);
  return (
    <>
      <Helmet>
        <title>کلاس های تایید نشده</title>
      </Helmet>
      <section className="confirm-class page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="page-header">
            <h1 className="page-title">کلاس های تایید نشده : </h1>
            <span className="un-confirmed-count">
              ({" "}
              {not_approved_classes ? (
                not_approved_classes.length
              ) : (
                <LittleLoading />
              )}{" "}
              کلاس )
            </span>
          </div>
          <div className="classes-main-area">
            {not_approved_classes ? (
              not_approved_classes.length !== 0 ? (
                not_approved_classes.map((k) => (
                  <ConfirmItem
                    key={k.kelas_id}
                    courses={courses}
                    years={years}
                    subjects={subjects}
                    kelas={k}
                    set_not_approved_classes={set_not_approved_classes}
                  />
                ))
              ) : (
                "کلاسی برای تایید وجود ندارد"
              )
            ) : (
              <LittleLoading />
            )}

            {/* <div className="kelas-item">
              <div className="first-row">
                <div className="col">
                  <img
                    src="https://kadschool.com/media/Kad_Kelas_Photos/Kelas_علوم_و_فنون_استاد_سبطی.webp"
                    alt=""
                    width={150}
                    height={150}
                  />
                  <span className="text-item">
                    <span className="item-title">عنوان کلاس :</span>
                    <span className="item-text">فلسفه و منطق</span>
                  </span>
                </div>
                <div className="col">
                  <span className="text-item">
                    <span className="item-title">استاد : </span>
                    <span className="item-text">هامون سبطی</span>
                  </span>
                  <span className="text-item">
                    <span className="item-title">دوره : </span>
                    <span className="item-text">سالانه</span>
                  </span>
                  <span className="text-item">
                    <span className="item-title">درس : </span>
                    <span className="item-text">فیزیک هسته‌ای</span>
                  </span>
                  <span className="text-item">
                    <span className="item-title">شناسه اسپات : </span>
                    <span className="item-text">slfhakslfhaskdhadkh</span>
                  </span>
                </div>
                <div className="col">
                  <span className="text-item">
                    <span className="item-title">پایه : </span>
                    <span className="item-text">دوازدهم</span>
                  </span>
                  <span className="text-item">
                    <span className="item-title">رشته ( ها ) : </span>
                    <span className="item-text">ریاضی٫هنر٫انسانی</span>
                  </span>
                  <span className="text-item">
                    <span className="item-title">قیمت اصلی : </span>
                    <span className="item-text">
                      {split_in_three(convert_to_persian(1000000))}
                      تومان
                    </span>
                  </span>
                  <span className="text-item">
                    <span className="item-title">قیمت تخفیف خورده : </span>
                    <span className="item-text">
                      {split_in_three(convert_to_persian(1000000))}
                      تومان
                    </span>
                  </span>
                </div>
              </div>
              <div className="second-row">
                <span className="text-item">
                  <span className="item-title">توضیحات کلاس : </span>
                  <span className="item-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشت
                  </span>
                </span>
              </div>
              <div className="action-btns">
                <span className="btn confirm-btn">تائید کلاس</span>
                <span className="btn delete-btn">حذف کلاس</span>
              </div>
            </div> */}
            {/* {not_approved_classes ? "ok" : <LittleLoading />} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ConfirmClass;

{
  /* //   <div className="kelas-item" key={k.kelas_id}>
              //     <div className="first-row">
              //       <div className="col">
              //         <img
              //           src={k.image_link}
              //           alt={k.kelas_title ? k.kelas_title : "وارد نشده"}
              //           width={150}
              //           height={150}
              //         />
              //         <span className="text-item">
              //           <span className="item-title">عنوان کلاس :</span>
              //           <span className="item-text">
              //             {k.kelas_title ? k.kelas_title : "وارد نشده"}
              //           </span>
              //         </span>
              //       </div>
              //       <div className="col">
              //         <span className="text-item">
              //           <span className="item-title">استاد : </span>
              //           <span className="item-text">
              //             {k.ostad_name ? k.ostad_name : "وارد نشده"}
              //           </span>
              //         </span>
              //         <span className="text-item">
              //           <span className="item-title">دوره : </span>
              //           <span className="item-text">
              //             {k.parent_dore ? k.parent_dore : "وارد نشده"}
              //           </span>
              //         </span>
              //         <span className="text-item">
              //           <span className="item-title">درس : </span>
              //           <span className="item-text">
              //             {courses ? (
              //               courses.find((c) => c.course_id === k.course) ? (
              //                 courses.find((c) => c.course_id === k.course)
              //                   .name
              //               ) : (
              //                 "وارد نشده"
              //               )
              //             ) : (
              //               <LittleLoading />
              //             )}
              //           </span>
              //         </span>
              //         <span className="text-item">
              //           <span className="item-title">شناسه اسپات : </span>
              //           <span className="item-text">
              //             {k.spot_player_id ? k.spot_player_id : "وارد نشده"}
              //           </span>
              //         </span>
              //       </div>
              //       <div className="col">
              //         <span className="text-item">
              //           <span className="item-title">پایه : </span>
              //           <span className="item-text">
              //             {years ? (
              //               years.find((y) => y.id === k.year) ? (
              //                 years.find((y) => y.id === k.year).name
              //               ) : (
              //                 "وارد نشده"
              //               )
              //             ) : (
              //               <LittleLoading />
              //             )}
              //           </span>
              //         </span>
              //         <span className="text-item">
              //           <span className="item-title">رشته ( ها ) : </span>
              //           <span className="item-text">
              //             {subjects ? (
              //               k.subject.map((s) => (
              //                 <span key={s}>
              //                   {subjects.find((su) => s === su.id)
              //                     ? subjects.find((su) => s === su.id).name
              //                     : "وارد نشده"}
              //                   ,
              //                 </span>
              //               ))
              //             ) : (
              //               <LittleLoading />
              //             )}
              //           </span>
              //         </span>
              //         <span className="text-item">
              //           <span className="item-title">قیمت اصلی : </span>
              //           <span className="item-text">
              //             {k.price
              //               ? split_in_three(convert_to_persian(k.price)) +
              //                 "تومان"
              //               : "وارد نشده"}
              //           </span>
              //         </span>
              //         <span className="text-item">
              //           <span className="item-title">
              //             قیمت تخفیف خورده :{" "}
              //           </span>
              //           <span className="item-text">
              //             {k.discounted_price
              //               ? split_in_three(
              //                   convert_to_persian(k.discounted_price)
              //                 ) + "تومان"
              //               : "وارد نشده"}
              //           </span>
              //         </span>
              //       </div>
              //     </div>
              //     <div className="second-row">
              //       <span className="text-item">
              //         <span className="item-title">توضیحات کلاس : </span>
              //         <span className="item-text">
              //           {k.description.length !== 0
              //             ? k.description.map((d, i) => <p key={i++}>{d}</p>)
              //             : "توضیحات وارد نشده"}
              //         </span>
              //       </span>
              //     </div>
              //     <div className="action-btns">
              //       <span className="btn confirm-btn">تائید کلاس</span>
              //       <span className="btn delete-btn">حذف کلاس</span>
              //     </div>
              //   </div> */
}
