import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Room.css';

const Rooms = () => {

  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');


  useEffect(() => {
    // Fetch room data from the backend
    const fetchRooms = async () => {
      try {
        const response = await fetch('https://attendance-green-five.vercel.app/rooms');
        const data = await response.json();
        setRooms(data[0].rooms);
        setTime(data[0].time)
        setDate(data[0].date)
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
      <h5 className='rooms-sub-header'>Exam Date: {date}</h5>
      <h5 className='rooms-sub-header'>Exam Time: {time}</h5>
      <div className='search-wrapper'>
        <img src="search.svg" alt="" width={30} height={30}/>
        <input
        type="text"
        placeholder="Search rooms"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      </div>

      <ul className="rooms-list">
        {filteredRooms.map((room) => (
          <li key={room._id} className="room-item">
            <Link to={`/${room.room}`} className="room-link">
              <div className='room-link-div'>
                <div className="card-info-div">
                  <h3 >Room Name: {room.room}</h3>
                 <div>
                 <h5 >Room Capacity: {room.strength}</h5>
                  <h5 >Invigilators :
                      {room.invigilators.map((inv, index) => (
                        <label key={index} className="inv">{inv}, </label>))}
                  </h5>
                 </div>
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
