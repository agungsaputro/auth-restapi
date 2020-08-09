const express = require('express');
const router = express.Router();
const controller= require('../controllers/comment-controller');

router.get("/", controller.getAllComment);
router.get("/:id", controller.getCommentId);
router.post("/", controller.postComment);
router.patch("/:id", controller.updateComment);
router.delete("/:id", controller.deleteComment);


module.exports = router;