import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import LittleLoading from "../reusable/little-loading";
import { DataContext } from "../context/DataContext";
import axios from "axios";
const Banners = () => {
  const { banners, setBanners, get_banners } = useContext(DataContext);
  const [dashboard_banners, setDashboard_banners] = useState([]);
  const [shop_banners, setShop_banners] = useState([]);
  const [pop_up_banner, setPop_up_banner] = useState(false);
  const [panel_selectedFile, setBannerSelectedFile] = useState(null);
  const [shop_selectedFile, setShopSelectedFile] = useState(null);
  const [panel_pause, set_panel_pause] = useState(false);
  const [shop_pause, set_shop_pause] = useState(false);
  const [panel_d_pause, set_panel_d_pause] = useState(false);
  const [shop_d_pause, set_shop_d_pause] = useState(false);

  useEffect(() => {
    get_banners();
  }, []);

  const add_dashboard_banner = (banner) => {
    const old_dashboard_banners = [...dashboard_banners];
    if (old_dashboard_banners.includes(banner)) {
      const index = old_dashboard_banners.findIndex((b) => b === banner);
      old_dashboard_banners.splice(index, 1);
    } else {
      old_dashboard_banners.push(banner);
    }
    setDashboard_banners(old_dashboard_banners);
  };
  const add_shop_banner = (banner) => {
    const old_shop_banners = [...shop_banners];
    if (old_shop_banners.includes(banner)) {
      const index = old_shop_banners.findIndex((b) => b === banner);
      old_shop_banners.splice(index, 1);
    } else {
      old_shop_banners.push(banner);
    }
    setShop_banners(old_shop_banners);
  };
  const main_page_banners = [
    ...banners.filter((b) => b.banner_type === "main_page_banners"),
  ];
  const store_banners = [
    ...banners.filter((b) => b.banner_type === "store_banners"),
  ];

  const handleFileChangePanel = (e) => {
    const file = e.target.files[0];
    setBannerSelectedFile(file);
  };
  const panel_upload_file = () => {
    if (!panel_selectedFile) {
      alert("فایلی انتخاب نشده است");
      return;
    }
    const formData = new FormData();
    formData.append("file", panel_selectedFile);
    formData.append("banner_farsi_type", "پنل دانش آموز");
    set_panel_pause(true);
    axios
      .post("https://kadschool.com/backend/kad_api/admin_banners", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        set_panel_pause(false);
        const all_banners = res.data;
        console.log(all_banners);
        setBanners(all_banners);
        localStorage.setItem("banners", JSON.stringify(all_banners));
      })
      .catch((e) => console.log(e));
  };
  const handleFileChangeShop = (e) => {
    const file = e.target.files[0];
    setShopSelectedFile(file);
  };
  const shop_upload_file = () => {
    if (!shop_selectedFile) {
      alert("فایلی انتخاب نشده است");
      return;
    }
    const formData = new FormData();
    formData.append("file", shop_selectedFile);
    formData.append("banner_farsi_type", "فروشگاه");
    set_shop_pause(true);
    axios
      .post("https://kadschool.com/backend/kad_api/admin_banners", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        set_shop_pause(false);
        const all_banners = res.data;
        console.log(all_banners);
        setBanners(all_banners);
        localStorage.setItem("banners", JSON.stringify(all_banners));
      })
      .catch((e) => console.log(e));
  };
  const delete_panel_banner = () => {
    if (dashboard_banners.length !== 0) {
      set_panel_d_pause(true);
      axios
        .patch("https://kadschool.com/backend/kad_api/admin_banners", {
          deleting_list: dashboard_banners,
        })
        .then((res) => {
          const all_banners = res.data;
          console.log(all_banners);
          setBanners(all_banners);
          set_panel_d_pause(false);
          localStorage.setItem("banners", JSON.stringify(all_banners));
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      alert("یک بنر برای حذف انتخاب کنید");
    }
  };
  const delete_shop_banner = () => {
    if (shop_banners.length !== 0) {
      set_shop_d_pause(true);
      axios
        .patch("https://kadschool.com/backend/kad_api/admin_banners", {
          deleting_list: shop_banners,
        })
        .then((res) => {
          const all_banners = res.data;
          console.log(all_banners);
          setBanners(all_banners);
          set_shop_d_pause(false);
          localStorage.setItem("banners", JSON.stringify(all_banners));
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      alert("یک بنر برای حذف انتخاب کنید");
    }
  };
  return (
    <>
      <Helmet>
        <title>بنرها</title>
      </Helmet>
      <section className="banners-page-wrapper page-wrapper">
        <SideBar />
        <div className="main-content">
          <WelcomeName />
          <div className="banners-main-content mm-width">
            <h1 className="page-title">بنر ها</h1>
            <div className="dashboard-banner">
              <h2 className="section-title">بنر‌های پنل دانش آموز</h2>
              <div className="add-new-banner">
                <label htmlFor="dashboard-banner" className="file-input-label">
                  + آپلود بنر جدید
                </label>
                <input
                  type="file"
                  name=""
                  className="hidden-file-input"
                  id="dashboard-banner"
                  accept=".jpg,.png,.jpeg"
                  onChange={handleFileChangePanel}
                />
                {!panel_pause ? (
                  <span
                    className="upload-btn"
                    onClick={() => {
                      panel_upload_file();
                    }}
                  >
                    ثبت
                  </span>
                ) : (
                  <span className="upload-btn">
                    <LittleLoading />
                  </span>
                )}
              </div>
              <div className="uploaded-banners-wrapper">
                {banners ? (
                  main_page_banners.length !== 0 ? (
                    main_page_banners.map((b) => (
                      <div
                        className={
                          dashboard_banners.includes(b.banner_id)
                            ? "uploaded-banner selected-banner"
                            : "uploaded-banner"
                        }
                        key={b.banner_id}
                      >
                        <img
                          src={b.image_link}
                          onClick={() => {
                            setPop_up_banner(b.image_link);
                          }}
                          loading="lazy"
                        />
                        <span
                          onClick={() => {
                            add_dashboard_banner(b.banner_id);
                          }}
                          className="delte-btn"
                        >
                          حذف بنر
                        </span>
                      </div>
                    ))
                  ) : (
                    "بنری وجود ندارد"
                  )
                ) : (
                  <LittleLoading />
                )}
              </div>
              <div className="delete-btn-place">
                {panel_d_pause ? (
                  <div className="delete-selected-banner">
                    <LittleLoading />
                  </div>
                ) : (
                  <div
                    className="delete-selected-banner"
                    onClick={() => {
                      delete_panel_banner();
                    }}
                  >
                    حذف موارد انتخاب شده
                  </div>
                )}
              </div>
            </div>
            <div className="dashboard-banner shop-banners">
              <h2 className="section-title">بنر‌های فروشگاه</h2>
              <div className="add-new-banner">
                <label htmlFor="shop-banner" className="file-input-label">
                  + آپلود بنر جدید
                </label>
                <input
                  type="file"
                  name=""
                  className="hidden-file-input"
                  id="shop-banner"
                  onChange={handleFileChangeShop}
                  accept=".jpg,.png,.jpeg"
                />
                {shop_pause ? (
                  <span className="upload-btn">
                    <LittleLoading />
                  </span>
                ) : (
                  <span
                    className="upload-btn"
                    onClick={() => {
                      shop_upload_file();
                    }}
                  >
                    ثبت
                  </span>
                )}
              </div>
              <div className="uploaded-banners-wrapper">
                {banners ? (
                  store_banners.length !== 0 ? (
                    store_banners.map((b) => (
                      <div
                        className={
                          shop_banners.includes(b.banner_id)
                            ? "uploaded-banner selected-banner"
                            : "uploaded-banner"
                        }
                        key={b.banner_id}
                      >
                        <img
                          src={b.image_link}
                          onClick={() => {
                            setPop_up_banner(b.image_link);
                          }}
                          loading="lazy"
                        />
                        <span
                          onClick={() => {
                            add_shop_banner(b.banner_id);
                          }}
                          className="delte-btn"
                        >
                          حذف بنر
                        </span>
                      </div>
                    ))
                  ) : (
                    "بنری وجود ندارد"
                  )
                ) : (
                  <LittleLoading />
                )}
              </div>
              <div className="delete-btn-place">
                {shop_d_pause ? (
                  <div className="delete-selected-banner">
                    <LittleLoading />
                  </div>
                ) : (
                  <div
                    className="delete-selected-banner"
                    onClick={() => {
                      delete_shop_banner();
                    }}
                  >
                    حذف موارد انتخاب شده
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {pop_up_banner ? (
          <div
            className="banner-pop-up"
            onClick={() => {
              setPop_up_banner(false);
            }}
          >
            <img loading="lazy" src={pop_up_banner} alt="" />
          </div>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default Banners;
