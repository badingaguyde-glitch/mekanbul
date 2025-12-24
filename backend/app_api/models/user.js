var mongoose=require('mongoose');

var user=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    role:{type:String,default:"user"},
    password:{type:String,required:true}
});

mongoose.model('User',user,'users');