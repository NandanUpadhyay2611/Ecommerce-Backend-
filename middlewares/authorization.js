const jwt=require('jsonwebtoken')


const secretKey="Secret$$Key";
const authorization=(req,res,next)=>{
    
    let token=req.headers.authorization;
    if(!token){
       return res.status(401).json({message:"Access denied not token"});
    }
try{

    token=token.split(' ')[1];
    const verifiedUser=jwt.verify(token,"Secret$$Key");

    if(!verifiedUser){
        return res.status(401).json({message:"Access denied"});
    }
req.user=verifiedUser;
next();
    

}
catch(err){
    res.send(err);
}
}

const isUser=async (req,res,next)=>{
    if(req.user.userType===0){
       next();
    }
    return res.status(401).send("Unauthorized");
}

const isAdmin=async (req,res,next)=>{
     
    if(req.user.userType===1){
        next();
    }
    console.log(req.user);
    return res.status(401).send("Unauthorized:is Admin");
}   
     
module.exports={secretKey,isUser,isAdmin,authorization};