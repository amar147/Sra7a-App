// import { UserModel } from "../../DB/model/index
import { Conflict, NotFound } from "../../common/exeptions/index.js";
import { createOne, findOne } from "../../common/repository/index.js";
import { hash , encryption, createToken } from "../../common/security/index.js";
import { userModel } from './../../DB/model/user.model.js';
import bcrypt  from 'bcrypt';
import { ACCESS_TOKEN_EXPIRES_IN } from "../../config.js";


export const signup = async ({email , password , username ,phone})=>{
    const duplicatedAcc = await findOne({
        model:userModel,
        filter:{email},
        options:{
            select :'email'
        }
    })
    if(duplicatedAcc) throw Conflict()
        if (phone) {
    phone = await encryption(phone);
}
    const acc = await createOne({
        model:userModel,
        data:{email ,
            password: await hash(password) ,
            username,
            phone
            }
    }) 
    return acc
}

export const login = async ({email,password})=>{
        const acc = await findOne({
        model:userModel,
        filter:{email},
    })
    if (!acc) throw NotFound();
    const match = await bcrypt.compare(password ,acc.password)
    if(!match) throw NotFound();  
    const access_token= createToken({
        options:{
            subject:acc.id,
            expiresIn:ACCESS_TOKEN_EXPIRES_IN
            
        }
    })
    return access_token
}
