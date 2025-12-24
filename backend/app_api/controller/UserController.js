var mongoose = require('mongoose');
var User = mongoose.model("User");
const jwt=require("jsonwebtoken");


const createResponse = function (res, status, content) {
    res.status(status).json(content);
}
const requireAuth=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader)return res.sendStatus(401);

    const token = authHeader.split(" ")[1];
    try{
        req.user=jwt.verify(token, process.env.JWT_SECRET);
        next();
    }catch{
        res.sendStatus(401);
    }
};

const requireAdmin=(req,res,next)=>{
    if(req.user.role!=="admin"){
        return res.sendStatus(403);
    }
    next();
};
const addUser = async function (req, res) {
    try {
        await User.create({
            ...req.body
        }).then(function (user) {
            createResponse(res, 201, user);
        });
    } catch (error) {
        createResponse(res, 400, error);
    }
};
const login = async (req, res)=>{
    const user=await User.findOne({email:req.body.email,password:req.body.password}).exec();
    if(!user){
        return res.status(401).json({message:"Authentication failed"});
    }
    const token=jwt.sign(
        {
            _id:user._id,
            email:user.email,
            role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );
    res.status(200).json({
        token,
        user:{
            id:user._id,
            name:user.name,
            role:user.role,
            email:user.email
        }
    });
};

module.exports={
    requireAuth,
    requireAdmin,
    addUser,
    login
};