import React from "react";
import { Helmet } from "react-helmet";
import Header from "../header/header";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>صفحه پیدا نشد</title>
      </Helmet>
      <section className="page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <h1 className="page-404">صفحه مورد نظر پیدا نشد :(</h1>
        </div>
      </section>
    </>
  );
};

export default NotFound;
