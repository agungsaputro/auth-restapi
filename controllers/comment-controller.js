const { Comment } = require("../models");

const response = {
    status : true,
    message: "",
    data:[]
}

class CommentController{
    static async getAllComment(req,res){
        const comments = await Comment.findAll();
        response.data = comments;
        response.status = "succes";
        res.json(response);
    }

    static async postComment(req,res){
        const {body} = req;

        try{
            const comments= await Comment.create({
            content:body.content,
            status:body.status,
            create_time:body.create_time,
            email_user:body.email_user,
            url:body.url,
            authorId:body.authorId,
            postId:body.postId
            })
            response.message = "success"
            res.status(201).json(response);
        }catch(err){
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async getCommentId(req,res){
        const {id} = req.params;
        const comments = await Comment.findByPk(id);
        try{
            if(!comments) throw new Error("not found");
            response.status = "succes";
            response.data = comments;
            res.json(response)
        }catch(err){
            response.message = err.message;
            response.status = "fail";
            response.data = [];
            res.status(404).json(response);
        }
    }

    static async updateComment(req,res){
        const {id} =  req.params;
        const {body} = req;

        try{
            const update = await Comment.update({
                content:body.content,
                status:body.status,
                create_time:body.create_time,
                email_user:body.email_user,
                url:body.url,
                authorId:body.authorId,
                postId:body.postId
            },{
                where:{id:id}
            })
            if(!update) throw new Error("not found");
            response.status = "success";
            response.message = "success to updated";
            res.status(200).json(response);
        }catch(err){
            response.status = false;
            response.message = err.message;
            res.status(400).json(response)
        }
    }

    static async deleteComment(req,res){
        const {id} = req.params;
        const comments = await Comment.destroy({
            where:{id:id}
        })
        try{
            if(comments === 0) throw new Error("not found");
            response.status = "succes";
            response.message = "succes deleted";
            res.json(response)
        }catch(err){
            response.status = "fail";
            response.message = err.message;
            response.data = [];
            res.status(404).json(response);
        }
    }
}

module.exports = CommentController;