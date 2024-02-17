import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Room.css';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch room data from the backend
    const fetchRooms = async () => {
      try {
        const response = await fetch('https://attendance-green-five.vercel.app/rooms');
        const data = await response.json();
        setRooms(data[0].rooms);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms based on the search term
  const filteredRooms = rooms.filter((room) =>
    room.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rooms-container">
      <h1 className="rooms-header">Room Tabs</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search rooms"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <ul className="rooms-list">
        {filteredRooms.map((room) => (
          <li key={room._id} className="room-item">
            <Link to={`/${room.room}`} className="room-link">
              <div className='room-link-div'>
                <img src="classroom.svg" alt="" height={16} width={16} />
                <div className="card-info-div">
                  <h3 className="text-base font-bold leading-none">{room.room}</h3>
                  <p className="text-sm leading-none">{room.strength}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
