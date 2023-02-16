const express = require("express");
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors());
const db = require("./models");

//Routers

const itemRouter = require("./routes/Items");
app.use("/items", itemRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

db.sequelize.sync().then(() => {
    app.listen(3002, () => {
        console.log("Server is running on a port 3002");
    })

})
