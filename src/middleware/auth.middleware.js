import { Unauthorized } from "../common/exeptions/error.exeptions.js"
import {  decodeToken } from "../common/security/token.security.js"

export const authetication =async (req , res ,next )=>{
    const {authorization} = req.headers

    if(!authorization){
        throw Unauthorized('Unauthorized ')

    }
    req.user= await decodeToken({authorization})
    next()
    

}