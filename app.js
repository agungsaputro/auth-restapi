const express = require("express");
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const routerAuthor = require("./routers/author-router");
const routerPost = require("./routers/post-router");
const routerComment = require("./routers/comment-router");
const routerUser = require("./routers/user-router");

app.use("/author",routerAuthor);
app.use("/post",routerPost);
app.use("/comment",routerComment)
app.use("/user",routerUser);

app.listen(port, () => console.log(`Server started on ${port}`));