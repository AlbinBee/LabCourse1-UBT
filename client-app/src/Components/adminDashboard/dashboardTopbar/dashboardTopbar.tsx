import React, { useEffect, useState } from 'react'
import searchIcon from '../../assets/Icons/search.svg';
import bellAlertIcon from '../../assets/Icons/bell-alert.svg';
import avatarIcon from '../../assets/Icons/avatar.svg';
import { IUser } from '../../../app/models/user';
import '../style/style.css';

const DashboardTopbar = (props: any) => {
    const [user, setUser] = useState<IUser | null>();
    const [openSearch, setOpenSearch] = useState(false)

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')!));
    }, [])
    return (
        <div className='mainDashboardTopbar'>
            <div>
                <h1 className='mainDashboardTitle'>{props.title}</h1>
            </div>
            <div className='mainDashboardSearchBar'>
                <div className='mainDashboardSearchBar-Bell'>
                    {openSearch && <input type="text" className='mainDashboardSearchInput' placeholder='Search' />}
                    <img onClick={() => setOpenSearch(!openSearch)} src={searchIcon} alt="search" className='mainDashboardIcons' />
                    <img src={bellAlertIcon} alt="bell" className='mainDashboardIcons' />
                </div>
                <div className='mainDashboardUser'>
                    <span className='mainDashboardUsername'>{user?.username}</span>
                    <span><img src={avatarIcon} alt="" /></span>
                </div>
            </div>
        </div>
    )
}
export default DashboardTopbar
