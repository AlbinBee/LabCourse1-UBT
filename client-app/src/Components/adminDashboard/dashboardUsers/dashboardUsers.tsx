import React, { useState, useEffect } from "react";
import axios from "axios";
import agent from "../../../app/api/agent";
import { IUser } from "../../../app/models/user";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const DashboardUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  //REFACTOR CODE LATER!!!!!
  useEffect(() => {
    let count = 0;
    agent.Users.list()
      .then((response) => {
        // console.log(response);
        let users: IUser[] = [];
        response.forEach((user) => {
          count++;
          user.dateRegistered = user.dateRegistered.split(".")[0];
          users.push(user);
        });
        setUsers(users);
        setTotalUsers(count);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingComponent content="Loading..." />;
  }
  return (
    <div >
    <h1>DashboardUsers</h1>
    <h1>Total number of users is: <span id="totalUsers">{totalUsers}</span></h1>
    {users.map((user) => (
        <div>
            <h1>{user.username}</h1>
            <h5>{user.email}</h5>
            <span><h6>{user.dateRegistered}</h6></span>
            
        </div>
    ))}
</div>
  );
};

export default DashboardUsers;
