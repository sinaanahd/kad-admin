// DataContext.js
import axios from "axios";
import { createContext, useState, useEffect, useRef } from "react";
import last_login_check from "../functions/last-login-check";
import tell_total from "../functions/test";
import split_in_three from "../functions/spilit_in_three";
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

  const updateUser = (newData) => {
    setUser(newData);
  };

  useEffect(() => {
    const is_time = last_login_check(last_time, now_time);
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
      }
    } else {
      get_kelasses();
      get_teachers();
      get_all_users();
      get_doreha();
      get_jalasat();
      get_sample_files();
      get_all_admins();
    }
  }, []);
  // const prev_sample = useRef(sample_files);
  // const prev_jalasat = useRef(jalasat);
  // useEffect(() => {
  //   fill_sample_files();
  // }, [sample_files]);

  const get_all_users = () => {
    localStorage.setItem("allow-login", JSON.stringify(false));
    set_allow_login(false);
    axios
      .get("https://kadschool.com/backend/kad_api/admin_users")
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
        `https://kadschool.com/backend/kad_api/admin_account/${user.admin_id}`
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
      .get(
        `https://kadschool.com/backend/kad_api/admin_requirments/${user.admin_id}`
      )
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
      .get(`https://kadschool.com/backend/kad_api/admin_financials`)
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
      .get("https://kadschool.com/backend/kad_api/kelases")
      .then((res) => {
        const kelasses = res.data;
        setKelasses(kelasses);
        localStorage.setItem("kelasses", JSON.stringify(kelasses));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_teachers = () => {
    axios
      .get("https://kadschool.com/backend/kad_api/teachers")
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
      .get("https://kadschool.com/backend/kad_api/doreha")
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
      .get("https://kadschool.com/backend/kad_api/admin_jalasat")
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
      .get("https://kadschool.com/backend/kad_api/sample_files")
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
      .get("https://kadschool.com/backend/kad_api/all_admins_accounts")
      .then((res) => {
        const all_admins = res.data;
        // console.log(all_admins);
        localStorage.setItem("all_admins", JSON.stringify(all_admins));
        setAll_admins(all_admins);
      })
      .catch((e) => console.log(e.message));
  };
  // const fill_sample_files = () => {
  //   if (jalasat && sample_files) {
  //     const sub_sample = { ...sample_files };
  //     const sub_jalasat = [...jalasat];
  //     sub_jalasat.forEach((j) => {
  //       if (j.sample_files.pdf_sample_files_ids.length !== 0) {
  //         const sample_pdf_files = [];
  //         j.sample_files.pdf_sample_files_ids.forEach((pdf_id) => {
  //           const pdf = {
  //             ...sub_sample.pdf_sample_files.find((f) => f.file_id === pdf_id),
  //           };
  //           if (Object.keys(pdf).length !== 0) {
  //             sample_pdf_files.push(pdf);
  //           }
  //         });
  //         j.pdfs = sample_pdf_files;
  //       }
  //     });
  //     // console.log(sub_jalasat);
  //     set_jalasat(sub_jalasat);
  //     localStorage.setItem("jalasat", JSON.stringify(sub_jalasat));
  //   }
  // };
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
