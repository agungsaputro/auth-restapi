const express = require('express');
const router = express.Router();
const controller= require('../controllers/author-controller');

router.get("/", controller.getAllAuthor);
router.get("/:id", controller.getAuthorId);
router.post("/", controller.postAuthor);
router.patch("/:id", controller.updateAuthor);
router.delete("/:id", controller.deleteAuthor);


module.exports = router;