const express = require("express");
const {connection} = require("./db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/notes.routes");
const cors=require("cors")
const app = express();
app.use(express.json());
app.use(cors())
require('dotenv').config()

app.use("/users",userRouter)
app.use("/notes",noteRouter)
app.get("/", (req, res) => {
    res.status(200).send({ "msg": "this is home page" })
})
const port = process.env.port
app.listen(port, async () => {
    try {
        await connection
        console.log("connected to db")
        console.log("runninng in 8080")
    }
    catch (err) {
        console.log(err)
    }
})