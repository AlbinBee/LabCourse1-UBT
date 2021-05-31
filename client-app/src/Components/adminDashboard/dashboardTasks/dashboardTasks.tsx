import React, { useState, useEffect } from "react";
import axios from "axios";
import agent from "../../../app/api/agent";
import { IMyTask } from "../../../app/models/myTask";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import InfoCard from "../../infoCard/infoCard";
import DashboardTopbar from "../dashboardTopbar/dashboardTopbar";
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'description', headerName: 'Description', width: 160 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'priority', headerName: 'Priority', width: 130 },
  { field: 'dateCreated', headerName: 'Date Created', width: 160 },
  { field: 'deadlineDate', headerName: 'Deadline Date', width: 160 },
];

const DashboardTasks = () => {
  const [myTasks, setMyTasks] = useState<IMyTask[]>([]);
  const [totalMyTasks, setTotalMyTasks] = useState(0);
  const [totalTasksHigh, setTotalTasksHigh] = useState(0);
  const [totalTasksMedium, setTotalTasksMedium] = useState(0);
  const [totalTasksInProgress, setTotalTasksInProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  //REFACTOR CODE LATER!!!!!
  useEffect(() => {
    let count = 0;
    let countHighPriority = 0;
    let countMediumPriority = 0;
    let countInProgress = 0;
    agent.MyTasks.list()
      .then((response) => {
        // console.log(response);
        let users: IMyTask[] = [];
        response.forEach((myTask) => {
          count++;
          myTask.dateCreated = myTask.dateCreated.split(".")[0];
          myTask.deadlineDate = myTask.deadlineDate.split(".")[0];
          myTasks.push(myTask);
          if (myTask.priority == 'high') {
            countHighPriority++;
          } else if (myTask.priority == 'medium') {
            countMediumPriority++;
          }
          if (myTask.status == 'in progress') {
            countInProgress++;
          }
        });
        setMyTasks(myTasks);
        setTotalMyTasks(count);
        setTotalTasksHigh(countHighPriority);
        setTotalTasksMedium(countMediumPriority);
        setTotalTasksInProgress(countInProgress);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingComponent content="Loading..." />;
  }
  return (
    <div >
      <div>
        <DashboardTopbar title="Tasks" />
      </div>
      <div className="dashboardPostsContent">
        <InfoCard title="Total Tasks" value={totalMyTasks} />
        <InfoCard title="In Progress" value={totalTasksInProgress} />
        <InfoCard title="High Priority" value={totalTasksHigh} />
        <InfoCard title="Medium Priority" value={totalTasksMedium} />
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
            <DataGrid rows={myTasks} columns={columns} pageSize={3} checkboxSelection autoHeight/>
          </div>
        </div>
      </div>
      {/* {myTasks.map((myTask) => (
        <div>
          <h1>{myTask.title}</h1>
          <h5>{myTask.description}</h5>
          <span><h6>{myTask.priority}</h6></span>
        </div>
      ))} */}
    </div>
  );
};

export default DashboardTasks;
