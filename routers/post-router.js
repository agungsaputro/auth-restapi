const express = require('express');
const router = express.Router();
const controller= require('../controllers/post-controller');

router.get("/", controller.getAllPost);
router.get("/:id", controller.getPostId);
router.post("/", controller.postPost);
router.patch("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);


module.exports = router;