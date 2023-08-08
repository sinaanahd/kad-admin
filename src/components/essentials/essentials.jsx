import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import Header from "../header/header";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import { DataContext } from "../context/DataContext";
import copy_func from "../functions/copy-to-clip-board";
import LittelLoading from "../reusable/little-loading";
const Essentials = () => {
  const [isCopied, setCopy] = useState(false);
  const { user, essentials } = useContext(DataContext);
  useEffect(() => {
    if (!user) {
      window.location.pathname = "/login";
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>پیشنیازها</title>
      </Helmet>
      <Header />
      <section className="essentials-page page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="how-to-calculate-profit-wrapper">
            <h1 className="title">نحوه محاسبه سود مشارکت</h1>
            <p className="desc">
              {essentials ? (
                essentials.monetize_description.map((item) => item)
              ) : (
                <LittelLoading />
              )}
            </p>
            <div className="copy-wrapper">
              <span className="copy-code">
                {essentials ? essentials.register_link : <LittelLoading />}
              </span>
              <span
                className="copy-btn"
                onClick={() => {
                  copy_func(essentials ? essentials.register_link : "");
                  setCopy(!isCopied);
                }}
              >
                {isCopied ? "کپی شد !" : "کپی"}
              </span>
            </div>
            <div className="code-wrapper">
              کد تخفیف :{" "}
              {essentials ? essentials.discount_code : <LittelLoading />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Essentials;
