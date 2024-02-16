import dotenv from "dotenv";
import connectDB from "./src/db/connectDB.js";
import { app } from "./src/app.js";
import cors from "cors"
import bodyParser from "body-parser";
import Room from "./src/routes/room.route.js"
dotenv.config({
  path: "./env",
});
app.use(cors());
app.use(bodyParser.json());
connectDB()
  .then(() => {
    app.use('/rooms', Room);
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
      
    });
  })
  .catch((err) => {
    console.log("MONGODB connection FAILED !!!", err);
  });


