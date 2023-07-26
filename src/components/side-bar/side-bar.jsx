import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect , useState} from 'react';

import dasboardIcon from "../../asset/images/dashboard.svg";
import financeIcon from "../../asset/images/finance-icon.svg";
import classesIcon from "../../asset/images/classes-icon.svg";
import usersIcon from "../../asset/images/users-icon.svg";
import bannersIcon from "../../asset/images/banners-icon.svg";
import elanatIcon from "../../asset/images/elanat-icon.svg";
import gozasheratIcon from "../../asset/images/gozareshat.svg";
const SideBar = () => {
    const [active_item  , setActive] = useState(window.location.pathname.split("/")[1])
    // useEffect(() => {
    //     const slug = window.location.pathname.split("/")[1];
    //     console.log(slug);
    // });
    return (  
        <aside className='side-bar-wrapper'>
            <nav>
                <Link to="/dashboard" className={active_item === "dashboard" ? "side-bar-item active-item" : "side-bar-item"}>
                    <img src={dasboardIcon} alt="داشبورد" />
                    <span className="side-bar-item-text">داشبورد</span>
                </Link>
                <Link to="/finance" className={active_item === "finance" ? "side-bar-item active-item" : "side-bar-item"}>
                    <img src={financeIcon} alt="امور مالی" />
                    <span className="side-bar-item-text">امور مالی</span>
                </Link>
                <Link to="/classes" className={active_item === "classes" ? "side-bar-item active-item" : "side-bar-item"}>
                    <img src={classesIcon} alt="کلاس ها" />
                    <span className="side-bar-item-text">کلاس ها</span>
                </Link>
                <Link to="/users" className={active_item === "users" ? "side-bar-item active-item" : "side-bar-item"}>
                    <img src={dasboardIcon} alt="کاربران" />
                    <span className="side-bar-item-text">کاربران</span>
                </Link>
                <Link to="/banners" className={active_item === "banners" ? "side-bar-item active-item" : "side-bar-item"}>
                    <img src={bannersIcon} alt="بنر ها" />
                    <span className="side-bar-item-text">بنر ها</span>
                </Link>
                <Link to="/notify" className={active_item === "notify" ? "side-bar-item active-item" : "side-bar-item"}>
                    <img src={elanatIcon} alt="اعلانات" />
                    <span className="side-bar-item-text">اعلانات</span>
                </Link>
                <Link to="/reports" className={active_item === "reports" ? "side-bar-item active-item" : "side-bar-item"}>
                    <img src={gozasheratIcon} alt="گزارشات" />
                    <span className="side-bar-item-text">گزارشات</span>
                </Link>
            </nav>
            <span className="kad-panel-version">
                <span className="text">
                کاد پنل
                </span>
                <span className="version-wrapper">
                Version: 1.0.0.11
                </span>
            </span>
        </aside>
    );
}
 
export default SideBar;