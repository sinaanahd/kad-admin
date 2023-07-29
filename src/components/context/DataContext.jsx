// DataContext.js
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import last_login_check from "../functions/last-login-check";
const DataContext = createContext();

const local_user = JSON.parse(localStorage.getItem("admin-data")) || false;
const local_factors = JSON.parse(localStorage.getItem("factors")) || false;
const last_time = JSON.parse(localStorage.getItem("last-time")) || false;
const local_kelasses = JSON.parse(localStorage.getItem("kelasses")) || false;
const local_teachers = JSON.parse(localStorage.getItem("teachers")) || false;
const now_time = new Date().getTime();
const DataProvider = ({ children }) => {
  const [user, setUser] = useState(local_user);
  const [factors, setFactors] = useState(local_factors);
  const [kelasses, setKelasses] = useState(local_kelasses);
  const [teachers, setTeachers] = useState(local_teachers);
  const updateUser = (newData) => {
    setUser(newData);
  };

  useEffect(() => {
    const is_time = last_login_check(last_time, now_time);
    if (user) {
      if (is_time) {
        get_factors();
      } else {
        if (!factors) {
          get_factors();
        }
        if (!local_kelasses) {
          get_kelasses();
        }
        if (!local_teachers) {
          get_teachers();
        }
      }
    }
  }, []);
  const get_factors = () => {
    axios
      .get(`https://kadschool.com/backend/kad_api/admin_financials`)
      .then((res) => {
        const factors = res.data;
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
        console.log(kelasses);
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
        console.log(teachers);
        setTeachers(teachers);
        localStorage.setItem("teachers", JSON.stringify(teachers));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <DataContext.Provider
      value={{ user, updateUser, factors, kelasses, teachers }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
{
}
