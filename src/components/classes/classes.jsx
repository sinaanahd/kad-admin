import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import Kelas from "./class/class";
import { DataContext } from "../context/DataContext";
import LittleLoading from "../reusable/little-loading";

const ClassesPage = () => {
  const {
    kelasses,
    doreha,
    user,
    teachers,
    courses,
    get_kelasses,
    get_jalasat,
  } = useContext(DataContext);
  const [filter_kind, setFilter_kind] = useState(false);
  const [selected_teachers, setSelected_teachers] = useState([]);
  const [selected_doreha, setSelected_doreha] = useState([]);
  const [selected_courses, setSelected_courses] = useState([]);
  const [searched_classes, setSearched_classes] = useState(false);
  const [filtered_courses, setFiltered_courses] = useState(false);
  const [filtered_doreha, setFiltered_doreha] = useState(false);
  const [filtered_teachers, setFiltered_teachers] = useState(false);
  useEffect(() => {
    if (user) {
      if (user.level < 10) {
        window.location.pathname = "/account";
      } else {
        get_kelasses();
        get_jalasat();
      }
    } else {
      window.location.pathname = "/login";
    }
  }, []);
  const handle = (id) => {
    let new_select;
    if (filter_kind === "teachers") {
      new_select = [...selected_teachers];
      if (!selected_teachers.includes(id)) {
        new_select.push(id);
      } else {
        const index = new_select.indexOf(id);
        new_select.splice(index, 1);
      }
      setSelected_teachers(new_select);
    }
    if (filter_kind === "doreha") {
      new_select = [...selected_doreha];
      if (!selected_doreha.includes(id)) {
        new_select.push(id);
      } else {
        const index = new_select.indexOf(id);
        new_select.splice(index, 1);
      }
      setSelected_doreha(new_select);
    }
    if (filter_kind === "courses") {
      new_select = [...selected_courses];
      if (!selected_courses.includes(id)) {
        new_select.push(id);
      } else {
        const index = new_select.indexOf(id);
        new_select.splice(index, 1);
      }
      setSelected_courses(new_select);
    }
  };
  const delete_all_filters = () => {
    setFilter_kind(false);
    setSelected_courses([]);
    setSelected_doreha([]);
    setSelected_teachers([]);
    setSearched_classes(false);
  };
  const handle_class_search = ({ value }) => {
    let result = false;
    if (value.length >= 3) {
      result = [
        ...kelasses.filter((k) => k.kelas_title_and_ostad_name.includes(value)),
      ];
    }
    // console.log(result);
    setSearched_classes(result);
  };
  const handle_filter_final = () => {
    const filtered = [];
    let dore_check,
      course_check,
      teachers_check = false;
    kelasses.forEach((k) => {
      if (selected_courses.length === 0) {
        course_check = true;
      } else {
        course_check = selected_courses.includes(k.course);
      }
      if (selected_doreha.length === 0) {
        dore_check = true;
      } else {
        dore_check = selected_doreha.includes(k.parent_dore_id);
      }
      if (selected_teachers.length === 0) {
        teachers_check = true;
      } else {
        teachers_check = selected_teachers.includes(k.teachers[0]);
      }
      if (course_check && dore_check && teachers_check) {
        filtered.push(k);
      }
    });
    // console.log(filtered);
    setSearched_classes(filtered);
  };
  const handle_course_search = ({ value }) => {
    let result = false;
    if (value.length > 2) {
      result = [...courses.filter((c) => c.name.includes(value))];
    }
    setFiltered_courses(result);
  };
  const handle_teacher_search = ({ value }) => {
    let result = false;
    if (value.length > 2) {
      result = [...teachers.filter((c) => c.fullname.includes(value))];
    }
    setFiltered_teachers(result);
  };
  const handle_doreha_search = ({ value }) => {
    let result = false;
    if (value.length > 2) {
      result = [...doreha.filter((c) => c.dore_title.includes(value))];
    }
    setFiltered_doreha(result);
  };
  return (
    <>
      <Helmet>
        <title>کلاس ها</title>
      </Helmet>
      <section className="classes-wrapper page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="class-filter-wrapper">
            <div className="class-filter-header">
              <div className="filter-btns">
                <span
                  className={
                    filter_kind === "teachers"
                      ? "filter-btn active"
                      : "filter-btn"
                  }
                  onClick={() => {
                    setFilter_kind("teachers");
                  }}
                >
                  اساتید
                </span>
                <span
                  className={
                    filter_kind === "doreha"
                      ? "filter-btn active"
                      : "filter-btn"
                  }
                  onClick={() => {
                    setFilter_kind("doreha");
                  }}
                >
                  دوره ها
                </span>
                <span
                  className={
                    filter_kind === "courses"
                      ? "filter-btn active"
                      : "filter-btn"
                  }
                  onClick={() => {
                    setFilter_kind("courses");
                  }}
                >
                  درس ها
                </span>
              </div>
              <div className="filter-box-search">
                {!filter_kind ? (
                  <input
                    type="text"
                    placeholder="جستجو کلاس ها"
                    onInput={({ target }) => {
                      handle_class_search(target);
                    }}
                  />
                ) : filter_kind === "teachers" ? (
                  <input
                    type="text"
                    placeholder="جستجو اساتید"
                    onInput={({ target }) => {
                      handle_teacher_search(target);
                    }}
                  />
                ) : filter_kind === "doreha" ? (
                  <input
                    type="text"
                    placeholder="جستجو دوره ها"
                    onInput={({ target }) => {
                      handle_doreha_search(target);
                    }}
                  />
                ) : filter_kind === "courses" ? (
                  <input
                    type="text"
                    placeholder="جستجو درس ها"
                    onInput={({ target }) => {
                      handle_course_search(target);
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="filter-actions">
                <span
                  className="accept-changes action-btn"
                  onClick={() => {
                    handle_filter_final();
                  }}
                >
                  اعمال
                </span>
                <span
                  className="delete-changes action-btn"
                  onClick={() => {
                    delete_all_filters();
                  }}
                >
                  حذف تمام فیلتر ها
                </span>
              </div>
            </div>
            <div className="filter-options-to-show">
              {filter_kind === "teachers" ? (
                teachers ? (
                  filtered_teachers && filtered_teachers.length !== 0 ? (
                    filtered_teachers.map((t) => (
                      <span
                        onClick={() => {
                          handle(t.teacher_id);
                        }}
                        key={t.teacher_id}
                        className={
                          selected_teachers.includes(t.teacher_id)
                            ? "selected-field-option active"
                            : "selected-field-option"
                        }
                      >
                        {t.fullname}
                      </span>
                    ))
                  ) : filtered_teachers.length === 0 ? (
                    "موردی برای نمایش وجود ندارد"
                  ) : (
                    teachers.map((t) => (
                      <span
                        onClick={() => {
                          handle(t.teacher_id);
                        }}
                        key={t.teacher_id}
                        className={
                          selected_teachers.includes(t.teacher_id)
                            ? "selected-field-option active"
                            : "selected-field-option"
                        }
                      >
                        {t.fullname}
                      </span>
                    ))
                  )
                ) : (
                  <LittleLoading />
                )
              ) : (
                <></>
              )}

              {filter_kind === "doreha" ? (
                doreha ? (
                  filtered_doreha && filtered_doreha.length !== 0 ? (
                    filtered_doreha.map((t) => (
                      <span
                        onClick={() => {
                          handle(t.dore_id);
                        }}
                        key={t.dore_id}
                        className={
                          selected_doreha.includes(t.dore_id)
                            ? "selected-field-option active"
                            : "selected-field-option"
                        }
                      >
                        {t.dore_title}
                      </span>
                    ))
                  ) : filtered_doreha.length === 0 ? (
                    "موردی برای نمایش وجود ندارد"
                  ) : (
                    doreha.map((t) => (
                      <span
                        onClick={() => {
                          handle(t.dore_id);
                        }}
                        key={t.dore_id}
                        className={
                          selected_doreha.includes(t.dore_id)
                            ? "selected-field-option active"
                            : "selected-field-option"
                        }
                      >
                        {t.dore_title}
                      </span>
                    ))
                  )
                ) : (
                  <LittleLoading />
                )
              ) : (
                <></>
              )}
              {filter_kind === "courses" ? (
                courses ? (
                  filtered_courses && filtered_courses.length !== 0 ? (
                    filtered_courses.map((t) => (
                      <span
                        onClick={() => {
                          handle(t.course_id);
                        }}
                        key={t.course_id}
                        className={
                          selected_courses.includes(t.course_id)
                            ? "selected-field-option active"
                            : "selected-field-option"
                        }
                      >
                        {t.name}
                      </span>
                    ))
                  ) : filtered_courses.length === 0 ? (
                    "موردی برای نمایش وجود ندارد"
                  ) : (
                    courses.map((t) => (
                      <span
                        onClick={() => {
                          handle(t.course_id);
                        }}
                        key={t.course_id}
                        className={
                          selected_courses.includes(t.course_id)
                            ? "selected-field-option active"
                            : "selected-field-option"
                        }
                      >
                        {t.name}
                      </span>
                    ))
                  )
                ) : (
                  <LittleLoading />
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="classes">
            {searched_classes && searched_classes.length !== 0 ? (
              searched_classes.map((kelas) => (
                <Kelas key={kelas.kelas_id} kelas={kelas} doreha={doreha} />
              ))
            ) : searched_classes.length === 0 ? (
              "موردی یافت نشد"
            ) : kelasses ? (
              kelasses.map((kelas) => (
                <Kelas key={kelas.kelas_id} kelas={kelas} doreha={doreha} />
              ))
            ) : (
              <LittleLoading />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ClassesPage;
