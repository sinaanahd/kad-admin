import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import LittleLoading from "../reusable/little-loading";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

import space_bg from "../../asset/images/landing-bg.webp";
import show_pass from "../../asset/images/show-pass.svg";
import hide_pass from "../../asset/images/eye-open.svg";
const Login = () => {
  const { user, updateUser } = useContext(DataContext);
  const [pass, setPass] = useState(false);
  const [password, setPassWord] = useState(false);
  const [err, setErr] = useState(false);
  const [pause, setPause] = useState(false);
  const handle_pass = () => {
    setPass(!pass);
  };
  useEffect(() => {
    if (user) {
      window.location.pathname = "/account";
    }
  }, []);
  const handle_password_check = () => {
    setPause(true);
    axios
      .get(`https://kadschool.com/backend/kad_api/admin_login/${password}`)
      .then((res) => {
        // setPause(false);
        const { result } = res.data;
        if (result) {
          localStorage.setItem("admin-data", JSON.stringify(res.data));
          updateUser(res.data);
          window.location.pathname = "/account";
          //check_login(res.data);
        } else {
          setErr("کد نامعتبر !");
          setPass(false);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const check_pass_input = (target) => {
    const { value } = target;
    if (value.length !== 0) {
      setPassWord(value);
    } else {
      setPassWord(false);
      setErr("کد وارد نشده");
    }
  };

  return (
    <>
      <Helmet>
        <title>پنل مدیریت سایت کاد</title>
        <link as="preload" href={space_bg} />
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
                onInput={({ target }) => {
                  check_pass_input(target);
                }}
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
                  <img
                    src={hide_pass}
                    alt="نمایش دادن رمز"
                    width={17}
                    height={17}
                    className="show-pos"
                  />
                )}
              </span>
              <span className="forget-error-wrapper">
                <Link to="/forget-code" className="forget-btn">
                  فراموشی کد!
                </Link>
                {err ? <span className="input-error">{err}</span> : <></>}
              </span>
            </span>
            {password ? (
              <span
                className="enter-btn"
                onClick={() => {
                  handle_password_check();
                }}
              >
                {pause ? <LittleLoading /> : "ورود"}
              </span>
            ) : (
              <span className="enter-btn not-allowed">ورود</span>
            )}
          </span>
        </div>
      </section>
    </>
  );
};

export default Login;
