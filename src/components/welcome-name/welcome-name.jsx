import React from 'react';

import add_icon from "../../asset/images/add-icon.svg";
const WelcomeName = () => {
    return ( 
        <>
            <div className="welcome-text-wrapper">
                <div className="welcome-text">
                {
                    "اسم کاربری, "
                }
                خوش اومدی!
                👋
                </div>
                <div className="options">
                    <div className="filter">
                        <span className="filter-text">
                        فیلتر
                        </span>
                        <img src={add_icon} alt="اضافه کردن" />
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default WelcomeName;