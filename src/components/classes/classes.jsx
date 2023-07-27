import React from "react";
import { Helmet } from "react-helmet";
import Header from "../header/header";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import Kelas from "./class/class";

const ClassesPage = () => {
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
            <Kelas />
            <Kelas />
          </div>
        </div>
      </section>
    </>
  );
};

export default ClassesPage;
