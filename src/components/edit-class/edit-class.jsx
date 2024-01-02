import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import { DataContext } from "../context/DataContext";
import Card from "./card/card";
import Upload from "./upload/upload";
import Edit_info from "./edit-info/edit-info";
import Session_edit from "./session-edit/session-edit";
import LittleLoading from "../reusable/little-loading";
import axios from "axios";
import urls from "../urls/urls";
import AddVideo from "./add-video/add-video";

const EditClassPage = () => {
  const {
    kelasses,
    doreha,
    teachers,
    get_kelasses,
    jalasat,
    sample_files,
    get_sample_files,
    set_jalasat,
    get_jalasat,
    user,
  } = useContext(DataContext);
  const [single_class, setSingle_class] = useState(false);
  const [active_session, set_active_session] = useState(false);
  const [allow_upload, set_allow_upload] = useState(false);
  useEffect(() => {
    if (user) {
      if (user.level < 10) {
        window.location.pathname = "/account";
      } else {
        find_single_class();
        get_jalasat();
        get_kelasses();
      }
    } else {
      window.location.pathname = "/login";
    }
  }, []);
  const find_single_class = () => {
    const slug = parseInt(window.location.pathname.split("/")[2]);
    // const single_class = { ...kelasses.find((k) => k.kelas_id === slug) };
    axios
      .get(`${urls.kelas_summery}/${slug}`)
      .then((res) => {
        // console.log(res.data);
        const { result, response, error } = res.data;
        if (result) {
          setSingle_class(response);
          console.log(response);
        } else {
          console.log(error);
          alert("مشکلی پیش آمده");
        }
      })
      .catch((e) => {
        console.log(e);
      });
    // if (Object.keys(single_class).length !== 0) setSingle_class(single_class);
    // else {
    //   // window.location.pathname = "not-found";
    // }
  };
  return (
    <>
      <Helmet>
        <title>
          ویرایش کلاس {single_class ? single_class.kelas_title : ""}
        </title>
      </Helmet>
      <section className="edit-class-page page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="main-wrapper">
            <div className="right-col">
              <div className="class-banner-edit">
                <Card single_class={single_class} teachers={teachers} />
              </div>
              {/* <div className="make-file-inputs-wrapper">
                <div className="make-file-header">
                  <h2 className="semi-title">تعریف فایل در جلسه منتخب</h2>
                  <span className="close-btn">بستن X</span>
                </div>
                <h3 className="session-name-detail">
                  <span className="session-num">جلسه ۲</span>
                  ۲۰ شهریور - شنبه ۱۰-۱۲
                </h3>
                <h4 className="pick-title">انتخاب نوع دسته فایل</h4>
                <div className="pick-file-cat">
                  <span className="cat-wrapper cat-selected">جزوه</span>
                  <span className="cat-wrapper">تکلیف</span>
                  <span className="cat-wrapper">آزمون</span>
                </div>
                <h4 className="pick-title">عنوان تکلیف</h4>
                <input
                  type="text"
                  className="chose-title-input"
                  placeholder="مبحثی از هرچی"
                />
                <div className="chosen-files">
                  <span className="file-img">FILE</span>
                  <span className="uploaded-files">
                    <span className="uploaded-file">
                      <span className="uploaded-file-name">
                        توضیح و حل مسئله در مورد فصل نوسان فیزیک دوازدهم
                        ریاضی.pdf
                      </span>
                      <span className="delete-btn">پاک کردن</span>
                    </span>
                  </span>
                </div>
                <div className="upload-file-btns">
                  <label htmlFor="file-input" className="upload-btn">
                    انتخاب فایل
                  </label>

                  <input
                    type="file"
                    name=""
                    id="file-input"
                    placeholder="انتخاب فایل"
                    accept=".pdf"
                    className="hidden-input-file"
                  />

                  <span className="submit-files-btn">
                    ثبت فایل در دسته بندی
                  </span>
                </div>
              </div> */}
              {allow_upload ? (
                <Upload
                  set_allow_upload={set_allow_upload}
                  get_sample_files={get_sample_files}
                  set_jalasat={set_jalasat}
                  jalasat={jalasat}
                  active_session={active_session}
                  set_active_session={set_active_session}
                  get_jalasat={get_jalasat}
                  find_single_class={find_single_class}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="left-col">
              {/* <div className="edit-and-session-options-wrapper"> */}
              {user ? (
                user.level === 20 ? (
                  <Edit_info
                    single_class={single_class}
                    teachers={teachers}
                    get_kelasses={get_kelasses}
                    setSingle_class={setSingle_class}
                  />
                ) : (
                  <></>
                )
              ) : (
                <LittleLoading />
              )}
              <AddVideo kelas={single_class} />
              {/* <div className="edit-satge-area">
                <h1 className="edit-title">
                  ویرایش اطلاعات کلی درس
                  {single_class ? " " + single_class.kelas_title : ""}
                </h1>
                <div className="filters-wrapper">
                  <span className="filter">
                    <span className="filter-title">عنوان درس</span>
                    <span className="just-watch-content">
                      {single_class ? (
                        single_class.kelas_title
                      ) : (
                        <LittleLoading />
                      )}
                    </span>
                  </span>
                  <span className="filter">
                    <span className="filter-title">مشخصات استاد</span>
                    <span className="just-watch-content">
                      {single_class ? (
                        {
                          ...teachers.find(
                            (t) => t.teacher_id === single_class.teachers[0]
                          ),
                        }.fullname
                      ) : (
                        <LittleLoading />
                      )}
                    </span>
                  </span>
                  <span className="filter">
                    <span className="filter-title">قیمت اصلی</span>
                    <input
                      type="number"
                      placeholder={
                        single_class
                          ? split_in_three(
                              convert_to_persian(single_class.price)
                            ) + " تومان"
                          : split_in_three(convert_to_persian(1000000)) +
                            " تومان"
                      }
                    />
                  </span>
                  <span className="filter">
                    <span className="filter-title">قیمت پس از اعمال تخفیف</span>
                    <input
                      type="number"
                      placeholder={
                        single_class
                          ? split_in_three(
                              convert_to_persian(single_class.discounted_price)
                            ) + " تومان"
                          : split_in_three(convert_to_persian(1000000)) +
                            " تومان"
                      }
                    />
                  </span>
                </div>
                <div className="btns-wrapper">
                  <span className="return-to-classes save-changes-btn">
                    اعمال تغییرات
                  </span>
                  <Link
                    onClick={() => {
                      scrollToTop();
                    }}
                    to="/classes"
                    className="return-to-classes"
                  >
                    بازگشت به کلاس‌ها
                  </Link>
                </div>
              </div> */}
              <Session_edit
                active_session={active_session}
                set_active_session={set_active_session}
                get_jalasat={get_jalasat}
                jalasat={jalasat}
                single_class={single_class}
                sample_files={sample_files}
                set_allow_upload={set_allow_upload}
                find_single_class={find_single_class}
              />
            </div>
          </div>
          {/* <p>
            ویژگی‌های یک مشاور کنکور خوب و تأثیر آن بر موفقیت داوطلبان کلمات
            کلیدی برای بهبود سئو: مشاور کنکور ویژگی‌های مشاور کنکور مشاوریت
            تحصیلی کنکور علوم تجربی کنکور ریاضی کنکور انسانی کنکور زبان تأثیر
            مشاور کنکور بر موفقیت داوطلبان مقدمه: در مسیر آموزشی دانش‌آموزان،
            آزمون کنکور یکی از مراحل مهم و تصمیم‌گیری‌کننده‌ای است. داوطلبان
            کنکور برای دستیابی به اهدافشان نیاز به راهنمایی و مشاوره دارند.
            مشاوران کنکور با ارائه خدمات مشاوره تحصیلی، نقش بسیار مهمی در موفقیت
            داوطلبان ایفا می‌کنند. در این مقاله، به معرفی ویژگی‌های یک مشاور
            کنکور خوب و تأثیر مثبت آن بر موفقیت داوطلبان پرداخته خواهد شد.
            ویژگی‌های مشاور کنکور خوب: تخصص و تجربه: یک مشاور کنکور باید دارای
            تخصص و تجربه کافی در زمینه آموزش و آزمون‌های کنکور باشد. این ویژگی
            به او کمک می‌کند تا بهترین راهکارها و تکنیک‌ها را به داوطلبان ارائه
            دهد. شناخت متناسب با رشته: هر داوطلب در کنکور به رشته‌ای خاص مشغول
            به تحصیل می‌شود. یک مشاور کنکور خوب باید با ویژگی‌ها و نیازهای هر
            رشته آشنا باشد تا به داوطلبان کمک کند مسیر مناسبی را انتخاب کنند.
            توانایی تشخیص نیازها: یک مشاور باید توانایی تشخیص نیازهای هر داوطلب
            را داشته باشد. این ویژگی به او کمک می‌کند تا برنامه‌های شخصی‌سازی
            شده برای هر داوطلب ایجاد کند. ارتباط انسانی مؤثر: مشاوران کنکور باید
            توانایی برقراری ارتباط موثر با داوطلبان را داشته باشند. این ارتباط
            به ایجاد محیطی دوستانه و اعتمادساز برای داوطلبان کمک می‌کند. پیگیری
            مستمر: یک مشاور خوب باید پیگیری مستمری از پیشرفت و نیازهای داوطلبان
            داشته باشد. این ویژگی به او کمک می‌کند تا بهترین خدمات را ارائه دهد.
            آمادگی برای حل مشکلات: در مسیر تحصیلی داوطلبان، ممکن است با مشکلات
            مختلفی مواجه شوند. یک مشاور باید آماده باشد تا در حل مشکلات ایشان به
            ایشان کمک کند. تأثیر مثبت مشاور کنکور بر موفقیت داوطلبان: ارتقاء
            رضایت داوطلبان: مشاوران کنکور با ارائه خدمات بهتر و مشاوره موثر،
            رضایت داوطلبان را افزایش می‌دهند و ایشان را به تلاش بیشتر ترغیب
            می‌کنند. کاهش استرس: داوطلبان در دوره کنکور ممکن است با استرس‌های
            زیادی مواجه شوند. مشاوران با ارائه راهکارهای مدیریت استرس به ایشان
            کمک می‌کنند. ارتقاء عملکرد تحصیلی: مشاوران با ارائه راهکارها و
            تکنیک‌های مطالعه موثر، به افزایش عملکرد تحصیلی داوطلبان کمک می‌کنند.
            تعیین اهداف و راهبردهای مشخص: مشاوران به داوطلبان کمک می‌کنند تا
            اهداف و راهبردهای خود را مشخص کرده و به تعقیب آنها بپردازند.
            نتیجه‌گیری: مشاوران کنکور با ویژگی‌های خاصی که دارند، می‌توانند
            تأثیر بسزایی در موفقیت داوطلبان داشته باشند. تخصص، تجربه، توانایی
            تشخیص نیازها، ارتباط انسانی مؤثر، پیگیری مستمر، آمادگی برای حل
            مشکلات و ارتقاء رضایت داوطلبان از ویژگی‌های مهم یک مشاور کنکور خوب
            هستند. از اینرو، انتخاب مشاور کنکور مناسب می‌تواند گامی مهم در راه
            به دست‌آوردن موفقیت در آزمون کنکور باشد.
          </p> */}
        </div>
      </section>
    </>
  );
};

export default EditClassPage;
