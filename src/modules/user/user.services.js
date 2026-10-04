import {  findOneAndUpdate } from "../../common/repository/index.js"
import { userModel } from './../../DB/model/user.model.js';


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



export const rotateToken = async (payload, user, issuer) => {
    console.log({ payload, user });
    const expireAccessAt = (payload.iat + ACCESS_TOKEN_EXPIRES_IN) * 1000;
    const currentTime = Date.now() + (5 * 60000);
    if (currentTime < expireAccessAt) {
        throw ConflictException("Sorry we cannot create new login credentials while current credentials still within validity");
    }
    return createLoginCredentials({ user, issuer });
}


export const logout = async (payload, user) => {
    console.log({ payload, user }); 

}