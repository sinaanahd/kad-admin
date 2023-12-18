// DataContext.js
import axios from "axios";
import { createContext, useState, useEffect, useRef } from "react";
import last_login_check from "../functions/last-login-check";
import tell_total from "../functions/test";
import split_in_three from "../functions/spilit_in_three";
import Header from "../header/header";
import urls from "../urls/urls";
const DataContext = createContext();

const local_user = JSON.parse(localStorage.getItem("admin-data")) || false;
const local_factors = JSON.parse(localStorage.getItem("factors")) || false;
const last_time = JSON.parse(localStorage.getItem("last-time")) || false;
const local_kelasses = JSON.parse(localStorage.getItem("kelasses")) || false;
const local_doreha = JSON.parse(localStorage.getItem("doreha")) || false;
const local_teachers = JSON.parse(localStorage.getItem("teachers")) || false;
const local_allow_login = JSON.parse(localStorage.getItem("all_users"))
  ? true
  : false;
const local_account_info =
  JSON.parse(localStorage.getItem("account_info")) || false;
const local_essentials =
  JSON.parse(localStorage.getItem("essentials")) || false;
const local_all_users = JSON.parse(localStorage.getItem("all_users")) || false;
const local_admin_change_history =
  JSON.parse(localStorage.getItem("admin_change_history")) || [];
const local_jalasat = JSON.parse(localStorage.getItem("jalasat")) || false;
const local_sample_files =
  JSON.parse(localStorage.getItem("sample_files")) || false;
const local_all_admins =
  JSON.parse(localStorage.getItem("all_admins")) || false;
const local_banners = JSON.parse(localStorage.getItem("banners")) || false;
const local_courses = JSON.parse(localStorage.getItem("courses")) || false;
const local_accounting_payments =
  JSON.parse(localStorage.getItem("accounting_payments")) || false;
const local_products = JSON.parse(localStorage.getItem("products")) || false;
const local_not_approved =
  JSON.parse(localStorage.getItem("n-approved")) || false;
const now_time = new Date().getTime();
const DataProvider = ({ children }) => {
  const [user, setUser] = useState(local_user);
  const [factors, setFactors] = useState(local_factors);
  const [kelasses, setKelasses] = useState(local_kelasses);
  const [teachers, setTeachers] = useState(local_teachers);
  const [essentials, setEssentials] = useState(local_essentials);
  const [account_info, setAccountInfo] = useState(local_account_info);
  const [all_users, setAll_users] = useState(local_all_users);
  const [history, setHistory] = useState(local_admin_change_history);
  const [allow_login, set_allow_login] = useState(local_allow_login);
  const [doreha, setDoreha] = useState(local_doreha);
  const [jalasat, set_jalasat] = useState(local_jalasat);
  const [sample_files, set_sample_files] = useState(local_sample_files);
  const [all_admins, setAll_admins] = useState(local_all_admins);
  const [banners, setBanners] = useState(local_banners);
  const [courses, setCourses] = useState(local_courses);
  const [accounting_payments, set_accounting_payments] = useState(
    local_accounting_payments
  );
  const [products, set_products] = useState(local_products);
  const [not_approved_classes, set_not_approved_classes] =
    useState(local_not_approved);
  const [years, setYears] = useState([
    {
      id: 10,
      name: "دهم",
    },
    {
      id: 11,
      name: "یازدهم",
    },
    {
      id: 12,
      name: "دوازدهم",
    },
    {
      id: 18,
      name: "کنکور",
    },
    {
      id: 0,
      name: "فارغ التحصیل",
    },
  ]);
  const [subjects, setSubjects] = useState([
    { id: 0, name: "ریاضی" },

    { id: 1, name: "تجربی" },

    { id: 2, name: "انسانی" },

    { id: 3, name: "هنر" },
  ]);

  const updateUser = (newData) => {
    setUser(newData);
  };

  useEffect(() => {
    const is_time = last_login_check(last_time, now_time);
    // get_courses();
    // get_not_approved_classes();
    if (user) {
      if (is_time) {
        get_kelasses();
        get_teachers();
        get_admin_requirments();
        get_all_users();
        get_admin_account();
        get_jalasat();
        get_doreha();
        get_sample_files();
        get_factors();
        get_banners();
        get_courses();
        get_not_approved_classes();
        get_products();
        get_accounting_payments();
      } else {
        if (!local_factors) {
          get_factors();
        }
        if (!local_kelasses) {
          get_kelasses();
        }
        if (!local_teachers) {
          get_teachers();
        }
        if (!local_essentials) {
          get_admin_requirments();
        }
        if (!local_account_info) {
          get_admin_account();
        }
        if (!local_all_users) {
          get_all_users();
        }
        if (!local_doreha) {
          get_doreha();
        }
        if (!local_jalasat) {
          get_jalasat();
        }
        if (!local_sample_files) {
          get_sample_files();
        }
        if (!local_all_admins) {
          get_all_admins();
        }
        if (!local_banners) {
          get_banners();
        }
        if (!local_courses) {
          get_courses();
        }
        if (!local_not_approved) {
          get_not_approved_classes();
        }
        if (!local_products) {
          get_products();
        }
        if (!local_accounting_payments) {
          get_accounting_payments();
        }
      }
    } else {
      get_kelasses();
      get_teachers();
      get_all_users();
      get_doreha();
      get_jalasat();
      get_sample_files();
      get_all_admins();
      get_banners();
      get_not_approved_classes();
      get_accounting_payments();
      get_products();
    }
  }, []);
  const get_all_users = () => {
    localStorage.setItem("allow-login", JSON.stringify(false));
    set_allow_login(false);
    axios
      .get(urls.admin_users)
      .then((res) => {
        setAll_users(res.data);
        localStorage.setItem("all_users", JSON.stringify(res.data));
        localStorage.setItem("allow-login", JSON.stringify(true));
        set_allow_login(true);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_admin_account = () => {
    axios
      .get(
        `${urls.admin_account}${user.admin_id}`
        // `https://kadschool.com/backend/kad_api/admin_account/6`
      )
      .then((res) => {
        const account_info = res.data;
        //const this_month = 3;
        //console.log(account_info);
        const this_month = convert_number(
          new Date().toLocaleDateString("fa").split("/")[1]
        );
        const this_month_pays = [];
        let sum = 0;
        account_info.transactions.forEach((item) => {
          let item_month = convert_number(
            new Date(item.action_datetime)
              .toLocaleDateString("fa")
              .split("/")[1]
          );

          if (item_month === this_month) {
            this_month_pays.push({ ...item.pay_obj, porfit: item.amount });
            sum += item.amount;
          }
        });
        account_info.this_month_pays = this_month_pays;
        account_info.monthly_profit = sum;

        const transactions = account_info.transactions.toReversed();
        account_info.transactions = transactions;
        localStorage.setItem("account_info", JSON.stringify(account_info));
        setAccountInfo(account_info);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const convert_number = (date) => {
    switch (date) {
      case "۱":
        return 1;
      case "۲":
        return 2;
      case "۳":
        return 3;
      case "۴":
        return 4;
      case "۵":
        return 5;
      case "۶":
        return 6;
      case "۷":
        return 7;
      case "۸":
        return 8;
      case "۹":
        return 9;
      case "۱۰":
        return 10;
      case "۱۱":
        return 11;
      case "۱۲":
        return 12;
      default:
        return -1;
    }
  };
  const get_admin_requirments = (e) => {
    axios
      .get(`${urls.admin_requirments}${user.admin_id}`)
      .then((res) => {
        const essentials = res.data;
        localStorage.setItem("essentials", JSON.stringify(essentials));
        setEssentials(essentials);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_factors = () => {
    axios
      .get(urls.admin_financials)
      .then((res) => {
        const factors = res.data.toReversed();
        localStorage.setItem("factors", JSON.stringify(factors));
        setFactors(factors);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_kelasses = () => {
    axios
      .get(urls.kelasses)
      .then((res) => {
        const kelasses = res.data;
        setKelasses(kelasses);
        localStorage.setItem("kelasses", JSON.stringify(kelasses));
        // set_not_approved_classes(kelasses);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_teachers = () => {
    axios
      .get(urls.teachers)
      .then((res) => {
        const teachers = res.data;
        setTeachers(teachers);
        localStorage.setItem("teachers", JSON.stringify(teachers));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const setNewHistory = (history) => {
    setHistory(history);
    localStorage.setItem("admin_change_history", JSON.stringify(history));
  };
  const check_login = (data) => {
    get_all_users();
    const login_interval = setInterval(() => {
      check_login(data);
      console.log("hi", allow_login);
    }, 1000);
    if (allow_login) {
      clearInterval(login_interval);
      localStorage.setItem("admin-data", JSON.stringify(data));
      updateUser(data);
      window.location.pathname = "/account";
      //console.log(allow_login, all_users);
    }
  };
  const get_doreha = () => {
    axios
      .get(urls.doreha)
      .then((res) => {
        const doreha = res.data;
        setDoreha(doreha);
        localStorage.setItem("doreha", JSON.stringify(doreha));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_jalasat = () => {
    axios
      .get(urls.jalasat)
      .then((res) => {
        const jalasat = res.data;
        set_jalasat(jalasat);
        localStorage.setItem("jalasat", JSON.stringify(jalasat));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_sample_files = (e) => {
    axios
      .get(urls.sample_files)
      .then((res) => {
        const sample_files = res.data;
        set_sample_files(sample_files);
        localStorage.setItem("sample_files", JSON.stringify(sample_files));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_all_admins = (e) => {
    axios
      .get(urls.all_admins_accounts)
      .then((res) => {
        const all_admins = res.data;
        // console.log(all_admins);
        localStorage.setItem("all_admins", JSON.stringify(all_admins));
        setAll_admins(all_admins);
      })
      .catch((e) => console.log(e.message));
  };
  const get_banners = () => {
    // https://kadschool.com/backend/kad_api/admin_banners
    axios
      .get(urls.banners)
      .then((res) => {
        const banners = res.data;
        // console.log(banners);
        setBanners(banners);
        localStorage.setItem("banners", JSON.stringify(banners));
      })
      .catch((e) => console.log(e.message));
  };
  const get_courses = () => {
    axios
      .get(urls.all_courses)
      .then((res) => {
        const courses = res.data;
        setCourses(courses);
        // console.log(courses);
        localStorage.setItem("courses", JSON.stringify(courses));
      })
      .catch((e) => console.log(e.message));
  };
  const get_not_approved_classes = () => {
    axios
      .get(urls.admin_confirm_kelas)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          const not_approved = response;
          // console.log(not_approved);
          localStorage.setItem("n-approved", JSON.stringify(not_approved));
          set_not_approved_classes(not_approved);
        } else {
          console.log(error);
        }
      })
      .catch((e) => console.log(e.message));
  };
  const get_accounting_payments = () => {
    // console.log("started");
    axios
      .get(urls.accounting_payments)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          set_accounting_payments(response);
          // console.log(response);
          localStorage.setItem("accounting_payments", JSON.stringify(response));
        } else {
          console.log(error);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_products = () => {
    axios
      .get(urls.products)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          set_products(response);
          localStorage.setItem("products", JSON.stringify(response));
        } else {
          console.log(error);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <DataContext.Provider
      value={{
        user,
        updateUser,
        factors,
        kelasses,
        teachers,
        essentials,
        account_info,
        all_users,
        history,
        setNewHistory,
        doreha,
        get_kelasses,
        jalasat,
        sample_files,
        get_sample_files,
        set_jalasat,
        get_jalasat,
        get_factors,
        setAll_users,
        get_all_users,
        all_admins,
        get_all_admins,
        banners,
        setBanners,
        get_banners,
        courses,
        years,
        subjects,
        not_approved_classes,
        set_not_approved_classes,
        accounting_payments,
        set_accounting_payments,
        get_accounting_payments,
        products,
      }}
    >
      {window.location.pathname === "/login" ? <></> : <Header />}
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
