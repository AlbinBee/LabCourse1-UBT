import React, { useState, useEffect } from "react";
import agent from "../../../app/api/agent";
import { IListUser } from "../../../app/models/user";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import InfoCard from "../../infoCard/infoCard";
import DashboardTopbar from "../dashboardTopbar/dashboardTopbar";
import { DataGrid } from '@material-ui/data-grid';
import { Chip, Tooltip } from "@material-ui/core";
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import './style.css'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AddIcon from '@material-ui/icons/AddCircle';
import BlockIcon from '@material-ui/icons/Block';
import PeopleAltIcon from '@material-ui/icons/PeopleAltOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

const DashboardUsers = () => {
  const [users, setUsers] = useState<IListUser[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUsersActive, setTotalUsersActive] = useState(0);
  const [totalUsersInActive, setTotalUsersInActive] = useState(0);
  const [totalUsersBlocked, setTotalUsersRejected] = useState(0);
  const [loading, setLoading] = useState(true);

  const availableRoles = ["SuperAdmin", "Admin", "SimpleUser", "PremiumUser"];


  const handleDeleteRole = (username: any, role: any) => {
    try {
      agent.Admin.deleteRole(username, role);
      toast.success("Successfully deleted role!");
      setTimeout(function () {
        window.location.reload();
      }, 300);
    } catch (error) {
      console.log(error);
    }
  }
  const handleAddRole = (username: any, role: any) => {
    try {
      agent.Admin.addRole(username, role);
      toast.success("Successfully added role!");
      setTimeout(function () {
        window.location.reload();
      }, 300);
    } catch (error) {
      console.log(error);
    }
  }

  //REFACTOR CODE LATER!!!!!
  useEffect(() => {
    let count = 0;
    let countActive = 0;
    let countInActive = 0;
    let countBlocked = 0;
    agent.Admin.list()
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

  const columns = [
    {
      field: 'id', headerName: 'ID', width: 100, renderCell: (params: any) => (
        <Tooltip title={params.value} placement='top' className='descriptionTooltip' arrow={true}>
          <span className="table-cell-truncate">{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: 'displayName', headerName: 'Display Name', width: 200, renderCell: (params: any) => (
        <Tooltip title={params.value} placement='top' className='descriptionTooltip' arrow={true}>
          <div>
            <Link to={`/profile/${params.row.displayName}`}>
              {params.row.displayName}
            </Link>
          </div>
        </Tooltip>
      )
    },
    {
      field: 'bio', headerName: 'Biography', width: 160, renderCell: (params: any) => (
        <Tooltip title={params.value} placement='top' className='descriptionTooltip' arrow={true}>
          <span className="table-cell-truncate">{params.value}</span>
        </Tooltip>
      ),
    },
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
    {
      field: 'email', headerName: 'Email', width: 150, renderCell: (params: any) => (
        <Tooltip title={params.value} placement='top' className='descriptionTooltip' arrow={true}>
          <span className="table-cell-truncate">{params.value}</span>
        </Tooltip>
      ),
    },
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
    {
      field: 'status1', headerName: 'Action', width: 130, renderCell: (params: any) => (
        <div>
          {params.row.status === 'blocked'
            ? <Tooltip title='Unblock' placement='top' className='descriptionTooltip' arrow={true}>
              <Chip color="primary" label='Unblock' className='verifiedChipStatus unBlockIconUser' />
            </Tooltip>
            : <Tooltip title='Block' placement='top' className='descriptionTooltip' arrow={true}>
              <Chip color="secondary" label={<BlockIcon />} className='rejectedChipStatus blockIconUser' />
            </Tooltip>
          }
        </div>
      )
    },
    {
      field: 'roles', headerName: 'Roles', width: 600, renderCell: (params: any) => (
        <div>
          {availableRoles.map((role: any) => (
            params.row.roles.includes(role) ?
              <Chip color="primary" label={role} onDelete={() => handleDeleteRole(params.row.userName, role)} className='roleChipStatus' />
              : <Chip color="primary" variant="outlined" label={role} className='roleOutlineChipStatus' onDelete={() => handleAddRole(params.row.userName, role)} deleteIcon={<AddIcon className='roleOutlineIcon' />} />
          ))}
        </div>
      ),
    }
    // {field: 'dateRegistered', headerName: 'Date Registerd', width: 160 },
  ];

  if (loading) {
    return <LoadingComponent content="Loading Users..." />;
  }
  return (
    <div >
      <div>
        <DashboardTopbar title="Users" />
      </div>
      <div className="dashboardPostsContent">
        <InfoCard title="Total Users" value={totalUsers} icon={<PeopleAltIcon className='infoCardIcon' />} />
        <InfoCard title="Active" value={totalUsersActive} icon={<VisibilityOutlinedIcon className='infoCardIcon' />} />
        <InfoCard title="InActive" value={totalUsersInActive} icon={<VisibilityOffOutlinedIcon className='infoCardIcon' />} />
        <InfoCard title="Blocked" value={totalUsersBlocked} icon={<BlockIcon className='infoCardIcon' />} />
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
