import React, { useState, useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { DataContext } from "../../context/DataContext";
import scrollToTop from "../../functions/scroll";
const History = () => {
  const { history } = useContext(DataContext);
  const [more_history, setMoreHistory] = useState(false);
  return (
    <div className="log-and-search-wrapper">
      <div className="user-log-wrapper">
        <span className="title">تاریخچه تغییرات</span>
        <div className={!more_history ? "logs-wrapper" : "logs-wrapper opend"}>
          {history.length !== 0 ? (
            history.map((user) => (
              <Link
                to={`./users/${user.user_id}`}
                key={user.user_id}
                className="log-item"
                onClick={() => {
                  scrollToTop();
                }}
              >
                تغییر/مشاهده کاربر {" -> "} {user.name}
              </Link>
            ))
          ) : (
            <div className="log-item">موردی برای نمایش وجود ندارد</div>
          )}
        </div>
        <span
          className="show-log-btn"
          onClick={() => {
            setMoreHistory(!more_history);
          }}
        >
          {more_history ? "بستن تاریخچه" : "مشاهده تاریخچه"}
        </span>
      </div>
    </div>
  );
};

export default History;
