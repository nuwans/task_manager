var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId; 
var db = require("../DataCollections/Connect.js");



var TaskSchema = new mongoose.Schema({
        Name:{type:String,required:true},
        Discription:{type:String,required:true},
        CreatedDate:{type:Date,required:true,default:Date.now},
        EndDate:{type:Date,required:true},
        AddedBy:{type:String,required:true}
},{ strict: true });

/*get all  tasks*/

TaskSchema.statics.getAllTasks = function(query,callback) {
    var filter={
    };
    if(query){
        filter=query;
    }

    this.find(filter,function(err,jobs){
        if(err){
            throw err;
        }else{
           return callback(null,jobs);
        }
    });
}

TaskSchema.statics.getTaskByID = function(id,callback) {
    this.findOne({"_id":ObjectId(id)},function(err,job){
        if(err){
            throw err;
        }else{
           return callback(null,job);
        }
    });
}
TaskSchema.statics.DeleteTaskByID = function(id,callback) {
    this.remove({"_id":ObjectId(id)},function(err,result){
        if(err){
            throw err;
        }else{
           return callback(null,result.result);
        }
    });
}
TaskSchema.statics.UpdateByID = function(req,callback) {
    var id=req.params.id;
    this.update(
        {"_id":ObjectId(id),"AddedBy":req.user.Username},
        {"Name":req.body.Name,"Discription":req.body.Discription},
        { upsert: false }
        ,function(err,result){
            if(err){
                throw err;
            }
            else{
                return callback(null,result);
            }
    });
}


var TaskModel = db.model('Tasks', TaskSchema);

module.exports = TaskModel;