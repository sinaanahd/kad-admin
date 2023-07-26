import React from 'react';
import { useState } from 'react';

import arrow_drop_down from "../../asset/images/arrow_drop_down.svg";
import searchImg from "../../asset/images/search.svg";
import bellImg from '../../asset/images/bell.svg'
const Header = () => {
    const [active_notif, setActive_notif] = useState(false);
    const handel_notif_status = ()=>{
        setActive_notif(!active_notif);
    }
    return ( 
        <header className='main-header'>
            <div className="user-img-name">
                <span className="user-img">
                    <img src="" alt="" />
                </span>
                <span className="user-name">
                    {"نام کاربری"}
                </span>
                <span className="open-drop-down">
                    <img src={arrow_drop_down} alt="پایین"/>
                </span>
            </div>
            <div className="search-part">
                <img src={searchImg} alt="جستجو" />
                <input type="text" placeholder='جست و جو سریع'/>
            </div>
            <div className="notif-part" onClick={()=>{
                handel_notif_status();
            }}>
                {!active_notif ?
                <span className="active-notif"></span> : <></>
            }
                <img src={bellImg} alt="نوتیفیکشین ها"/> 
            </div>
        </header>
     );
}
 
export default Header;