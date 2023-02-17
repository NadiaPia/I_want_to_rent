const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

//     "/auth" = "/"

router.post("/", async(req, res) => {
    const {userName, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({                    //this is the sequelize function .create
            userName: userName, 
            password: hash,
        })   
        res.json("Success")
    })
         
})


router.post("/login", async (req, res) => {
    const {userName, password} = req.body;
    const user = await Users.findOne({where: {userName: userName}});
    //console.log("user", user.password)
    //console.log("typeof user", typeof user)

        if(!user) {
            res.json({error: "User does not exist"})
        }
    bcrypt.compare(password, user.password).then((match) => {
        if(!match) {
            res.json({error: "Wrong Username and Password combination"})
        }
        res.json("YUO LOGED IN!!!")
    })
})

module.exports = router;