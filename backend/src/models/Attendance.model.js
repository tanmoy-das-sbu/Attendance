import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  program_name: String,
  capacity: Number,
  course_code: String,
  course_name: String,
  present_examinee: Number,
});
const roomSchema = new mongoose.Schema({
    room: String,
    strength: Number,
    invigilators: [],
    programs: [programSchema],
  });

const AttendanceSchema = new mongoose.Schema({
  date: String,
  time: String,
  rooms: [roomSchema],
});

const Room = mongoose.model('Room', AttendanceSchema);

export default Room;
