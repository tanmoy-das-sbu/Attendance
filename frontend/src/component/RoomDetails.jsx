import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./RoomDetails.css"

const RoomDetails = () => {

  const { roomName } = useParams();
  const [room, setRoom] = useState(null);
  const navigate = useNavigate();
  const [allowedTime, setallowedTime] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`https://attendance-green-five.vercel.app/rooms/${roomName}`);
        const data = await response.json();
        setRoom(data);
      } catch (error) {
        console.error('Error fetching room details:', error);
        // Redirect to the Rooms page or handle the error as needed
        navigate('/');
      }
    };

    fetchRoomDetails();
  }, [roomName, navigate]);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await fetch(`https://attendance-green-five.vercel.app/rooms/`);
        const data = await response.json();
        setallowedTime(data[0].time);
        console.log(allowedTime)
      } catch (error) {
        console.error('Error fetching room details:', error);
        navigate('/');
      }
    };
    fetchDate();
    
  }, [allowedTime,navigate]);

  const handleExamineeCountChange = (courseCode, newCount) => {
    // Update the local state first
    setRoom((prevRoom) => ({
      ...prevRoom,
      programs: prevRoom.programs.map((program) =>
        program.course_code === courseCode ? { ...program, present_examinee: newCount } : program
      ),
    }));
  };
  const handleSubmit = async () => {
    setLoading(true)
    const confirmSubmission = window.confirm('Are you sure you want to submit the examinee counts?');

  if (!confirmSubmission) {
    return; }
    try {
      await Promise.all(
        room.programs.map(async (program) => {
          const response = await fetch(`https://attendance-green-five.vercel.app/rooms/${roomName}/${program.course_code}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ present_examinee: parseInt(program.present_examinee) }),
          });

          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error updating examinee counts: ${errorMessage}`);
          }
        })
      );

      console.log('Examinee counts updated successfully!');
      window.alert('Examinee counts submitted successfully!');
    } catch (error) {
      console.error(error.message);
    }
  };



  return (
    <div className="room-details-container">
      {room ? (
        <>
          <h1 className="room-title">{room.room}</h1>
          <p className="room-info">Strength: {room.strength}</p>
          <p className="room-info">Invigilators: {room.invigilators.join(', ')}</p>

          <h2 className="programs-heading">Programs</h2>
          {room.programs.map((program) => (
            <div key={program.course_code} className="program-container">
              <p className="program-info">Program Name: {program.program_name}</p>
              <p className="program-info">Capacity: {program.capacity}</p>
              <p className="program-info">Course Code: {program.course_code}</p>
              <p className="program-info">Course Name: {program.course_name}</p>

              <label className="examinee-count-label">
                Examinee Count: {program.present_examinee}
              </label>
              <label className="examinee-count-label">
                Present Examinee
              </label>
              <input
                  type="number"
                  value={program.present_examinee || ''}
                  onChange={(e) => handleExamineeCountChange(program.course_code, e.target.value)}
                  className="examinee-count-input"
                />
            </div>
          ))}
          <button onClick={handleSubmit} className="submit-button">
            {loading?"Loading...": "Submit"}
          </button>
        </>
      ) : (
        <p className="loading-message">Loading room details...</p>
      )}
    </div>
  );
};

export default RoomDetails;
