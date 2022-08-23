const express= require('express');
const app= express();
const port= process.env.port || 8000;
const mongoose=require("mongoose");
const authRoute= require("./routes/auth-route")
const bodyParser = require('body-parser');
const cors=require("cors");

mongoose.connect("mongodb://localhost:27017/signDb")
.then(()=>{
    console.log("connection success");
}).catch((err)=>{
    console.log(`errer occured ${err}`)
});
app.use(cors());
app.use(bodyParser.json());
app.use("/auth",authRoute)
app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
console.log("process is running  "+ port)
})
