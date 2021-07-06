import React, { useState, useEffect } from "react";
import agent from "../../../app/api/agent";
import { IListUser } from "../../../app/models/user";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import InfoCard from "../../infoCard/infoCard";
import DashboardTopbar from "../dashboardTopbar/dashboardTopbar";
import { DataGrid } from '@material-ui/data-grid';
import { Chip } from "@material-ui/core";
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import './style.css'
import { Link } from "react-router-dom";

const columns = [
  { field: 'id', headerName: 'ID', width: 130 },
  {
    field: 'displayName', headerName: 'Display Name', width: 200, renderCell: (params: any) => (
      <div>
        <Link to={`/profile/${params.row.displayName}`}>
          {params.row.displayName}
        </Link>
      </div>
    )
  },
  { field: 'bio', headerName: 'Biography', width: 160 },
  {
    field: 'photos', headerName: 'Photos', width: 160, renderCell: (params: any) => (
      <div>
        <AvatarGroup max={3}>
          {params.row.photos.map((photo: any) => (
            <img src={photo.url} alt="image" className='userImagesDashboard' />
          ))}
        </AvatarGroup>
      </div>
    )
  },
  { field: 'email', headerName: 'Email', width: 150 },
  {
    field: 'status', headerName: 'Status', width: 130, renderCell: (params: any) => (
      <div>
        {params.row.status === 'active'
          ? <Chip color="primary" label={params.row.status} className='verifiedChipStatus' />
          : params.row.status === 'inactive'
            ? <Chip color="primary" label={params.row.status} className='pendingChipStatus' />
            : <Chip color="secondary" label={params.row.status} className='rejectedChipStatus' />
        }
      </div>
    )
  },
  // add these fields later { field: 'role', headerName: 'Role', width: 120 },
  // { field: 'isPremium', headerName: 'Premium', width: 130, type: 'boolean' },
  // { field: 'dateRegistered', headerName: 'Date Registerd', width: 160 },
];
const DashboardUsers = () => {
  const [users, setUsers] = useState<IListUser[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUsersActive, setTotalUsersActive] = useState(0);
  const [totalUsersInActive, setTotalUsersInActive] = useState(0);
  const [totalUsersBlocked, setTotalUsersRejected] = useState(0);
  const [loading, setLoading] = useState(true);

  //REFACTOR CODE LATER!!!!!
  useEffect(() => {
    let count = 0;
    let countActive = 0;
    let countInActive = 0;
    let countBlocked = 0;
    agent.User.list()
      .then((response) => {
        // console.log(response);
        let users: IListUser[] = [];
        response.forEach((user) => {
          count++;
          users.push(user);
          if (user.status === 'active') {
            countActive++;
          } else if (user.status === 'inactive') {
            countInActive++;
          } else if (user.status === 'blocked') {
            countBlocked++;
          }
        });
        setUsers(users);
        setTotalUsers(count);
        setTotalUsersActive(countActive);
        setTotalUsersInActive(countInActive);
        setTotalUsersRejected(countBlocked);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingComponent content="Loading..." />;
  }
  return (
    <div >
      <div>
        <DashboardTopbar title="Users" />
      </div>
      <div className="dashboardPostsContent">
        <InfoCard title="Total Users" value={totalUsers} />
        <InfoCard title="Active" value={totalUsersActive} />
        <InfoCard title="InActive" value={totalUsersInActive} />
        <InfoCard title="Blocked" value={totalUsersBlocked} />
      </div>
      <div className="dashboardPostsStats">
        <div className="PostsChart"><h1>Chart</h1></div>
        <div className="PostsTasks"><h1>Task</h1></div>
      </div>
      <div className="dashboardPostsTable">
        <div className="PostsTableTopbar">
          <h6 className="postsTopBarCategory">Category: </h6>
          <span>All</span>
        </div>
        <div className="PostsTable">
          <div style={{ width: '95%' }}>
            <DataGrid rows={users} columns={columns} pageSize={6} checkboxSelection autoHeight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;
