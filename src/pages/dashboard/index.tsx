import React, { useContext } from 'react';
import './index.scss';
import BoardsContainer from "./components/BoardsContainer";
import { DashboardBoardsContext } from "../../providers/DashboardBoardsProvider";

const Dashboard = () => {
  const { boards } = useContext(DashboardBoardsContext);
  return <div className="dashboard">
    <h1 className="dashboard__title">InstaPro Trello</h1>
    <BoardsContainer boards={boards}/>
  </div>
}

export default Dashboard;
