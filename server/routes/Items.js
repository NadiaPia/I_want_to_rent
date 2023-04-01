const express = require("express");
const router = express.Router();
const { Items } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddlewares");


//     "/items" = "/"

router.get("/", async(req, res) => {
    const lisOfItems = await Items.findAll()
    res.json(lisOfItems)
});

router.get("/byuserId/:id", async(req, res) => {
    const id = req.params.id;
    const listOfItems = await Items.findAll({where: {UserId: id}});
    res.json(listOfItems)
   })

router.post("/", validateToken, async(req, res) => {
    const newItem = req.body;  //item.title; item.item;  //item.userName -  we don't have it in req.body any more 
    newItem.userName = req.user.userName;
    newItem.UserId = req.user.id //UserId - the same spelling as in the models
    await Items.create(newItem)    //this is the sequelize function .create
    res.json(newItem)
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const item = await Items.findByPk(id).catch(err => console.log(err)) //find by primary key, that is id in column in db. This is the method of the sequilize
    res.json(item);
})

router.delete("/:itemId", validateToken, async (req, res) => {
    const itemId = req.params.itemId;
    await Items.destroy({
        where: {
            id: itemId
        }
    })
    res.json("DELETED SUCCESFULLY")
})

module.exports = router;