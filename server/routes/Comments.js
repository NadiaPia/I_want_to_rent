const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const router = express.Router();
const { Comments } = require("../models");

//     "/comments" = "/"

router.get("/:itemId", async (req, res) => {
    const itemId = req.params.itemId;
    const comments = await Comments.findAll({where: {ItemId: itemId}}) //find by primary key, that is id in column in db. This is the method of the sequilize
    res.json(comments);
})

router.post("/", validateToken, async(req, res) => {
    const newComment = req.body;      // { commentBody: 'ddddddddd', ItemId: '7' }   
    const userName = req.user.userName;
    newComment.userName = userName;  // we pushe a userName to the newComment{ commentBody: 'ddddddddd', ItemId: '7', userName: 'Tania' }   
    await Comments.create(newComment)    //this is the sequelize function .create
    res.json(newComment)
})
module.exports = router;