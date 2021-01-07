const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
//szyfrowanie danych
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username :{
        type: String,
        required : true,
        max : 20
    },
    password :{
        type : String,
        required: true,
        min : 4
    },
    highScores : [
        {
            gameName : {
                type: String,
            },
            highScore: {
                type : Number,
                default : 0,
            },
            creationDate: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

//wykonuje sie przed zapisaniem danych do bazy
//funkcja sprawdza czy haslo jest zakodowane
UserSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
            return cb(err);
        else{
            if(!isMatch)
                return cb(null,isMatch);
            return cb(null,this);
        }
    });
}

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User',UserSchema);