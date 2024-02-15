import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rooms from './component/Room.jsx'; // Correct the import path
import RoomDetails from './component/RoomDetails.jsx'; // Correct the import path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Rooms />} />
        <Route path="/:roomName" element={<RoomDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
