import React, { useState, useEffect } from "react";
import axios from "axios";
import agent from "../../../app/api/agent";
import { IMyTask } from "../../../app/models/myTask";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import InfoCard from "../../infoCard/infoCard";
import DashboardTopbar from "../dashboardTopbar/dashboardTopbar";

const DashboardTasks = () => {
  const [myTasks, setMyTasks] = useState<IMyTask[]>([]);
  const [totalMyTasks, setTotalMyTasks] = useState(0);
  const [loading, setLoading] = useState(true);

  //REFACTOR CODE LATER!!!!!
  useEffect(() => {
    let count = 0;
    agent.MyTasks.list()
      .then((response) => {
        // console.log(response);
        let users: IMyTask[] = [];
        response.forEach((myTask) => {
          count++;
          myTask.dateCreated = myTask.dateCreated.split(".")[0];
          myTask.deadlineDate = myTask.deadlineDate.split(".")[0];
          myTasks.push(myTask);
        });
        setMyTasks(myTasks);
        setTotalMyTasks(count);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingComponent content="Loading..." />;
  }
  return (
    <div >
      <div>
        <DashboardTopbar title="Tasks"/>
      </div>
      <div className="dashboardPostsContent">
        <InfoCard title="Total Tasks" value={totalMyTasks} />
        <InfoCard title="In Progress" value="2" />
        <InfoCard title="High Priority" value="1" />
        <InfoCard title="Medium Priority" value="0" />
      </div>
      {myTasks.map((myTask) => (
        <div>
          <h1>{myTask.title}</h1>
          <h5>{myTask.description}</h5>
          <span><h6>{myTask.priority}</h6></span>
        </div>
      ))}
    </div>
  );
};

export default DashboardTasks;
