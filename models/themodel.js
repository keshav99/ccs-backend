import { setInterval } from "timers";

var mongoose = require ("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var User = new mongoose.Schema({
    name: {type:String, required:true},
    userpwd: {type:String, required:true},
    regno: {type:String, required:true,unique: true},
    email: {type:String, required:true},
    phone: Number
});

var Question = new mongoose.Schema({
    _Id: {type:String, required:true},
    hint: {type:String, required:true},
    category: {type:String, required:true},
    body: {type:String, required:true}
});

var Answered = new mongoose.Schema({
    userId: {type:String, required:true},
    questionId: {type:String, required:true},
    category: {type:String, required:true},
    answer: {type:String, required:true}
});

var Timer = new mongoose.Schema({
    userId: {type:String, required:true},
    category: {type:String, required:true},
    time: {type:Number, default: 0},
    timeUp: {type:Boolean, deafult: False }
});



mongoose.model('Questions', Question);
mongoose.model('Answered', Answered);

mongoose.model('Timer', Timer);

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function (password, callback) {
    console.log(password);
    bcrypt.compare(password, this.userpwd, function (err, res) {
        if (err) {
            callback(err, null)
        }
        else {
            callback(null, true);
        }
    });
}

mongoose.model('Users', User);
