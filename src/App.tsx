import React from 'react';
import Dashboard from "./pages/dashboard";
import DashboardBoardsProvider from "./providers/DashboardBoardsProvider";
import Modal from "./components/Modal";

function App() {
  return (
    <DashboardBoardsProvider>
      <Dashboard/>
      <Modal/>
    </DashboardBoardsProvider>
  );
}

export default App;
