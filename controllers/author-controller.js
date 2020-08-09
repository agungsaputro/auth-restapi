const { Author,Post } = require("../models");

const response = {
    status : true,
    message: "",
    data:[]
}

class AuthorController{
    static async getAllAuthor(req,res){
        const authors = await Author.findAll();
        response.data = authors;
        response.status = "succes";
        res.json(response);
    }

    static async postAuthor(req,res){
        const {body} = req;

        try{
            const postAuthor = await Author.create({
            username:body.username,
            password:body.password,
            salt:body.salt,
            email:body.email,
            photo:body.photo
            })
            console.log(postAuthor);
            response.message = "success"
            res.status(201).json(response);
        }catch(err){
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async getAuthorId(req,res){
        const {id} = req.params;
        const authors = await Author.findByPk(id,{
            include: Post
        })

        try{
            if(!authors) throw new Error("not found");
            response.status = "succes";
            response.data = authors;
            res.json(response)
        }catch(err){
            response.message = err.message;
            response.status = "fail";
            response.data = [];
            res.status(404).json(response);
        }
    }

    static async updateAuthor(req,res){
        const {id} =  req.params;
        const {body} = req;

        try{
            const update = await Author.update({
                username:body.username,
                password:body.password,
                salt:body.salt,
                email:body.email,
                photo:body.photo
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

    static async deleteAuthor(req,res){
        const {id} = req.params;
        const authors = await Author.destroy({
            where:{id:id}
        })
        try{
            if(authors === 0) throw new Error("not found");
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

module.exports = AuthorController;