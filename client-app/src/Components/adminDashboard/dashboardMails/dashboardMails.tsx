import React, { useState, useEffect } from "react";
import axios from "axios";
import agent from "../../../app/api/agent";
import { IEmail } from "../../../app/models/email";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import DashboardTopbar from "../dashboardTopbar/dashboardTopbar";
import "./style.css";
import InfoCard from "../../infoCard/infoCard";
import { DataGrid } from '@material-ui/data-grid';
import { Chip } from "@material-ui/core";

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'description', headerName: 'Description', width: 160 },
  {
    field: 'category', headerName: 'Category', width: 150, renderCell: (params: any) => (
      <div>
        <span className='categoryChip'>{params.row.category}</span>
      </div>
    )
  },
  { field: 'userEmail', headerName: 'Email', width: 150 },
  {
    field: 'chip', headerName: 'Status', width: 130, renderCell: (params: any) => (
      <div>
        {params.row.status === 'verified'
          ? <Chip color="primary" label={params.row.status} className='verifiedChipStatus' />
          : params.row.status === 'pending'
            ? <Chip color="primary" label={params.row.status} className='pendingChipStatus' />
            : <Chip color="secondary" label={params.row.status} className='rejectedChipStatus' />
        }
      </div>
    )
  },
  { field: 'dateCreated', headerName: 'Date Created', width: 160 }, 
];

const DashboardMails = () => {
  const [emails, setEmails] = useState<IEmail[]>([]);
  const [totalEmails, setTotalEmails] = useState(0);
  const [totalEmailsVerified, setTotalEmailsVerified] = useState(0);
  const [totalEmailsPending, setTotalEmailsPending] = useState(0);
  const [totalEmailsRejected, setTotalEmailsRejected] = useState(0);
  const [loading, setLoading] = useState(true);

  let count = 0;
  let countVerified = 0;
  let countPending = 0;
  let countRejected = 0;
  useEffect(() => {
    agent.Emails.list()
      .then((response) => {
        let emails: IEmail[] = [];
        response.forEach((email) => {
          count++;
          email.dateCreated = email.dateCreated.split(".")[0];
          emails.push(email);
          if (email.status == 'verified') {
            countVerified++;
          } else if (email.status == 'pending') {
            countPending++;
          } else if (email.status == 'rejected') {
            countRejected++;
          }
        });
        setEmails(emails);
        setTotalEmails(count);
        setTotalEmailsVerified(countVerified);
        setTotalEmailsPending(countPending);
        setTotalEmailsRejected(countRejected);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingComponent content="Loading..." />;
  }
  return (
    <div >
      <div>
        <DashboardTopbar title="Emails" />
      </div>
      <div className="dashboardPostsContent">
        <InfoCard title="Total Emails" value={totalEmails} />
        <InfoCard title="Verified" value={totalEmailsVerified} />
        <InfoCard title="Pending" value={totalEmailsPending} />
        <InfoCard title="Rejected" value={totalEmailsRejected} />
      </div>
      <div className="dashboardPostsTable">
        <div className="PostsTableTopbar">
          <h6 className="postsTopBarCategory">Category: </h6>
          <span>All</span>
        </div>
        <div className="PostsTable">
          <div style={{ width: '95%' }}>
            <DataGrid rows={emails} columns={columns} pageSize={4} checkboxSelection autoHeight />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardMails;
