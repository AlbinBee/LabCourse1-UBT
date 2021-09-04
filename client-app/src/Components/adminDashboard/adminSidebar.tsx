import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import MainLogo from '../assets/Logo-svg.svg'
import Avatar from '../assets/Icons/avatar.svg'
import dashboardIcon from '../assets/Icons/dashboard.svg'
import dashboardIconActive from '../assets/Icons/dashboard-active.svg'
import mailIcon from '../assets/Icons/mail.svg'
import mailIconActive from '../assets/Icons/mail-active.svg'
import settingsIcon from '../assets/Icons/settings.svg'
import settingsIconActive from '../assets/Icons/settings-active.svg'
import usersIcon from '../assets/Icons/users.svg'
import usersIconActive from '../assets/Icons/users-active.svg'
import pieIcon from '../assets/Icons/pie.svg'
import pieIconActive from '../assets/Icons/pie-active.svg'
import postsIcon from '../assets/Icons/posts.svg'
import postsIconActive from '../assets/Icons/posts-active.svg'
import cvIcon from '../assets/Icons/cv.svg'
import cvIconActive from '../assets/Icons/cv-active.svg'
import adsIcon from '../assets/Icons/ads.svg'
import adsIconActive from '../assets/Icons/ads-active.svg'
import taskIcon from '../assets/Icons/task.svg'
import taskIconActive from '../assets/Icons/task-active.svg'
import categoriesIcon from '../assets/Icons/categories.svg'
import categoriesIconActive from '../assets/Icons/categories-active.svg'
import homeIcon from '../assets/Icons/home.svg'
import { IUser } from '../../app/models/user';
import { Tooltip } from '@material-ui/core';

const AdminSidebar = () => {
    const [user, setUser] = useState<IUser | null>();
    const location = useLocation();
    const pathName = location.pathname;

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')!));
    }, [])
    return (
        <div className='sidebarContainer'>
            <div className='dashboardLogoContainer'>
                <img src={MainLogo} alt="Logo" className='dashboardLogo' /><span>Dashboard</span>
            </div>
            <div className='dashboardUserContainer'>
                <img src={user?.image || Avatar} alt='userImg' className='userAccountImg' />

                <div className='dashboardUserDetails'>
                    <h4 className='sidebarUsername'>{user?.displayName}</h4>
                    <h6 className='sidebarUserEmail'>{user?.email}</h6>
                </div>
            </div>
            <div className='dashboardLinks'>
                <Tooltip title='Dashboard' placement='right' className='descriptionTooltip sidebarTooltip' arrow={true}>
                    <Link to='/dashboard' className='dashboardLink'>
                        <div className='dashboardLinkA'>
                            {(pathName === '/dashboard') ?
                                <Fragment>
                                    <img src={dashboardIconActive} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName dashboardLinkNameActive'>Dashboard</span>
                                </Fragment> :
                                <Fragment>
                                    <img src={dashboardIcon} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName'>Dashboard</span>
                                </Fragment>
                            }
                        </div>
                    </Link>
                </Tooltip>
                <Tooltip title='Posts' placement='right' className='descriptionTooltip sidebarTooltip' arrow={true}>
                    <Link to='/dashboard/posts' className='dashboardLink'>
                        <div className='dashboardLinkA'>
                            {(pathName === '/dashboard/posts') ?
                                <Fragment>
                                    <img src={postsIconActive} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName dashboardLinkNameActive'>Posts</span>
                                </Fragment> :
                                <Fragment>
                                    <img src={postsIcon} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName'>Posts</span>
                                </Fragment>
                            }
                        </div>
                    </Link>
                </Tooltip>
                <Tooltip title='Categories' placement='right' className='descriptionTooltip sidebarTooltip' arrow={true}>
                    <Link to='/dashboard/categories' className='dashboardLink'>
                        <div className='dashboardLinkA'>
                            {(pathName === '/dashboard/categories') ?
                                <Fragment>
                                    <img src={categoriesIconActive} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName dashboardLinkNameActive'>Categories</span>
                                </Fragment> :
                                <Fragment>
                                    <img src={categoriesIcon} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName'>Categories</span>
                                </Fragment>
                            }
                        </div>
                    </Link>
                </Tooltip>
                <Tooltip title='Users' placement='right' className='descriptionTooltip sidebarTooltip' arrow={true}>
                    <Link to='/dashboard/users' className='dashboardLink'>
                        <div className='dashboardLinkA'>
                            {(pathName === '/dashboard/users') ?
                                <Fragment>
                                    <img src={usersIconActive} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName dashboardLinkNameActive'>Users</span>
                                </Fragment> :
                                <Fragment>
                                    <img src={usersIcon} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName'>Users</span>
                                </Fragment>
                            }
                        </div>
                    </Link>
                </Tooltip>
                <Tooltip title='Sales' placement='right' className='descriptionTooltip sidebarTooltip' arrow={true}>
                    <Link to='/dashboard/sales' className='dashboardLink'>
                        <div className='dashboardLinkA'>
                            {(pathName === '/dashboard/sales') ?
                                <Fragment>
                                    <img src={pieIconActive} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName dashboardLinkNameActive'>Sales</span>
                                </Fragment> :
                                <Fragment>
                                    <img src={pieIcon} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName'>Sales</span>
                                </Fragment>
                            }
                        </div>
                    </Link>
                </Tooltip>
                <Tooltip title='Ads' placement='right' className='descriptionTooltip sidebarTooltip' arrow={true}>
                    <Link to='/dashboard/ads' className='dashboardLink'>
                        <div className='dashboardLinkA'>
                            {(pathName === '/dashboard/ads') ?
                                <Fragment>
                                    <img src={adsIconActive} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName dashboardLinkNameActive'>Ads</span>
                                </Fragment> :
                                <Fragment>
                                    <img src={adsIcon} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName'>Ads</span>
                                </Fragment>
                            }
                        </div>
                    </Link>
                </Tooltip>
                <Tooltip title='Mails' placement='right' className='descriptionTooltip sidebarTooltip' arrow={true}>
                    <Link to='/dashboard/mails' className='dashboardLink'>
                        <div className='dashboardLinkA'>
                            {(pathName === '/dashboard/mails') ?
                                <Fragment>
                                    <img src={mailIconActive} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName dashboardLinkNameActive'>Mails</span>
                                </Fragment> :
                                <Fragment>
                                    <img src={mailIcon} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName'>Mails</span>
                                </Fragment>
                            }
                        </div>
                    </Link>
                </Tooltip>
                <Tooltip title='Tasks' placement='right' className='descriptionTooltip sidebarTooltip' arrow={true}>
                    <Link to='/dashboard/tasks' className='dashboardLink'>
                        <div className='dashboardLinkA'>
                            {(pathName === '/dashboard/tasks') ?
                                <Fragment>
                                    <img src={taskIconActive} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName dashboardLinkNameActive'>Tasks</span>
                                </Fragment> :
                                <Fragment>
                                    <img src={taskIcon} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName'>Tasks</span>
                                </Fragment>
                            }
                        </div>
                    </Link>
                </Tooltip>
                <Tooltip title='CV' placement='right' className='descriptionTooltip sidebarTooltip' arrow={true}>
                    <Link to='/dashboard/cv' className='dashboardLink'>
                        <div className='dashboardLinkA'>
                            {(pathName === '/dashboard/cv') ?
                                <Fragment>
                                    <img src={cvIconActive} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName dashboardLinkNameActive'>Cv Creator</span>
                                </Fragment> :
                                <Fragment>
                                    <img src={cvIcon} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName'>Cv Creator</span>
                                </Fragment>
                            }
                        </div>
                    </Link>
                </Tooltip>
                <div className='dashboardHr' />
                <Tooltip title='Settings' placement='right' className='descriptionTooltip sidebarTooltip' arrow={true}>
                    <Link to='/dashboard/settings' className='dashboardLink'>
                        <div className='dashboardLinkA'>
                            {(pathName === '/dashboard/settings') ?
                                <Fragment>
                                    <img src={settingsIconActive} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName dashboardLinkNameActive'>Settings</span>
                                </Fragment> :
                                <Fragment>
                                    <img src={settingsIcon} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName'>Settings</span>
                                </Fragment>
                            }
                        </div>
                    </Link>
                </Tooltip>
                <Tooltip title='Homepage' placement='right' className='descriptionTooltip sidebarTooltip' arrow={true}>
                    <Link to='/' className='dashboardLink' style={{ marginTop: '20px' }}>
                        <div className='dashboardLinkA backToHomeBtn' >
                            <img src={homeIcon} alt="icon" className='dashboardLinkIcon' /><span className='dashboardLinkName'>Homepage</span>
                        </div>
                    </Link>
                </Tooltip>
            </div>
        </div>
    )
}
export default AdminSidebar