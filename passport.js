const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');


const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

//autoryzacja, wykorzystane do ochrony end pointow
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "ILoveGames"
},(payload,done)=>{
    User.findById({_id : payload.sub},(err, user)=>{
        if(err)
            return done(err, false);
        if(user)
            return done(null, user);
        else
            return done(null, false)
    })
}))

//wykorzystywane przy logowaniu, autentykacja
passport.use(new LocalStrategy((username,password,done)=>{
    User.findOne({username},(err,user)=>{
        //Problem z baza danych
        if(err)
            return done(err);
        //Jesli uzytkownik nie istnieje
        if(!user)
            return done(null,false);
        //haslo podane prawidłowo
        user.comparePassword(password,done);
    })
}))