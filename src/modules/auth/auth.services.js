// import { UserModel } from "../../DB/model/index
import { Conflict, NotFound } from "../../common/exeptions/index.js";
import { createOne, findOne } from "../../common/repository/index.js";
import { hash , encryption, createLoginCredentials } from "../../common/security/index.js";
import { userModel } from './../../DB/model/user.model.js';
import bcrypt  from 'bcrypt';


export const signup = async ({email , password , username ,phone ,role})=>{
    const duplicatedAcc = await findOne({
        model:userModel,
        filter:{email},
        options:{
            select :'email'
        }
    })
    if(duplicatedAcc) throw Conflict('this acc exists')
        if (phone) {
    phone = await encryption(phone);
}
    const acc = await createOne({
        model:userModel,
        data:{email ,
            password: await hash(password) ,
            username,
            phone,
            role
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


    return await createLoginCredentials({ user: acc, payload:{sub: acc._id} })


    // create access token 
//     const access_token= await createToken({
//         options:{
//             subject:acc.id,
//             expiresIn:ACCESS_TOKEN_EXPIRES_IN,
//         },
        
//     })
//     const refresh_token=await createToken({
//         options:{
//             subject:acc.id,
//             expiresIn:REFRESH_TOKEN_EXPIRES_IN
//         },
//         secret:REFRESH_TOKEN_SIGNTURE,

//     })
//     return {access_token,refresh_token}
// }
}