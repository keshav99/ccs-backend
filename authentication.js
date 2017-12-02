var jwt = require('jsonwebtoken');
var mongoose = require('mongoose'),
    User = mongoose.model('Users');
var bcrypt   = require('bcrypt-nodejs');



const jwtkey = 'idshfiohdsSDF#iofhi$Fdshfis%GG#dsofjodsjf';


function authenticate_user(req, res) {

    User.findOne({ email: req.body.email }, function (err, user) {

        if (user == null) {
            res.json({message : 'You have not registered for CSI-VIT CCS.'});
        }
        else {
            if(bcrypt.compareSync(req.body.password, user.userpwd)) {
                var token = jwt.sign({id:user._id}, jwtkey);
                res.cookie("ccs", token);
                res.json({success:true});
            } else {
                res.json({success: false, message: "Incorrect password"});
                res.end();
            }

        }
    });
}

function verify_user(req, res, next) {

    var token = req.cookies['ccs'];

        jwt.verify(token, jwtkey, function(err, decoded) {
            if (err) {
                res.redirect('/login');
            } else {
                User.findOne({_id:decoded}),function (err,user) {
                    req.decoded = user;
                    next();
                }

            }
        });
}

module.exports = {authenticate_user: authenticate_user, verify_user: verify_user};
