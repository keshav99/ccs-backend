'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('Users');
var path = require('path');


module.exports = function(app) {
    var dacontroller = require('../controllers/thecontroller');

    // dacontroller Routes
    app.route('/users')
        .get(dacontroller.users)
        .post(dacontroller.adduser);


    app.route('/users/:userId')
        .get(dacontroller.showuser)
        .put(dacontroller.updateuser)
        .delete(dacontroller.removeuser);



    app.get('/', function(req, res) {
        res.send('Hello! The API is at http://localhost:3000');
    });

    app.route('/starttime/:userId/:category')
        .get(dacontroller.getTime)
        .post(dacontroller.startTimer)

    app.route('/questions/:category')
        .get(dacontroller.questions)
        .post(dacontroller.addquestion);

    app.route('/questions/:questionId')
        .get(dacontroller.showquestion)
        .put(dacontroller.updatequestion)
        .delete(dacontroller.removequestion);
    

    app.get('/signup',function(req,res){
		res.sendFile(path.resolve('/home/pgolecha12/ccs-frontend/register.html'));

	});
    app.post('/signup', function (req, res, next) {
        var reg = req.body.regno;
	
	var regex_17 = /17\w\w\w\d\d\d\d/
	if(reg.match(regex_17)== null){
		res.json({success:false,message:'Only first years can register'});
		res.end();
	}else{
        var user = new User(req.body);
        user.userpwd = user.generateHash(req.body.password);
        console.log(req.body.password);
        user.save(function (err, doc) {
            if(err){
                console.log(err.message);
                res.json({ success:false, message: 'You have already registered'});
            }
            else {

                res.json({success:true,message: 'Successfully Registered'});
            }
        });
}
    });

app.post('/signuptest', function (req, res, next) {
        var reg = req.body.regno;

	if(reg.startsWith("17")== false){
		res.json({success:false,message:'Only first years can register'});
	}
        var user = new User(req.body);
        user.userpwd = user.generateHash(req.body.password);
	console.log(req.body.password);
        user.save(function (err, doc) {
            if(err){
                console.log(err.message);
                res.json({ success:false, message: 'You have already registered'});
            }
            else {

                res.json({success:true,message: 'Successfully Registered'});
            }
        });
    });


};
