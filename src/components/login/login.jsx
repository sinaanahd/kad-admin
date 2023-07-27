import React, { useState } from "react";
import { Helmet } from "react-helmet";

import space_bg from "../../asset/images/landing-bg.webp";
import show_pass from "../../asset/images/show-pass.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Login = () => {
  const [pass, setPass] = useState(false);
  const handle_pass = () => {
    setPass(!pass);
  };
  return (
    <>
      <Helmet>
        <title>پنل مدیریت سایت کاد</title>
        <link rel="preload" href={space_bg} />
      </Helmet>
      <section className="login-page-wrapper">
        <div className="content-wrapper">
          <h1 className="title">پنل مدیریت سایت کاد</h1>
          <p className="page-desc">برای دسترسی ، کد مخصوص خود را وارد کنید</p>
          <span className="input-btn-wrapper">
            <span className="input-wrapper">
              <input
                type={pass ? "text" : "password"}
                name="entry-code"
                id="entry-code"
                placeholder="کد ورود"
                className="pass-input"
              />
              <span
                className="show-pass-icon"
                onClick={() => {
                  handle_pass();
                }}
              >
                {!pass ? (
                  <img
                    src={show_pass}
                    alt="نمایش دادن رمز"
                    width={17}
                    height={17}
                  />
                ) : (
                  "پنهان"
                  // <img
                  //   src={show_pass}
                  //   alt="پنهان کردن رمز"
                  //   width={17}
                  //   height={17}
                  // />
                )}
              </span>
              <span className="forget-error-wrapper">
                <Link to="/forget-code" className="forget-btn">
                  فراموشی کد!
                </Link>
                <span className="input-error">کد نامعتبر !</span>
              </span>
            </span>
            <span className="enter-btn">ورود</span>
          </span>
        </div>
      </section>
    </>
  );
};

export default Login;
