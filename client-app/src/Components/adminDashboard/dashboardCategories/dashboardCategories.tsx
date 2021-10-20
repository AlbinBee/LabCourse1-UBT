import React, { useState, useEffect, Fragment } from "react";
import agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import InfoCard from "../../infoCard/infoCard";
import DashboardTopbar from "../dashboardTopbar/dashboardTopbar";
import { DataGrid } from '@material-ui/data-grid';
import { Button, Tooltip } from "@material-ui/core";
import { ICategory } from "../../../app/models/category";
import EditIcon from '../../assets/Icons/edit.svg';
import DeleteIcon from '../../assets/Icons/delete.svg';
import AddIcon from '../../assets/Icons/add.svg';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MainButtonIcon } from "../../buttons/mainButton";
import AreaChart from "../../charts/areaChart";
import PieChart from "../../charts/pieChart";
import BarChart from "../../charts/barChart";

import FolderOpenIcon from '@material-ui/icons/FolderOpen';


const DashboardCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 200 },
    {
      field: 'description', headerName: 'Description', width: 250, renderCell: (params: any) => (
        <Tooltip title={params.value} placement='top' className='descriptionTooltip' arrow={true}>
          <span className="table-cell-truncate">{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: 'edit', headerName: 'Action', width: 160, renderCell: (params: any) => (
        <div className='actionIconsContainer'>
          <Button className='deleteIcon' onClick={() => handleDeleteCategory(params.id)}>
            <img src={DeleteIcon} alt="delete" className='actionIcon' />
          </Button>
          <Button component={Link} to={`/dashboard/category/edit/${params.id}`} className='editIcon editIconContainer'>
            <img src={EditIcon} alt="edit" className='actionIcon' />
          </Button>
        </div>
      ),
    },
  ];

  const handleDeleteCategory = (id: number) => {
    try {
      agent.Categories.delete(id).then(() => {
        setCategories([...categories.filter(e => e.id !== id)])
        toast.success('Successfully deleted category!');
        setTotalCategories(totalCategories - 1);
      }).then(() => setLoading(false));
    } catch (error) {
      console.log(error);
      toast.error('Could not delete category!');
    }
  }

  //REFACTOR CODE LATER!!!!!
  useEffect(() => {
    let count = 0;
    agent.Categories.list()
      .then((response) => {
        // console.log(response);
        let categories: ICategory[] = [];
        response.forEach((category) => {
          count++;
          console.log(category.events?.length);
          categories.push(category);
        });
        setCategories(categories);
        setTotalCategories(count);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingComponent content="Loading Categories..." />;
  }
  return (
    <div >
      <div>
        <DashboardTopbar title="Categories" />
      </div>
      <div className="dashboardPostsContent">
        <InfoCard title="Total Categories" value={totalCategories} icon={<FolderOpenIcon className='infoCardIcon' />} />
      </div>
      <div className="dashboardPostsStats">
        <div className="PostsChart">
          <h2># of Categories</h2>
          <BarChart categories={categories} />
        </div>
        <div className="PostsTasks">
          <h2>Category Events</h2>
          <PieChart categories={categories} />
        </div>
      </div>
      <div className="dashboardPostsTable">
        <div className="PostsTableTopbar">
          <h6 className="postsTopBarCategory">Category: </h6>
          <Link to='/dashboard/categories/create'>
            <MainButtonIcon variant="contained" color="primary" className='createPostBtn' icon={AddIcon} title='Create Category' />
          </Link>
        </div>
        <div className="PostsTable">
          <div style={{ width: '95%' }}>
            <DataGrid rows={categories} columns={columns} pageSize={6} checkboxSelection autoHeight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCategories;
