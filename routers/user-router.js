const express = require('express');
const router = express.Router();
const controller= require('../controllers/user-controller');

router.get("/", controller.getAllUser);
router.get("/:id", controller.getUserId);
router.post("/", controller.postUser);
router.post("/register", controller.postUserRegister);
router.post("/login",controller.postUserLogin);
//router.patch("/:id", controller.updatePost);
//router.delete("/:id", controller.deletePost);


module.exports = router;