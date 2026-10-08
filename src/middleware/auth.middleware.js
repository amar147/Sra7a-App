import { TokenTypeEnum } from "../common/enum/security.enum.js"
import { Unauthorized } from "../common/exeptions/error.exeptions.js"
import {  decodeToken } from "../common/security/token.security.js"

export const authetication = (tokenType=TokenTypeEnum.ACCESS )=>{
    return async (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        throw Unauthorized('Unauthorized ')

    }
    const {user, payload} = await decodeToken({authorization, tokenType  })
    req.user = user
    req.payload = payload
    next()
    }

    

}