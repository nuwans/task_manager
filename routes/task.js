var express = require('express');
var router = express.Router();
var Task=require("../Models/Task");

/*get all*/
router.get('/',isLoggedIn, function(req, res, next) {
  console.log(req.query);
  Task.getAllTasks(req.query,function(err,result){
    if(err){
      throw err;
    }else{
      return res.json(result);
    }
  });
});
router.get('/:id',isLoggedIn, function(req, res, next) {
  Task.getTaskByID(req.params.id,function(err,result){
    if(err){
      throw err;
    }else{
      if(result){
        return res.json(result);
      }else{
        return res.json({message:'No  results found for this id'});
      }
    }
  });
});

router.post('/',isLoggedIn, function(req, res, next) {
  var NewTask=new Task(req.body);
  NewTask.AddedBy=req.user.Username;
  process.nextTick(function(){
          NewTask.save(function(err){
              if(err){
                  throw err;
              } else{
                  return res.send(NewTask);
              }
          });
      });  
});
router.put('/:id',isLoggedIn, function(req, res, next) {
  process.nextTick(function(){

          Task.UpdateByID(req,function(err,result){
              if(err){
                  throw err;
              } else{
                  if(result.nModified==0){
                    return res.send({message:"You dont have permision because this task was  added by another person"});
                  }else{
                    return res.send(result);
                  }
              }
          });
      });  
});

router.delete('/:id',isLoggedIn, function(req, res, next) {
  process.nextTick(function(){
    Task.DeleteTaskByID(req.params.id,function(err,result){
      if(err){
        throw err;
      }else{
        return res.json({message:result});
      }
    });
  })
});



function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        res.send({error:{message:"Unautorized User "}});
}
module.exports = router;
