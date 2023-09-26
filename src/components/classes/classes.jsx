import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../header/header";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import Kelas from "./class/class";
import { DataContext } from "../context/DataContext";
import LittleLoading from "../reusable/little-loading";

const ClassesPage = () => {
  const { kelasses, doreha, user } = useContext(DataContext);
  useEffect(() => {
    if (user) {
      if (user.level < 10) {
        window.location.pathname = "/account";
      }
    } else {
      window.location.pathname = "/login";
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>کلاس ها</title>
      </Helmet>
      <Header />
      <section className="classes-wrapper page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="classes">
            {kelasses ? (
              kelasses.map((kelas) => (
                <Kelas key={kelas.kelas_id} kelas={kelas} doreha={doreha} />
              ))
            ) : (
              <LittleLoading />
            )}
            {/* <Kelas />
            <Kelas />
            <Kelas />
            <Kelas />
            <Kelas />
            <Kelas />
            <Kelas />
            <Kelas />
            <Kelas />
            <Kelas />
            <Kelas />
            <Kelas />
            <Kelas />
            <Kelas />
            <Kelas />
            <Kelas /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ClassesPage;
