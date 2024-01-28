import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import { DataContext } from "../context/DataContext";
import axios from "axios";
import urls from "../urls/urls";
import LittleLoading from "../reusable/little-loading";
import SpecialGroup from "./special-group/special-group";
let count = 0;
const SpecialKelasses = () => {
  const { kelasses } = useContext(DataContext);
  const [newest, set_newest] = useState(false);
  const [most_sale, set_most_sale] = useState(false);
  const [week_offer, set_week_offer] = useState(false);
  const ids_path = ["type1", "type2", "type3", "type4"];
  const get_newest = () => {
    axios
      .get(`${urls.specialKelasesList}type1`)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          set_newest(response);
        } else {
          console.log(error);
          alert("مشکلی در دریافت کلاس های پیش آمده");
          set_newest([]);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("مشکلی در دریافت کلاس های پیش آمده");
        set_newest([]);
      });
  };
  const get_most_sale = () => {
    axios
      .get(`${urls.specialKelasesList}type1`)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          set_most_sale(response);
        } else {
          console.log(error);
          alert("مشکلی در دریافت کلاس های پیش آمده");
          set_most_sale([]);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("مشکلی در دریافت کلاس های پیش آمده");
        set_most_sale([]);
      });
  };
  const get_week_offer = () => {
    axios
      .get(`${urls.specialKelasesList}type1`)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          set_week_offer(response);
        } else {
          console.log(error);
          alert("مشکلی در دریافت کلاس های پیش آمده");
          set_week_offer([]);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("مشکلی در دریافت کلاس های پیش آمده");
        set_week_offer([]);
      });
  };
  useEffect(() => {
    if (count === 0) {
      get_newest();
      get_most_sale();
      get_week_offer();
    }
    count++;
  });
  const newest_kelasses =
    newest && kelasses
      ? kelasses.filter((k) => newest.includes(k.kelas_id))
      : false;
  const most_sale_kelasses =
    most_sale && kelasses
      ? kelasses.filter((k) => most_sale.includes(k.kelas_id))
      : false;
  const week_offer_kelasses =
    week_offer && kelasses
      ? kelasses.filter((k) => week_offer.includes(k.kelas_id))
      : false;
  return (
    <>
      <Helmet>
        <title>انتخاب دسته بندی ویژه</title>
      </Helmet>
      <section className="special-classes-page-wrapper page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="special-classes-page mm-width">
            <div className="section-header">
              <h1 className="page-title">انتخاب دسته بندی ویژه</h1>
            </div>
            <div className="special-kind-wrapper">
              <h2 className="special-kind-title">جدیدترین کلاس ها</h2>
              <div className="kelasses-div">
                {newest_kelasses ? (
                  <SpecialGroup
                    kelasses={newest_kelasses}
                    type={"type1"}
                    setter_func={set_newest}
                  />
                ) : (
                  <LittleLoading />
                )}
              </div>
            </div>
            <div className="special-kind-wrapper">
              <h2 className="special-kind-title">پرفروش ترین کلاس ها</h2>
              <div className="kelasses-div">
                {most_sale_kelasses ? (
                  <SpecialGroup
                    kelasses={most_sale_kelasses}
                    type={"type2"}
                    setter_func={set_most_sale}
                  />
                ) : (
                  <LittleLoading />
                )}
              </div>
            </div>
            <div className="special-kind-wrapper">
              <h2 className="special-kind-title">تخفیف هفته</h2>
              <div className="kelasses-div">
                {week_offer_kelasses ? (
                  <SpecialGroup
                    kelasses={week_offer_kelasses}
                    type={"type3"}
                    setter_func={set_week_offer}
                  />
                ) : (
                  <LittleLoading />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecialKelasses;
