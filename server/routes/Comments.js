const express = require("express");
const router = express.Router();
const { Comments } = require("../models");

//     "/comments" = "/"



router.get("/:itemId", async (req, res) => {
    const itemId = req.params.itemId;
    const comments = await Comments.findAll({where: {ItemId: itemId}}) //find by primary key, that is id in column in db. This is the method of the sequilize
    res.json(comments);
})

router.post("/", async(req, res) => {
    const newComment = req.body;
    await Comments.create(newComment)    //this is the sequelize function .create
    res.json(newComment)
})
module.exports = router;