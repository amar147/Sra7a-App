import jwt from "jsonwebtoken"
import { findById, findOneAndUpdate } from "../../common/repository/index.js"
import { userModel } from './../../DB/model/user.model.js';
import { verifyToken } from "../../common/security/token.security.js";


/*
ana 3ayz el token mn FE

authorization 
method verify  --> el authorization , el secure key
b3den dlw e7na 3ayzin el id 3l4an a3ml  ageb el profile  s7?


*/
export const profile =async (user)=>{
return user
}
export const update =async (user ,data )=>{
    const acc = await findOneAndUpdate({
        model:userModel,
        filter:user._id,  // ------------>
        update:data,
    })
    console.log(user._id);
    
return acc
}
