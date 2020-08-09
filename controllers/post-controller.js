const { Post, Comment } = require("../models");


const response = {
    status : true,
    message: "",
    data:[]
}

class PostController{
    static async getAllPost(req,res){
        const posts = await Post.findAll();
        response.data = posts;
        response.status = "succes";
        res.json(response);
    }

    static async postPost(req,res){
        const {body} = req;

        try{
            const postPost = await Post.create({
            title:body.title,
            content:body.content,
            tags:body.tags,
            status:body.status,
            authorId:body.authorId
            })
            response.message = "success"
            res.status(201).json(response);
        }catch(err){
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async getPostId(req,res){
        const {id} = req.params;
        const posts = await Post.findByPk(id,{
            include: Comment
        })

        try{
            if(!posts) throw new Error("not found");
            response.status = "succes";
            response.data = posts;
            res.json(response)
        }catch(err){
            response.message = err.message;
            response.status = "fail";
            response.data = [];
            res.status(404).json(response);
        }
    }

    static async updatePost(req,res){
        const {id} =  req.params;
        const {body} = req;

        try{
            const update = await Post.update({
                title:body.title,
                content:body.content,
                tags:body.tags,
                status:body.status,
                authorId:body.authorId
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

    static async deletePost(req,res){
        const {id} = req.params;
        const posts = await Post.destroy({
            where:{id:id}
        })
        try{
            if(posts === 0) throw new Error("not found");
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

module.exports = PostController;