import React, { useState, useEffect } from "react";
import axios from "axios";
import agent from "../../../app/api/agent";
import { IEmail } from "../../../app/models/email";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import DashboardTopbar from "../dashboardTopbar/dashboardTopbar";
import "./style.css";
import InfoCard from "../../infoCard/infoCard";

const DashboardMails = () => {
  const [emails, setEmails] = useState<IEmail[]>([]);
  const [totalEmails, setTotalEmails] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let count = 0;
    agent.Emails.list()
      .then((response) => {
        // console.log(response);
        let emails: IEmail[] = [];
        response.forEach((email) => {
          count++;
          email.dateCreated = email.dateCreated.split(".")[0];
          emails.push(email);
        });
        setEmails(emails);
        setTotalEmails(count);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingComponent content="Loading..." />;
  }
  return (
     <div >
            <div>
                <DashboardTopbar title="Emails"/>
            </div>
            <div className="dashboardPostsContent">
                <InfoCard title="Total Emails" value={totalEmails}/>
                <InfoCard title="Verified" value="0"/>
                <InfoCard title="Pending" value="0"/>
                <InfoCard title="Rejected" value="0"/>
            </div>
            <div className="dashboardPostsTable"></div>
            {emails.map((emails) => (
                <div key={emails.id}>
                    <h1>{emails.title}</h1>
                    <h5>{emails.description}</h5>
                    <span><h6>{emails.dateCreated}</h6></span>
                    <span><h6>{emails.status}</h6></span>
                </div>
            ))}
        </div>
  );
};

export default DashboardMails;
