const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');

const signToken = userID =>{
    return JWT.sign({
        iss : "ILoveGames",
        sub : userID
    },"ILoveGames",{expiresIn : "1d"});
}

userRouter.post('/register',(req,res)=>{
    const { username,password, highScores} = req.body;
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error", msgError: true}});
        if(user)
            res.status(400).json({message : {msgBody : "Username seems to be taken, try a different one", msgError: true}});
        else{
            const newUser = new User({ username,password, highScores});
            newUser.highScores = [ {gameName: "cubes"},{gameName: "snake"},{gameName: "catch the ball"}]
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error", msgError: true}});
                else
                    res.status(201).json({message : {msgBody : "Account created successfully", msgError: false}});
            });
            
        }
    });
});

userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
        const {_id,username} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token,{httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated : true, user : {username}});
    }
});

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username : ""},success : true});
});


userRouter.put(`/update_highscore`,passport.authenticate('jwt',{session : false}), (req, res) => {
    User.findOneAndUpdate({"highScores._id" : req.body.id}, {$set: {"highScores.$.highScore": req.body.highScore, "highScores.$.creationDate": new Date()}}).then(
      () => {
        res.status(200).json({
          message: {msgBody : "High score updated succesfully", msgError: false}
        });
      }
    ).catch(
      (error) => {
        res.status(500).json({
            message : {msgBody : error, msgError: true}
        });
      }
    );
  });

userRouter.get('/highscores',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('highScores').exec((err,document)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({highScores : document.highScores, authenticated : true});
        }
    });
});

userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username}});
});


module.exports = userRouter;