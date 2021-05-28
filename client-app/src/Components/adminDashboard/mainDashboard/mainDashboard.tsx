import React, { useState } from 'react'
import searchIcon from '../../assets/Icons/search.svg';
import bellIcon from '../../assets/Icons/bell.svg';
import bellAlertIcon from '../../assets/Icons/bell-alert.svg';
import avatarIcon from '../../assets/Icons/avatar.svg';
import './style.css';

const MainDashboard = () => {
    const [openSearch, setOpenSearch] = useState(false)
    return (
        <div >
            <div className='mainDashboardTopbar'>
                <div>
                    <h1 className='mainDashboardTitle'>Overview</h1>
                </div>
                <div className='mainDashboardSearchBar'>
                    <div className='mainDashboardSearchBar-Bell'>
                        {openSearch && <input type="text" className='mainDashboardSearchInput' placeholder='Search' />}
                        <img onClick={() => setOpenSearch(!openSearch)} src={searchIcon} alt="search" className='mainDashboardIcons' />
                        <img src={bellAlertIcon} alt="bell" className='mainDashboardIcons' />
                    </div>
                    <div className='mainDashboardUser'>
                        <span className='mainDashboardUsername'>Admin</span>
                        <span><img src={avatarIcon} alt="" /></span>
                    </div>
                </div>

            </div>
            <div className='mainDashboardContent'>

            </div>
        </div>
    )
}

export default MainDashboard