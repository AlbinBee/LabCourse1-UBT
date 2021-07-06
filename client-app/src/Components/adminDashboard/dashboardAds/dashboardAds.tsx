import React, { useState, useEffect } from "react";
import agent from "../../../app/api/agent";
import { IAd } from "../../../app/models/ad";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import InfoCard from "../../infoCard/infoCard";
import DashboardTopbar from "../dashboardTopbar/dashboardTopbar";
import './style.css';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '../../assets/Icons/edit.svg';
import DeleteIcon from '../../assets/Icons/delete.svg';
import { Button, Chip } from "@material-ui/core";
import { Link } from "react-router-dom";

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'mainImage', headerName: 'Image', width: 130 },
  { field: 'title', headerName: 'Title', width: 130 },
  {
    field: 'type', headerName: 'Type', width: 150, renderCell: (params: any) => (
      <div>
        <span className='categoryChip'>{params.row.type}</span>
      </div>
    )
  },
  { field: 'price', headerName: 'Price', width: 110 },
  { field: 'isBanner', headerName: 'Banner', width: 120, type: 'boolean' },
  { field: 'isSlideshow', headerName: 'Slideshow', width: 135, type: 'boolean' },
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
  { field: 'status', headerName: 'Status', width: 130, hide: true },
  { field: 'dateCreated', headerName: 'Date Created', width: 160 },
  { field: 'expirationDate', headerName: 'Expiration Date', width: 180 },
  {
    field: 'action', headerName: 'Action', width: 160, renderCell: (params: any) => (
      <div className='actionIconsContainer'>
        <Button component={Link} to={`/dashboard/delete/ads/${params.id}`} className='deleteIcon'>
          <img src={DeleteIcon} alt="delete" className='actionIcon' />
        </Button>
        <Button component={Link} to={`/dashboard/edit/ads/${params.id}`} className='editIcon editIconContainer'>
          <img src={EditIcon} alt="edit" className='actionIcon' />
        </Button>
      </div>
    ),
  },
];

const DashboardAds = () => {
  const [ads, setAds] = useState<IAd[]>([]);
  const [totalAds, setTotalAds] = useState(0);
  const [totalAdsVerified, setTotalAdsVerified] = useState(0);
  const [totalAdsPending, setTotalAdsPending] = useState(0);
  const [totalAdsRejected, setTotalAdsRejected] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let count = 0;
    let countVerified = 0;
    let countPending = 0;
    let countRejected = 0;
    agent.Ads.list()
      .then((response) => {
        // console.log(response);
        let ads: IAd[] = [];
        response.forEach((ad) => {
          count++;
          ad.dateCreated = ad.dateCreated.split(".")[0];
          ad.expirationDate = ad.expirationDate.split(".")[0];
          ads.push(ad);
          if (ad.status === 'verified') {
            countVerified++;
          } else if (ad.status === 'pending') {
            countPending++;
          } else if (ad.status === 'rejected') {
            countRejected++;
          }
        });
        setAds(ads);
        setTotalAds(count);
        setTotalAdsVerified(countVerified);
        setTotalAdsPending(countPending);
        setTotalAdsRejected(countRejected);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingComponent content="Loading..." />;
  }
  return (
    <div>
      <div>
        <DashboardTopbar title="Ads" />
      </div>
      <div className="dashboardPostsContent">
        <InfoCard title="Total Ads" value={totalAds} />
        <InfoCard title="Verified" value={totalAdsVerified} />
        <InfoCard title="Pending" value={totalAdsPending} />
        <InfoCard title="Rejected" value={totalAdsRejected} />
      </div>
      <div className="dashboardAdsStats">
        <div className="AdsChart"><h1>Chart</h1></div>
        <div className="AdsTasks"><h1>Task</h1></div>
      </div>
      <div className="dashboardPostsTable">
        <div className="PostsTableTopbar">
          <h6 className="postsTopBarCategory">Category: </h6>
          <span>All</span>
        </div>
        <div className="PostsTable">
          <div style={{ width: '95%' }}>
            <DataGrid rows={ads} columns={columns} pageSize={4} checkboxSelection autoHeight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAds;
