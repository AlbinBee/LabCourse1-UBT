import React from 'react'
import AreaChart from '../../charts/areaChart';
import InfoCard from '../../infoCard/infoCard';
import DashboardTopbar from '../dashboardTopbar/dashboardTopbar';
import './style.css';

const MainDashboard = () => {

    return (
        <div >
            <div>
                <DashboardTopbar title="Overview" />
            </div>
            <div className="dashboardPostsContent">
                <InfoCard title="Open Sessions" value={20} />
                <InfoCard title="Users" value={5} />
                <InfoCard title="Categories" value={8} />
                <InfoCard title="Posts" value={10} />
            </div>
            <div className='mainDashboardContent'>
                {/* <AreaChart /> */}
            </div>
        </div>
    )
}

export default MainDashboard