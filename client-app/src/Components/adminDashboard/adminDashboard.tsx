import React from 'react'
import './style/style.css';
import AdminSidebar from './adminSidebar';
import AdminRouter from '../router/adminRouter';

const AdminDashboard = () => {
    return (
        <div>
            <div className='dashboardContainer'>
                <div className='dashboardSidebar'>
                    <AdminSidebar />
                </div>
                <div className='dashboardContent'>
                    <div className="dashboardRouteContent">
                        <AdminRouter />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminDashboard