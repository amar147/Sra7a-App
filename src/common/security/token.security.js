import jwt from 'jsonwebtoken'
import {ACCESS_ADMIN_TOKEN_SIGNTURE, 
    ACCESS_TOKEN_EXPIRES_IN, 
    ACCESS_USER_TOKEN_SIGNTURE, 
    REFRESH_TOKEN_EXPIRES_IN ,
    REFRESH_USER_TOKEN_SIGNTURE,
    REFRESH_ADMIN_TOKEN_SIGNTURE
} from '../../config.js'
import { findById } from '../repository/db.repository.js';
import { userModel } from '../../DB/model/user.model.js';
import { NotFound } from './../exeptions/error.exeptions.js';
import { TokenTypeEnum } from '../enum/security.enum.js';
import { RoleEnum } from '../enum/user.gender.js';

//create token
export const createToken = async ({
    payload={},
    options={},
    secret=ACCESS_USER_TOKEN_SIGNTURE
    
    

}={})=>{
    return jwt.sign(payload , secret,options)
}

// verifyToken
export const verifyToken = async ({
    authorization='',
    secret=ACCESS_USER_TOKEN_SIGNTURE

}={})=>{
    return jwt.verify (authorization ,secret)
} 

export const getTokenSignature = async ({role =RoleEnum.USER}= {} )=>{
    let signature;
    switch(role){
        case RoleEnum.USER:
            signature = {accessSignature:ACCESS_USER_TOKEN_SIGNTURE , refreshSignature:REFRESH_USER_TOKEN_SIGNTURE};
            break;
        case RoleEnum.ADMIN:
            signature = {accessSignature:ACCESS_ADMIN_TOKEN_SIGNTURE , refreshSignature:REFRESH_ADMIN_TOKEN_SIGNTURE}   ;
            break;
        default:
            throw new Error('Invalid role');
    }
    return signature;
}





export const getSignature = async ({tokenType = TokenTypeEnum.ACCESS, role = RoleEnum.USER}= {} )=>{
    const signatures = await getTokenSignature({role});
    return tokenType === TokenTypeEnum.ACCESS ? signatures.accessSignature : signatures.refreshSignature
}


/*
decode -->

*/
export const decodeToken = async ({
    authorization='' ,
    tokenType=TokenTypeEnum.ACCESS
}={})=>{

    const decoded = jwt.decode(authorization ) //
    console.log({decoded})
    if(!decoded?.aud?.length){
        throw new Error('Invalid token')

    }

    const signature = await getSignature({tokenType ,  role : decoded?.aud[0] });
    const payload = await verifyToken({authorization, secret: signature });

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
    return {user , payload}

}


export const createLoginCredentials = async ({
    user,
    options={}
})=>{
    const {accessSignature , refreshSignature} = await getTokenSignature({role :user.role});
    // console.log(role);
        const access_token= await createToken({
            user,
            payload:{sub: user._id},
            options:{
                ...options,
                audience:[user.role],
                // subject:acc.id,
                expiresIn:ACCESS_TOKEN_EXPIRES_IN,
            },
            secret:accessSignature
        })
            const refresh_token=await createToken({
                payload:{sub: user._id},
                options:{
                    ...options,
                    // audience:user.role,
                audience:[user.role],


                    // subject:acc.id,
                    expiresIn:REFRESH_TOKEN_EXPIRES_IN
                },
                secret:refreshSignature,
        
            })
            return {access_token,refresh_token}

}
