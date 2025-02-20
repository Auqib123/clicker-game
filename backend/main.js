const express =require("express")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const {     
    handleButtonClick,
    fetchUserData } =require("./jobs/gameLogic.js");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI||"mongodb://localhost:27017/clickerGame").then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));
  app.get("/", (req,res)=>{
    res.json({message:"app is working"})
  });
  app.get("/user", fetchUserData);
  app.post("/click", handleButtonClick);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
