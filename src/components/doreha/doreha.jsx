import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import ReloadBtn from "../reusable/reload-btn";
import { DataContext } from "../context/DataContext";
import LittleLoading from "../reusable/little-loading";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Doreha = () => {
  const { doreha, setDoreha, get_doreha } = useContext(DataContext);
  const handle_reload = (e) => {
    setDoreha(false);
    get_doreha();
  };
  return (
    <>
      <Helmet>
        <title>تمامی دوره ها</title>
      </Helmet>
      <section className="doreha-page-wrapper page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="doreha-wrapper">
            <div className="section-header">
              <h1 className="page-title">تمامی دوره ها</h1>
              <ReloadBtn click={handle_reload} />
            </div>
            <div className="all-doreha-wrapper">
              {doreha ? (
                doreha.map((d) => (
                  <Link
                    to={`doreha/${d.dore_id}`}
                    className="dore-wrapper"
                    key={d.dore_id}
                  >
                    <img src={d.image_link} alt={d.dore_title} />
                    <h2 className="dore-name">{d.dore_title}</h2>
                  </Link>
                ))
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

export default Doreha;
