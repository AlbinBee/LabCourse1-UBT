import React, { useState } from 'react'
import DashboardTopbar from '../dashboardTopbar/dashboardTopbar';
import './style.css';

const MainDashboard = () => {
    return (
        <div >
            <div>
                <DashboardTopbar title="Overview"/>
            </div>
         
            <div className='mainDashboardContent'>

            </div>
        </div>
    )
}

export default MainDashboard