const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");
const {validateToken} = require("../middlewares/AuthMiddlewares")

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
    //console.log("useruseruseruseruser", user)
    //console.log("user", user.password)
    //console.log("typeof user", typeof user)

        if(!user) {
            res.json({error: "User does not exist"})
        }
    bcrypt.compare(password, user.password).then((match) => {
        if(!match) {
            res.json({error: "Wrong Username and Password combination"})
        }
        const accessToken = sign({userName: user.userName, id: user.id}, "importantsecret")
        //res.json(accessToken);  
        res.json({token: accessToken, userName: userName, id: user.id});

    })
})

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
} )

router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;
    const basicInfo = await Users.findByPk(id, {
        attributes: {exclude: ["password"]},
    })
    res.json(basicInfo)
})

router.put("/changepassword", validateToken, async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const user = await Users.findOne({where: {userName: req.user.userName}})
    
    bcrypt.compare(oldPassword, user.password).then(async(match) => {
        if(!match) res.json({error: "Wrong Password Entered!"});

        bcrypt.hash(newPassword, 10).then((hash) => {
            Users.update({password: hash}, {where: {userName: req.user.userName}})
            res.json("Success")
        })
    })

})

module.exports = router;