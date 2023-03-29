const express = require("express");
const router = express.Router();
const { Items } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddlewares");


//     "/items" = "/"

router.get("/", async(req, res) => {
    const lisOfItems = await Items.findAll()
    res.json(lisOfItems)
})

router.post("/", validateToken, async(req, res) => {
    const newItem = req.body;  //item.title; item.item;  //item.userNAme -  we don't have it in req.body any more 
    newItem.userName = req.user.userName;
    newItem.userId = req.user.id
    await Items.create(newItem)    //this is the sequelize function .create
    res.json(newItem)
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const item = await Items.findByPk(id).catch(err => console.log(err)) //find by primary key, that is id in column in db. This is the method of the sequilize
    res.json(item);
})

module.exports = router;