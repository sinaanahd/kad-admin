import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import LittleLoading from "../reusable/little-loading";
import split_in_three from "../functions/spilit_in_three";
import convert_to_persian from "../functions/convert-to-persian";
import axios from "axios";
const AddClass = () => {
  const { teachers, doreha, courses, years, subjects } =
    useContext(DataContext);
  const [custom_select, setCustom_select] = useState(false);
  const [title, setTitle] = useState(false);
  const [title_err, setTitle_err] = useState(false);
  const [title_english, setTitle_english] = useState(false);
  const [title_english_err, setTitle_english_err] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [teacher_err, setTeacher_err] = useState(false);
  const [dore, setDore] = useState(false);
  const [dore_err, setDore_err] = useState(false);
  const [course, setCourse] = useState(false);
  const [course_err, setCourse_err] = useState(false);
  const [year, setYear] = useState(false);
  const [year_err, setYear_err] = useState(false);
  const [subject, setSubject] = useState([]);
  const [subject_err, setSubject_err] = useState(false);
  const [price, setPrice] = useState(0);
  const [price_err, setPrice_err] = useState(false);
  const [discount_price, setDiscountPrice] = useState(0);
  const [discount_price_err, setDiscount_price_err] = useState(false);
  const [spot_liecene, setSpot_liecene] = useState(false);
  const [spot_liecene_err, setSpot_liecene_err] = useState(false);
  const [img, setImg] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile_err, setSelectedFile_err] = useState(false);
  const [description, setDescition] = useState(false);
  const [description_err, setDescition_err] = useState(false);
  const [pause, setPause] = useState(false);
  const [class_type, set_class_type] = useState(false);
  const [class_type_err, set_class_type_err] = useState(false);
  const handle_class_type = (type) => {
    set_class_type(type);
    setCustom_select(false);
    set_class_type_err(false);
  };
  const handle_custom_select = (entry) => {
    if (entry === custom_select) {
      setCustom_select(false);
    } else {
      setCustom_select(entry);
    }
  };
  const handle_title_english_entry = (value) => {
    const all_persian_char = [
      "ض",
      "ص",
      "ث",
      "ق",
      "ف",
      "غ",
      "ع",
      "ه",
      "خ",
      "ح",
      "ج",
      "چ",
      "ش",
      "س",
      "ی",
      "ب",
      "ل",
      "ا",
      "ت",
      "ن",
      "م",
      "ک",
      "گ",
      "ظ",
      "ط",
      "ز",
      "ر",
      "ذ",
      "د",
      "پ",
      "و",
      "‍‍ژ",
      "آ",
      "ئ",
      " ",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "=",
      "+",
      "`",
      "\\",
      "|",
      "{",
      "}",
      "]",
      "[",
      "?",
      ".",
      "<",
      ">",
      ">",
      "~",
    ];
    let checked = true;
    if (value.length !== 0) {
      all_persian_char.forEach((c) => {
        if (value.includes(c)) {
          checked = false;
        }
      });
    }
    if (checked) {
      if (value.length === 0) {
        setTitle_english(false);
        setTitle_english_err("نام انگلیسی کلاس وارد نشده است");
      } else if (value.length < 5) {
        setTitle_english(false);
        setTitle_english_err("نام انگلیسی وارد شده کوتاه است");
      } else {
        setTitle_english(value);
        setTitle_english_err(false);
      }
    } else {
      setTitle_english(false);
      setTitle_english_err("کاراکتر غیر انگلیسی در اسم است");
    }
  };
  const handle_title_entry = (value) => {
    if (value.length === 0) {
      setTitle(false);
      setTitle_err("نام کلاس وارد نشده است");
    } else if (value.length < 5) {
      setTitle(false);
      setTitle_err("نام وارد شده کوتاه است");
    } else {
      setTitle(value);
      setTitle_err(false);
    }
  };
  const handle_teacher = (obj) => {
    setTeacher(obj);
    setCustom_select(false);
    setTeacher_err(false);
  };
  const handle_dore = (obj) => {
    setDore(obj);
    setCustom_select(false);
    setDore_err(false);
  };
  const handle_year = (obj) => {
    setYear(obj);
    setCustom_select(false);
    setYear_err(false);
  };
  const handle_course = (obj) => {
    setCourse(obj);
    setCustom_select(false);
    setCourse_err(false);
  };
  const handle_subject = (obj) => {
    const subj_arr = [...subject];
    if (!subj_arr.includes(obj)) {
      subj_arr.push(obj);
    } else {
      const index = subj_arr.indexOf(obj);
      subj_arr.splice(index, 1);
    }
    setSubject(subj_arr);
    setSubject_err(false);
  };
  const handle_price = (value) => {
    if (value.length !== 0) {
      setPrice(parseInt(value));
      setPrice_err(false);
    } else {
      setPrice(0);
      setPrice_err(true);
    }
  };
  const handle_discount_price = (value) => {
    if (value.length !== 0) {
      setDiscountPrice(parseInt(value));
      setDiscount_price_err(false);
    } else {
      setDiscountPrice(0);
      setDiscount_price_err(true);
    }
  };
  const handle_spot_liecene = (value) => {
    if (value.length !== 0) {
      setSpot_liecene(value);
      setSpot_liecene_err(false);
    } else {
      setSpot_liecene(false);
    }
  };
  const handle_description = (value) => {
    if (value.length !== 0) {
      setDescition(value);
      setDescition_err(false);
    } else {
      setDescition(false);
    }
  };
  const send_data = () => {
    const subj_ids = subject.map((s) => (s = s.id));
    const send_obj = {
      title: title,
      teacher_id: teacher.teacher_id,
      course_id: course.course_id,
      dore_id: dore.dore_id,
      year: year.id,
      subject: subj_ids,
      price: price,
      discounted_price: discount_price,
      spot_player_id: spot_liecene,
      in_run: true,
      description: description,
    };
    // console.log(send_obj);
  };
  const handle_img = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImg(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setSelectedFile_err(false);
  };
  const handleUpload = () => {
    if (
      selectedFile &&
      title &&
      teacher &&
      course &&
      dore &&
      year &&
      subject.length &&
      price &&
      spot_liecene &&
      description &&
      title_english &&
      class_type
    ) {
      const subj_ids = subject.map((s) => (s = s.id));
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", title);
      formData.append("kelas_english_name", title_english);
      formData.append("teacher_id", teacher.teacher_id);
      formData.append("course_id", course.course_id);
      formData.append("dore_id", dore.dore_id);
      formData.append("year", year.id);
      formData.append("subject", subj_ids);
      formData.append("price", price);
      formData.append("in_run", class_type.truthy);
      formData.append(
        "discounted_price",
        discount_price ? discount_price : null
      );
      formData.append("spot_player_id", spot_liecene);
      formData.append("description", description);
      setPause(true);
      axios
        .post(
          "https://kadschool.com/backend/kad_api/admin_create_kelas",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          const result = res.data;
          console.log(result);
          if (result) {
            alert("کلاس با موفقیت ذخیره شد");
            window.location.reload();
          } else {
            alert("مشکلی پیش آمده پس از بررسی اطلاعات دوباره تلاش کنید");
          }
          setPause(false);
        })
        .catch((e) => {
          setPause(false);
          console.log(e.message);
        });
    } else {
      if (!selectedFile) {
        setSelectedFile_err("فایلی وارد نشده یا پسوند فایل اشتباه است");
      }
      if (!title) {
        setTitle_err("عنوان وارد شده یا کوتاه است یا وارد نشده");
      }
      if (!teacher) {
        setTeacher_err("استادی انتخاب نشده است");
      }
      if (!course) {
        setCourse_err("درسی برای کلاس انتخاب نشده است");
      }
      if (!dore) {
        setDore_err("دوره‌ای انتخاب نشده است");
      }
      if (!year) {
        setYear_err("پایه تحصیلی انتخاب نشده است");
      }
      if (!subject.length) {
        setSubject_err("رشته تحصیلی انتخاب نشده است");
      }
      if (!price) {
        setPrice_err("قیمتی وارد نشده یا قیمت برابر صفر است");
      }
      if (!spot_liecene) {
        setSpot_liecene_err("کد لایسنس اسپات وارد نشده");
      }
      if (!description) {
        setDescition_err("توضیحات وارد نشده ");
      }
      if (!title_english) {
        setTitle_english_err("اسم انگلیسی وارد نشده یا اشتباه است");
      }
      if (!class_type) {
        set_class_type_err("نوع کلاس انتخاب نشده است");
      }
    }
  };
  const send_fake_data = (e) => {
    console.log("done");
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", "title");
    formData.append("kelas_english_name", "title_english");
    formData.append("teacher_id", 7792);
    formData.append("course_id", 10);
    formData.append("dore_id", 6);
    formData.append("year", 10);
    formData.append("subject", [0, 1]);
    formData.append("price", 100000);
    formData.append("discounted_price", null);
    formData.append("spot_player_id", "spot_liecene");
    formData.append("description", "description");
    axios
      .post(
        "https://kadschool.com/backend/kad_api/admin_create_kelas",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Helmet>
        <title>اضافه کردن کلاس جدید</title>
      </Helmet>
      <section className="add-class-page-wrapper page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="add-class-page mm-width">
            <div className="final-errors">
              {selectedFile_err ? (
                <span className="final-err">{selectedFile_err}</span>
              ) : (
                <></>
              )}
              {title_err ? (
                <span className="final-err">{title_err}</span>
              ) : (
                <></>
              )}
              {title_english_err ? (
                <span className="final-err">{title_english_err}</span>
              ) : (
                <></>
              )}
              {teacher_err ? (
                <span className="final-err">{teacher_err}</span>
              ) : (
                <></>
              )}
              {course_err ? (
                <span className="final-err">{course_err}</span>
              ) : (
                <></>
              )}
              {dore_err ? <span className="final-err">{dore_err}</span> : <></>}
              {year_err ? <span className="final-err">{year_err}</span> : <></>}
              {subject_err ? (
                <span className="final-err">{subject_err}</span>
              ) : (
                <></>
              )}
              {price_err ? (
                <span className="final-err">{price_err}</span>
              ) : (
                <></>
              )}
              {spot_liecene_err ? (
                <span className="final-err">{spot_liecene_err}</span>
              ) : (
                <></>
              )}
              {description_err ? (
                <span className="final-err">{description_err}</span>
              ) : (
                <></>
              )}
              {class_type_err ? (
                <span className="final-err">{class_type_err}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="class-title-input input-wrapper">
              <span className="bold-title"> عنوان کلاس</span>
              <input
                type="text"
                name="class-title"
                placeholder="مثل  عربی جامع ، گوارش و جذب مواد"
                onInput={({ target }) => {
                  handle_title_entry(target.value);
                }}
              />
              <span className="bold-title"> عنوان انگلیسی کلاس</span>
              <input
                type="text"
                name="class-title"
                placeholder="مثل : olom_fonon_sebti"
                onInput={({ target }) => {
                  handle_title_english_entry(target.value);
                }}
              />
            </div>
            <div className="other-inputs">
              <span className="input-wrapper">
                <span className="normal-title"> استاد</span>
                <span
                  className="input-span"
                  onClick={() => {
                    handle_custom_select("teachers");
                  }}
                >
                  {teacher ? teacher.fullname : "انتخاب کنید"}
                </span>
                {custom_select === "teachers" ? (
                  <span className="choose-items-wrapper">
                    {teachers ? (
                      teachers.map((t) => (
                        <span
                          key={t.teacher_id}
                          className={
                            t.teacher_id === teacher.teacher_id
                              ? "choose-item choosen"
                              : "choose-item"
                          }
                          onClick={() => {
                            handle_teacher(t);
                          }}
                        >
                          {t.fullname.replace("استاد", "")}
                        </span>
                      ))
                    ) : (
                      <LittleLoading />
                    )}
                  </span>
                ) : (
                  <></>
                )}
              </span>
              <span className="input-wrapper">
                <span className="normal-title"> دوره</span>
                <span
                  className="input-span"
                  onClick={() => {
                    handle_custom_select("doreha");
                  }}
                >
                  {dore ? dore.dore_title : "انتخاب کنید"}
                </span>
                {custom_select === "doreha" ? (
                  <span className="choose-items-wrapper">
                    {doreha ? (
                      doreha.map((d) => (
                        <span
                          key={d.dore_id}
                          className={
                            d.dore_id === dore.dore_id
                              ? "choose-item choosen"
                              : "choose-item"
                          }
                          onClick={() => {
                            handle_dore(d);
                          }}
                        >
                          {d.dore_title}
                        </span>
                      ))
                    ) : (
                      <LittleLoading />
                    )}
                  </span>
                ) : (
                  <></>
                )}
              </span>
              <span className="input-wrapper">
                <span className="normal-title"> نوع کلاس</span>
                <span
                  className="input-span"
                  onClick={() => {
                    handle_custom_select("class_type");
                  }}
                >
                  {class_type ? class_type.text : "انتخاب کنید"}
                </span>
                {custom_select === "class_type" ? (
                  <span className="choose-items-wrapper">
                    <span
                      className={
                        class_type.id === 1
                          ? "choose-item choosen"
                          : "choose-item"
                      }
                      onClick={() => {
                        handle_class_type({
                          text: "آنلاین",
                          id: 1,
                          truthy: true,
                        });
                      }}
                    >
                      آنلاین
                    </span>
                    <span
                      className={
                        class_type.id === 2
                          ? "choose-item choosen"
                          : "choose-item"
                      }
                      onClick={() => {
                        handle_class_type({
                          text: "آفلاین",
                          id: 2,
                          truthy: false,
                        });
                      }}
                    >
                      آفلاین
                    </span>
                  </span>
                ) : (
                  <></>
                )}
              </span>
              <span className="input-wrapper">
                <span className="normal-title"> درس</span>
                <span
                  className="input-span"
                  onClick={() => {
                    handle_custom_select("courses");
                  }}
                >
                  {course ? course.name : "انتخاب کنید"}
                </span>
                {custom_select === "courses" ? (
                  <span className="choose-items-wrapper">
                    {courses ? (
                      courses.map((c) => (
                        <span
                          key={c.course_id}
                          className={
                            c.course_id === course.course_id
                              ? "choose-item choosen"
                              : "choose-item"
                          }
                          onClick={() => {
                            handle_course(c);
                          }}
                        >
                          {c.name}
                        </span>
                      ))
                    ) : (
                      <LittleLoading />
                    )}
                  </span>
                ) : (
                  <></>
                )}
              </span>
              <span className="input-wrapper">
                <span className="normal-title"> پایه</span>
                <span
                  className="input-span"
                  onClick={() => {
                    handle_custom_select("years");
                  }}
                >
                  {year ? year.name : "انتخاب کنید"}
                </span>
                {custom_select === "years" ? (
                  <span className="choose-items-wrapper">
                    {years ? (
                      years.map((y) => (
                        <span
                          key={y.id}
                          className={
                            year.id === y.id
                              ? "choose-item choosen"
                              : "choose-item"
                          }
                          onClick={() => {
                            handle_year(y);
                          }}
                        >
                          {y.name}
                        </span>
                      ))
                    ) : (
                      <LittleLoading />
                    )}
                  </span>
                ) : (
                  <></>
                )}
              </span>
              <span className="input-wrapper">
                <span className="normal-title"> رشته</span>
                <span className="box-input">
                  {subjects ? (
                    subjects.map((s) => (
                      <span
                        onClick={() => {
                          handle_subject(s);
                        }}
                        key={s.id}
                        className={
                          subject.includes(s)
                            ? "multiple-box-select active"
                            : "multiple-box-select"
                        }
                      >
                        {s.name}
                      </span>
                    ))
                  ) : (
                    <LittleLoading />
                  )}
                </span>
              </span>
              <span className="input-wrapper">
                <span className="normal-title">قیمت اصلی </span>
                <input
                  type="number"
                  placeholder="قیمت اصلی"
                  onInput={({ target }) => {
                    handle_price(target.value);
                  }}
                />
                <span className="input-price">
                  {split_in_three(convert_to_persian(price))} تومان
                </span>
              </span>
              <span className="input-wrapper">
                <span className="normal-title"> قیمت تخفیفی</span>
                <input
                  type="number"
                  placeholder="قیمت تخفیفی"
                  onInput={({ target }) => {
                    handle_discount_price(target.value);
                  }}
                />
                <span className="input-price">
                  {split_in_three(convert_to_persian(discount_price))} تومان
                </span>
              </span>
              <span className="input-wrapper">
                <span className="normal-title"> شناسه دوره در اسپات پلیر</span>
                <input
                  type="text"
                  placeholder="مثل 64b66c07a4c159ere4803f91"
                  className="spot-input"
                  onInput={({ target }) => {
                    handle_spot_liecene(target.value);
                  }}
                />
              </span>
            </div>
            <div className="final-inputs">
              <span className="photo-upload">
                <label htmlFor="file_input" className="upload-btn">
                  آپلود تصویر
                </label>
                <input
                  type="file"
                  name="file_input"
                  id="file_input"
                  className="file_input"
                  accept=".png,.jpg,.webp,.jpeg"
                  onChange={(e) => {
                    handle_img(e);
                    handleFileChange(e);
                  }}
                />
                <span className="image-place">{img && <img src={img} />}</span>
              </span>
              <span className="class-desc-place">
                <span className="normal-title">توضیحات کلاس را وارد کنید</span>
                <textarea
                  onInput={({ target }) => {
                    handle_description(target.value);
                  }}
                  name=""
                  id=""
                  placeholder="لطفا توضیحات کلاس را به صورت خط به خط وارد کنید .
مثل همین متن ، در هر خط بنویسید ، نقطه بگذارید و به خط بعد بروید .
این متن یک مثال است ."
                ></textarea>
              </span>
            </div>
            {pause ? (
              <span className="submit-all-data">
                <LittleLoading />
              </span>
            ) : (
              <span
                onClick={() => {
                  send_data();
                  handleUpload();
                  // send_fake_data();
                }}
                className="submit-all-data"
              >
                ذخیره کلاس
              </span>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AddClass;
