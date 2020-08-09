const {User} = require("../models");
const jwt = require('jsonwebtoken');
const express = require('express');

const passport = require('passport');
const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = getUser({ id: jwt_payload.id });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

const app = express();
// initialize passport with express
app.use(passport.initialize());

const response = {
    status : true,
    message: "",
    data:[]
}

const getUser = async obj => {
    return await User.findOne({
      where: obj,
    });
  };

class UserController{
    static async getAllUser(req,res){
        const users = await User.findAll();
        response.data = users;
        response.status = "succes";
        res.json(response);
    }

    static async postUser(req,res){
        const {body} = req;

        try{
            const postUser = await User.create({
            name:body.name,
            password:body.password
            })
            console.log(postUser);
            response.message = "success"
            res.status(201).json(response);
        }catch(err){
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async getUserId(req,res){
        const {id} = req.params;
        const users = await User.findByPk(id);
        try{
            if(!users) throw new Error("not found");
            response.status = "succes";
            response.data = users;
            res.json(response)
        }catch(err){
            response.message = err.message;
            response.status = "fail";
            response.data = [];
            res.status(404).json(response);
        }
    }

    static async postUserRegister(req,res){
        const {body} = req;

        try{
            const postUser = await User.create({
            name:body.name,
            password:body.password
            })
            console.log(postUser);
            response.message = "success"
            res.status(201).json(response);
        }catch(err){
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async postUserLogin(req,res){
        const { name, password } = req.body;

        if(name && password){
            let user = await getUser({name:name});
            if(!user){
                res.status(400).json({message: 'No such user found'});
            }
            if(user.password === password){
                let payload = {id: user.id};
                let token = jwt.sign(payload,jwtOptions.secretOrKey);
                res.json({msg: 'ok', token:token});
            }else{
                res.status(400).json({message: 'password is incorrect'});
            }
        }
    }

    static async protected (req,res){
        passport.authenticate('jwt', { session: false });
        res.json('Success! You can now see this without a token.');
    }
}

module.exports = UserController;