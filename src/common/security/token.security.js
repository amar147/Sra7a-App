import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SIGNTURE } from '../../config.js'
import { findById } from '../repository/db.repository.js';
import { userModel } from '../../DB/model/user.model.js';
import { NotFound } from './../exeptions/error.exeptions.js';

export const createToken = async ({
    payload={},
    options={},
    secret=ACCESS_TOKEN_SIGNTURE
    
    

}={})=>{
    return jwt.sign(payload , secret,options)
}


export const verifyToken = async ({
    authorization='',
    secret=ACCESS_TOKEN_SIGNTURE

}={})=>{
    return jwt.verify (authorization ,secret)
}



/*
decode -->

*/
export const decodeToken = async ({
    authorization='' 
}={})=>{
    const payload = await verifyToken({authorization });

    if(!payload){
        throw new Error('error');
    }


    const user = await findById({
        model:userModel,
        id:payload.sub
    })

    if(!user){
        throw NotFound('Unauthorized User')
    }


    return user


}
