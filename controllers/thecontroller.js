'use strict';

var mongoose = require('mongoose'),
    Users = mongoose.model('Users'),
    Questions = mongoose.model('Questions'),
    Answered = mongoose.model('Answered'),
    Timer = mongoose.model('Timer')

exports.users = function(req,res) {
    Users.find({}, function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
    });
};


exports.showuser = function(req, res) {
    Users.findById(req.params.userId,function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
};

exports.questions = function(req, res) {
  Questions.find({ category:req.params.category},function(err, questions) {
    if (err)
      res.send(err);
    res.json(questions);
  });
};

exports.addquestion = function(req, res) {
  var new_ques = new Question(req.category);
  new_ques.save(function(err, question){
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.showquestion = function(req, res) {
  Questions.findById(req.params.questionId,function(err, question) {
    if (err)
      res.send(err);
    res.json(question);
  });
};

exports.updateuser = function(req, res) {
    Users.findUserAndUpdate({_id: req.params.userId}, req.name, req.userpwd, req.regno, req.email, req.phone, {new: true}, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  };

  exports.updatequestion = function(req, res) {
    Users.findQuesAndUpdate({_id: req.params.questionId}, req.category, req.hint, req.body, {new: true}, function(err, question) {
      if (err)
        res.send(err);
      res.json(question);
    });
  };

  exports.removequestion = function(req, res) {
      Questions.remove({
        _id: req.params.questionId
      }, function(err, user) {
        if (err)
          res.send(err);
        res.json({ message: 'Question successfully deleted' });
      });


    };

    exports.users = function(req,res) {
    Users.find({}, function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
    });
};

exports.adduser = function(req, res) {
    var questions = [];
    for(var i=0; i<10; i++)
      var random = Math.floor((Math.random() * 20) + 1);
      if(questions.includes(random))
        i--;
      else
        questions.push(random);
    
    var new_user = new Users(req.name, req.userpwd, req.regno, req.email, req.phone, questions);
    new_user.save(function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
};

exports.showuser = function(req, res) {
    Users.findById(req.params.userId,function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
};

exports.updateuser = function(req, res) {
    Users.findOneAndUpdate({_id: req.params.userId}, req.name, req.username, req.userpwd, req.regno, req.email, req.phone, {new: true}, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  };

exports.addAnswer = function(req,res){
    var new_answer = new Answered(req.userId, req.questionId, req.answer, req.category);
    new_answer.save(function(err, answer){
      if(err)
        red.send(err);
      res.json(user);
    });
}

exports.removeAnswer = function(req,res){
  Answered.remove({
    questionId: req.params.questionId,
    userId: req.params.userId,
    category: req.params.category
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'Answer successfully deleted' });
  });
}

exports.updateAnswer = function(req, res) {
  Answered.findOneAndUpdate({
    questionId: req.params.questionId,
    userId: req.params.userId,
    category: req.params.category
  },{ $set: { answer: req.answer }}, {new: true}, function(err, answer) {
    if (err)
      res.send(err);
    res.json(answer);
  });
};

exports.startTimer = function(req,res) {
  var secs=0, mins=0, over=false;
  Timer.find({
     userId: req.params.userId, 
     category: req.params.category
    }, function(err, time){
      if(err)
        res.send(err);
      secs= time.seconds;
      over = time.timeUp;
  });
  
  setInterval(function(){
      if(secs>=600 || over){
        over = true;
        Timer.findOneAndUpdate({
          userId: req.params.userId,
          category: req.params.category
        }, {$set: {timeUp: true}}, {new: true}, function(err, seconds){
          if(err)
            res.send(err);
          res.json(seconds);
        });
        res.send("Time's up");
      }
      else{
        Timer.findOneAndUpdate({
          userId: req.params.userId,
          category: req.params.category
        }, {$set: {seconds: secs}}, {new: true}, function(err, seconds){
          if(err)
            res.send(err);
          res.json(seconds);
        });
      }
  },1000);

  
}

exports.getTime = function(req,res){
  Timer.find({
    userId: req.params.userId, 
    category: req.params.category
   }, function(err, time){
     if(err)
       res.send(err);
     res.json(time);
 });
}

  exports.removeuser = function(req, res) {
      Users.remove({
        _id: req.params.userId
      }, function(err, user) {
        if (err)
          res.send(err);
        res.json({ message: 'User successfully deleted' });
      });

      
    };