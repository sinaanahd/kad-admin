import axios from "axios";
import React, { useState } from "react";
import LittleLoading from "../../reusable/little-loading";
import convert_to_persian from "../../functions/convert-to-persian";
import convert_days from "../../functions/convert-days";
import urls from "../../urls/urls";
const Upload = ({
  set_allow_upload,
  active_session,
  set_active_session,
  get_jalasat,
  find_single_class,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pause, setPause] = useState(false);
  const [type, set_type] = useState("نمونه جزوه");
  const [title, setTitle] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if the selected file is a PDF
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a PDF file.");
    }
  };
  const handleUpload = () => {
    if (!selectedFile) {
      alert("فایلی انتخاب نشده است");
      return;
    }
    if (!title) {
      alert("عنوان را وارد کنید");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("jalase_id", active_session.jalase_id);
    formData.append("spf_title", title);
    formData.append("file_type", type);
    setPause(true);
    axios
      .post(urls.admin_pdfs, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setPause(false);
        const jalase = res.data;
        console.log(jalase);
        set_active_session(jalase);
        get_jalasat();
        find_single_class();
      })
      .catch((e) => console.log(e));
  };
  // const make_new_set = (jalase) => {
  //   const temp_jalasat = [...jalasat];
  //   const index = temp_jalasat.indexOf(jalase);
  //   console.log(index);
  //   // temp_jalasat.splice(index, 1, jalase);
  //   // set_jalasat(temp_jalasat);
  // };
  const fill_input = (value) => {
    if (value.length > 3) {
      setTitle(value);
    } else {
      setTitle("short");
    }
  };
  return (
    <div className="make-file-inputs-wrapper">
      <div className="make-file-header">
        <h2 className="semi-title">
          تعریف فایل در جلسه{" "}
          {active_session ? active_session.jalase_title : <LittleLoading />}
        </h2>
        <span
          className="close-btn"
          onClick={() => {
            set_allow_upload(false);
          }}
        >
          بستن X
        </span>
      </div>
      <h3 className="session-name-detail">
        <span className="session-num">
          جلسه{" "}
          {active_session ? active_session.jalase_title : <LittleLoading />}
        </span>
        {active_session ? (
          convert_days(active_session.week_day_name)
        ) : (
          <LittleLoading />
        )}{" "}
        -
        {active_session ? (
          active_session.start_time.split(":")[0] +
          ":" +
          active_session.start_time.split(":")[1] +
          "-" +
          active_session.finish_time.split(":")[0] +
          ":" +
          active_session.finish_time.split(":")[1]
        ) : (
          <LittleLoading />
        )}
        {/* {active_session.start_time.split(":")[0] +
          ":" +
          active_session.start_time.split(":")[1]}
        -
        {active_session.finish_time.split(":")[0] +
          ":" +
          active_session.finish_time.split(":")[1]} */}
      </h3>
      <h4 className="pick-title">انتخاب نوع دسته فایل</h4>
      <div className="pick-file-cat">
        <span
          onClick={() => {
            set_type("نمونه جزوه");
          }}
          className={
            type === "نمونه جزوه" ? "cat-wrapper cat-selected" : "cat-wrapper"
          }
        >
          جزوه
        </span>
        <span
          onClick={() => {
            set_type("نمونه تکلیف");
          }}
          className={
            type === "نمونه تکلیف" ? "cat-wrapper cat-selected" : "cat-wrapper"
          }
        >
          تکلیف
        </span>
        <span
          onClick={() => {
            set_type("نمونه آزمون");
          }}
          className={
            type === "نمونه آزمون" ? "cat-wrapper cat-selected" : "cat-wrapper"
          }
        >
          آزمون
        </span>
      </div>
      <h4 className="pick-title">عنوان {type.split(" ")[1]}</h4>
      <input
        type="text"
        className="chose-title-input"
        placeholder="مبحثی از هرچی"
        onInput={({ target }) => {
          fill_input(target.value);
        }}
      />
      <span className="error-input">
        {title === "short" ? "نام وارد شده کوتاه است" : ""}
      </span>
      {/* <div className="chosen-files">
        <span className="file-img">FILE</span>
        <span className="uploaded-files">
          <span className="uploaded-file">
            <span className="uploaded-file-name">
              توضیح و حل مسئله در مورد فصل نوسان فیزیک دوازدهم ریاضی.pdf
            </span>
            <span className="delete-btn">پاک کردن</span>
          </span>
        </span>
      </div> */}
      <div className="upload-file-btns">
        <label htmlFor="file-input" className="upload-btn">
          انتخاب فایل
        </label>

        <input
          type="file"
          name=""
          id="file-input"
          placeholder="انتخاب فایل"
          accept=".pdf"
          className="hidden-input-file"
          onChange={handleFileChange}
        />

        <span
          onClick={() => {
            handleUpload();
          }}
          className="submit-files-btn"
        >
          {pause ? <LittleLoading /> : "ثبت فایل در دسته بندی"}
        </span>
      </div>
    </div>
  );
};

export default Upload;
