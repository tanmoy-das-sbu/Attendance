import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Room.css"
const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch room data from the backend
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8000/rooms');
        const data = await response.json();
        setRooms(data[0].rooms);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="rooms-container">
      <h1 className="rooms-header">Room Tabs</h1>
      <ul className="rooms-list">
        {rooms.map((room) => (
          <li key={room._id} className="room-item">
            <Link to={`/${room.room}`} className="room-link">
              {room.room}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
