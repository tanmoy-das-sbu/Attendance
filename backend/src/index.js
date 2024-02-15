import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import cors from "cors"
import bodyParser from "body-parser";
import Room from "./routes/room.route.js"


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

/*
import express from "express"
const app = express()

(async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("Error:",(error)=>{
        console.log("Error:", error);
        throw error
       })
       app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
       })
    } catch (error) {
        console.error("Error:", error);
        throw error
    }
})();
*/
