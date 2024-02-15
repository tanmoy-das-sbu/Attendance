// routes/rooms.js
import express from 'express';
const router = express.Router();
import Room from "../models/Attendance.model.js"

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get room by name
router.get('/:roomName', getRoomByName, (req, res) => {
  res.json(res.room);
});

// Update examinee count for a program in a room
router.put('/:roomName/:courseCode', async (req, res) => {
  const { present_examinee } = req.body;
  const { courseCode } = req.params;

  const room = await Room.findOne({ "rooms.room": req.params.roomName });
  if (room == null) {
    return res.status(404).json({ message: 'Room not found' });
  }
  else {
    res.room = room.rooms.find(room => room.room === req.params.roomName);
  }
  if (present_examinee !== undefined) {
    // Find the program in the array based on courseCode
    const programToUpdate = res.room.programs.find(program => program.course_code === courseCode);

    if (programToUpdate) {
      // Update the present_examinee count for the program
      programToUpdate.present_examinee = present_examinee;
      try {
        const updatedRoom = await room.save();
        if (updatedRoom) {
          const newRoom = res.room
        }
        res.json(updatedRoom);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.status(404).json({ message: 'Program not found in the room with the specified course code' });
    }
  } else {
    res.status(400).json({ message: 'Invalid request. Missing present_examinee in the request body.' });
  }
});

async function getRoomByName(req, res, next) {
  try {
    const room = await Room.findOne({ "rooms.room": req.params.roomName });
    if (room == null) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.room = room.rooms.find(room => room.room === req.params.roomName);
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export default router;
