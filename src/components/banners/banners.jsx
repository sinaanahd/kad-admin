import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import LittleLoading from "../reusable/little-loading";
import { DataContext } from "../context/DataContext";
import axios from "axios";
import urls from "../urls/urls";
const Banners = () => {
  const { banners, setBanners, get_banners } = useContext(DataContext);
  const [dashboard_banners, setDashboard_banners] = useState([]);
  const [shop_banners, setShop_banners] = useState([]);
  const [pop_up_banner, setPop_up_banner] = useState(false);
  const [panel_selectedFile, setBannerSelectedFile] = useState(null);
  const [shop_selectedFile, setShopSelectedFile] = useState(null);
  const [main_selectedFile, setMainSelectedFile] = useState(null);
  const [panel_pause, set_panel_pause] = useState(false);
  const [shop_pause, set_shop_pause] = useState(false);
  const [main_pause, set_main_pause] = useState(false);
  const [panel_d_pause, set_panel_d_pause] = useState(false);
  const [shop_d_pause, set_shop_d_pause] = useState(false);
  const [main_d_pause, set_main_d_pause] = useState(false);
  const [main_banners, setMain_banners] = useState([]);
  const [img, setImg] = useState(false);
  const [main_banner_link, set_main_banner_link] = useState(false);
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
  const add_main_banner = (banner) => {
    const old_main_banners = [...main_banners];
    if (old_main_banners.includes(banner)) {
      const index = old_main_banners.findIndex((b) => b === banner);
      old_main_banners.splice(index, 1);
    } else {
      old_main_banners.push(banner);
    }
    setMain_banners(old_main_banners);
  };
  const main_page_banners = banners
    ? [...banners.filter((b) => b.banner_type === "main_page_banners")]
    : [];
  const store_banners = banners
    ? [...banners.filter((b) => b.banner_type === "store_banners")]
    : [];
  const home_page_banners = banners
    ? [...banners.filter((b) => b.banner_type === "home_page_banners")]
    : [];
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
    formData.append("target_page_link", "test-target");
    set_panel_pause(true);
    axios
      .post(urls.banners, formData, {
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
    formData.append("target_page_link", "test-target");
    set_shop_pause(true);
    axios
      .post(urls.banners, formData, {
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
  const handleFileChangeMain = (e) => {
    const file = e.target.files[0];
    setMainSelectedFile(file);
  };
  const handle_img = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImg(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const main_upload_file = () => {
    if (!main_selectedFile) {
      alert("فایلی انتخاب نشده است");
      return;
    } else if (!main_banner_link) {
      alert("لینک بنر وارد نشده است");
      return;
    }
    const formData = new FormData();
    formData.append("file", main_selectedFile);
    formData.append("banner_farsi_type", "صفحه اصلی");
    formData.append("target_page_link", main_banner_link);
    set_main_pause(true);
    axios
      .post(urls.banners, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        set_main_pause(false);
        setMainSelectedFile(null);
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
        .patch(urls.banners, {
          deleting_list: dashboard_banners,
        })
        .then((res) => {
          const all_banners = res.data;
          console.log(all_banners);
          setBanners(all_banners);
          set_panel_d_pause(false);
          setDashboard_banners([]);
          localStorage.setItem("banners", JSON.stringify(all_banners));
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      alert("یک بنر برای حذف انتخاب کنید");
    }
  };
  const delete_main_banner = () => {
    if (main_banners.length !== 0) {
      set_main_d_pause(true);
      axios
        .patch(urls.banners, {
          deleting_list: main_banners,
        })
        .then((res) => {
          const all_banners = res.data;
          console.log(all_banners);
          setBanners(all_banners);
          set_main_d_pause(false);
          setMain_banners([]);
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
        .patch(urls.banners, {
          deleting_list: shop_banners,
        })
        .then((res) => {
          const all_banners = res.data;
          console.log(all_banners);
          setBanners(all_banners);
          set_shop_d_pause(false);
          setShop_banners([]);
          localStorage.setItem("banners", JSON.stringify(all_banners));
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      alert("یک بنر برای حذف انتخاب کنید");
    }
  };
  const get_page_link = (value) => {
    if (value.length !== 0) {
      set_main_banner_link(value);
    } else {
      set_main_banner_link(false);
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
                {panel_selectedFile ? (
                  !panel_pause ? (
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
                  )
                ) : (
                  <></>
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
              {dashboard_banners.length !== 0 ? (
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
              ) : (
                <></>
              )}
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
                {shop_selectedFile ? (
                  shop_pause ? (
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
                  )
                ) : (
                  <></>
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
              {shop_banners.length !== 0 ? (
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
              ) : (
                <></>
              )}
            </div>
            <div className="dashboard-banner main-banners">
              <h2 className="section-title">بنر‌های اصلی</h2>
              <div className="add-new-banner wrap-need">
                <label htmlFor="main-banner" className="file-input-label">
                  + آپلود بنر جدید
                </label>
                <input
                  type="file"
                  name=""
                  className="hidden-file-input"
                  id="main-banner"
                  onChange={(e) => {
                    handleFileChangeMain(e);
                    handle_img(e);
                  }}
                  accept=".jpg,.png,.jpeg"
                />
                {main_selectedFile && main_banner_link ? (
                  main_pause ? (
                    <span className="upload-btn">
                      <LittleLoading />
                    </span>
                  ) : (
                    <span
                      className="upload-btn"
                      onClick={() => {
                        main_upload_file();
                      }}
                    >
                      ثبت
                    </span>
                  )
                ) : (
                  <></>
                )}
                {main_selectedFile ? (
                  <div className="uploaded-img-text-input">
                    <img src={img} alt="" />
                    <input
                      type="text"
                      className="desired-link"
                      placeholder="لینک صفحه مربوطه"
                      onInput={({ target }) => {
                        get_page_link(target.value);
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="uploaded-banners-wrapper">
                {banners ? (
                  home_page_banners.length !== 0 ? (
                    home_page_banners.map((b) => (
                      <div
                        className={
                          main_banners.includes(b.banner_id)
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
                            add_main_banner(b.banner_id);
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
              {main_banners.length !== 0 ? (
                <div className="delete-btn-place">
                  {main_d_pause ? (
                    <div className="delete-selected-banner">
                      <LittleLoading />
                    </div>
                  ) : (
                    <div
                      className="delete-selected-banner"
                      onClick={() => {
                        delete_main_banner();
                      }}
                    >
                      حذف موارد انتخاب شده
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
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
