// DataContext.js
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import last_login_check from "../functions/last-login-check";
import tell_total from "../functions/test";
import split_in_three from "../functions/spilit_in_three";
const DataContext = createContext();

const local_user = JSON.parse(localStorage.getItem("admin-data")) || false;
const local_factors = JSON.parse(localStorage.getItem("factors")) || false;
const last_time = JSON.parse(localStorage.getItem("last-time")) || false;
const local_kelasses = JSON.parse(localStorage.getItem("kelasses")) || false;
const local_teachers = JSON.parse(localStorage.getItem("teachers")) || false;
const local_account_info =
  JSON.parse(localStorage.getItem("account_info")) || false;
const local_essentials =
  JSON.parse(localStorage.getItem("essentials")) || false;
const local_all_users = JSON.parse(localStorage.getItem("all_users")) || false;
const local_admin_change_history =
  JSON.parse(localStorage.getItem("admin_change_history")) || [];
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
  const updateUser = (newData) => {
    setUser(newData);
  };

  useEffect(() => {
    // const data = split_in_three(Math.ceil(tell_total()));
    // console.log(data);
    //get_factors();
    //get_admin_regestries();
    get_admin_account();
    const is_time = last_login_check(last_time, now_time);
    if (user) {
      if (is_time) {
        get_kelasses();
        get_teachers();
        get_admin_requirments();
        get_all_users();
        if (user.level === 20) {
          get_factors();
        }
      } else {
        if (user.level === 20) {
          if (!local_factors) {
            get_factors();
          }
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
      }
    }
  }, []);
  const get_all_users = () => {
    axios
      .get("https://kadschool.com/backend/kad_api/admin_users")
      .then((res) => {
        setAll_users(res.data);
        localStorage.setItem("all_users", JSON.stringify(res.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_admin_account = (e) => {
    axios
      .get(
        `https://kadschool.com/backend/kad_api/admin_account/${user.admin_id}`
      )
      .then((res) => {
        const account_info = res.data;
        //const this_month = 3;
        console.log(account_info);
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
          // if (item.pay_naghd_datetime) {
          //item_month =
          //   if (item_month === this_month) {
          //     this_month_pays.push(item);
          //   }
          // } else if (item.pay1_datetime) {
          //   item_month = convert_number(
          //     new Date(item.pay1_datetime)
          //       .toLocaleDateString("fa")
          //       .split("/")[1]
          //   );
          //   if (item_month === this_month) {
          //     this_month_pays.push(item);
          //   }
          // } else if (item.pay2_datetime) {
          //   item_month = convert_number(
          //     new Date(item.pay2_datetime)
          //       .toLocaleDateString("fa")
          //       .split("/")[1]
          //   );
          //   if (item_month === this_month) {
          //     this_month_pays.push(item);
          //   }
          // } else if (item.pay3_datetime) {
          //   item_month = convert_number(
          //     new Date(item.pay3_datetime)
          //       .toLocaleDateString("fa")
          //       .split("/")[1]
          //   );
          //   if (item_month === this_month) {
          //     this_month_pays.push(item);
          //   }
          // }
        });
        account_info.this_month_pays = this_month_pays;
        account_info.monthly_profit = sum;

        const children_old = [];
        account_info.children_ids.forEach((ci) => {
          const child_user = all_users.find((u) => u.user_id === ci);
          if (Object.keys(child_user).length !== 0) {
            children_old.push(child_user);
          }
        });
        const children_new = children_old.toReversed();
        // console.log(children_old, children_new);
        account_info.children = children_new;

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
  // const get_admin_regestries = () => {
  //   axios
  //     .get(
  //       `https://kadschool.com/backend/kad_api/admin_account/${user.admin_id}`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((e) => {
  //       console.log(e.message);
  //     });
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
