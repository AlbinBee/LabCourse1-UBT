import React, { useState, useEffect } from "react";
import axios from "axios";
import agent from "../../../app/api/agent";
import { IAd } from "../../../app/models/ad";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import InfoCard from "../../infoCard/infoCard";

const DashboardAds = () => {
  const [ads, setAds] = useState<IAd[]>([]);
  const [totalAds, setTotalAds] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let count = 0;
    agent.Ads.list()
      .then((response) => {
        // console.log(response);
        let ads: IAd[] = [];
        response.forEach((ad) => {
          count++;
          ad.dateCreated = ad.dateCreated.split(".")[0];
          ad.expirationDate = ad.expirationDate.split(".")[0];
          ads.push(ad);
        });
        setAds(ads);
        setTotalAds(count);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingComponent content="Loading..." />;
  }
  return (
    <div>
      <h1>DashboardAds</h1>
      <h1>
      <div className="dashboardPostsContent">
                <InfoCard title="Total Ads" value={totalAds}/>
                <InfoCard title="Verified" value="3"/>
                <InfoCard title="Pending" value="0"/>
                <InfoCard title="Rejected" value="0"/>
            </div>
      </h1>
      {ads.map((ad) => (
        <div>
          <h1>{ad.title}</h1>
          <h5>{ad.price}</h5>
          <span>
            <h6>{ad.dateCreated}</h6>
          </span>
        </div>
      ))}
    </div>
  );
};

export default DashboardAds;
