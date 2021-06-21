import React, { useState, useEffect } from "react";
import agent from "../../../app/api/agent";
import { IUser } from "../../../app/models/user";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import InfoCard from "../../infoCard/infoCard";
import DashboardTopbar from "../dashboardTopbar/dashboardTopbar";
import { DataGrid } from '@material-ui/data-grid';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 100 },
//   { field: 'avatarImage', headerName: 'Image', width: 130 },
//   { field: 'firstName', headerName: 'First Name', width: 150 },
//   { field: 'lastName', headerName: 'Last Name', width: 150 },
//   { field: 'email', headerName: 'Email', width: 150 },
//   { field: 'role', headerName: 'Role', width: 120 },
//   { field: 'isPremium', headerName: 'Premium', width: 130, type: 'boolean' },
//   { field: 'status', headerName: 'Status', width: 130 },
//   { field: 'dateRegistered', headerName: 'Date Registerd', width: 160 },
// ];
const DashboardUsers = () => {
//   const [users, setUsers] = useState<IUser[]>([]);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalUsersActive, setTotalUsersActive] = useState(0);
//   const [totalUsersInActive, setTotalUsersInActive] = useState(0);
//   const [totalUsersBlocked, setTotalUsersRejected] = useState(0);
//   const [loading, setLoading] = useState(true);

//   //REFACTOR CODE LATER!!!!!
//   useEffect(() => {
//     let count = 0;
//     let countActive = 0;
//     let countInActive = 0;
//     let countBlocked = 0;
//     agent.Users.list()
//       .then((response) => {
//         // console.log(response);
//         let users: IUser[] = [];
//         response.forEach((user) => {
//           count++;
//           user.dateRegistered = user.dateRegistered.split(".")[0];
//           users.push(user);
//           if (user.status === 'active') {
//             countActive++;
//           } else if (user.status === 'inactive') {
//             countInActive++;
//           } else if (user.status === 'blocked') {
//             countBlocked++;
//           }
//         });
//         setUsers(users);
//         setTotalUsers(count);
//         setTotalUsersActive(countActive);
//         setTotalUsersInActive(countInActive);
//         setTotalUsersRejected(countBlocked);
//       })
//       .then(() => setLoading(false));
//   }, []);
  // if (loading) {
  //   return <LoadingComponent content="Loading..." />;
  // }
  return (
    <div >
      <div>
        <DashboardTopbar title="Users" />
      </div>
      {/* <div className="dashboardPostsContent">
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
            <DataGrid rows={users} columns={columns} pageSize={4} checkboxSelection autoHeight />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardUsers;
