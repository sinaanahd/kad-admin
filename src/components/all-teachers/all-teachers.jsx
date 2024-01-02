import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import ReloadBtn from "../reusable/reload-btn";
import { DataContext } from "../context/DataContext";
import LittleLoading from "../reusable/little-loading";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const AllTeachers = () => {
  const { teachers_summary, set_teachers_summary, get_teachers_summary } =
    useContext(DataContext);
  const [searched, set_searched] = useState(false);
  const handle_reload = (e) => {
    set_teachers_summary(false);
    get_teachers_summary();
  };
  const handle_search = (e) => {
    const value = e.target.value;
    let searched = [];
    if (value.length > 1) {
      searched = teachers_summary.filter((t) => t.fullname.includes(value));
      set_searched(searched);
    } else {
      set_searched(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>تمامی اساتید</title>
      </Helmet>
      <section className="page-wrapper all-teachers-page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="main-wrapper">
            <div className="section-header">
              <h1 className="title">تمامی اساتید</h1>
              <input
                type="text"
                placeholder="جستجو ..."
                onInput={handle_search}
              />
              <ReloadBtn click={handle_reload} />
            </div>
            <div className="all-teachers-wrapper">
              {teachers_summary ? (
                searched ? (
                  searched.length !== 0 ? (
                    searched.map((t) => (
                      <Link
                        to={`/teacher/${t.teacher_id}`}
                        key={t.teacher_id}
                        className="teacher-wrapper"
                      >
                        <img src={t.image_link} alt={t.fullname} />
                        <span className="teacher-name">
                          {t.fullname.replace("استاد", "")}
                        </span>
                      </Link>
                    ))
                  ) : (
                    "موردی یافت نشد"
                  )
                ) : (
                  teachers_summary.map((t) => (
                    <Link
                      to={`/teacher/${t.teacher_id}`}
                      key={t.teacher_id}
                      className="teacher-wrapper"
                    >
                      <img src={t.image_link} alt={t.fullname} />
                      <span className="teacher-name">
                        {t.fullname.replace("استاد", "")}
                      </span>
                    </Link>
                  ))
                )
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

export default AllTeachers;
