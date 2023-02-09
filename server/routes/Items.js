const express = require("express");
const router = express.Router();
const { Items } = require("../models");

//     "/items" = "/"

router.get("/", async(req, res) => {
    const lisOfItems = await Items.findAll()
    res.json(lisOfItems)
})

router.post("/", async(req, res) => {
    const newItem = req.body;
    await Items.create(newItem)    //this is the sequelize function .create
    res.json(newItem)
})

module.exports = router;