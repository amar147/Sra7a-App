import {z} from 'zod'
import { generalValidationFeilds } from '../../common/validation.js';



export const loginSchema = z.object({
    email: generalValidationFeilds.email,
    password: generalValidationFeilds.password
});

// validation on body and query
export const loginValidationSchema = z.object({
    body: loginSchema,
    query: z.object({
        lang: z.enum(['ar', 'en']).default('en').optional()
    }).optional()
});
// export const signupSchema = loginSchema.safeExtend({
//     username : z.string(),
//     phone : z.string(),
//     confirmPassword : z.string().max(20).min(8)


// }).superRefine((data , ctx)=>{
//     if(data.confirmPassword != data.password){
//         ctx.addIssue({
//             code:'custom',
//             message:'password and confirm Password not matched',
//             path:['confirmPassword']
//         })
//     }
    

// })




export const signupSchema = z.object({
  body: z.object({
    email: generalValidationFeilds.email,
    password: generalValidationFeilds.password,
    username: generalValidationFeilds.username,
    phone: generalValidationFeilds.phone,
    confirmPassword: generalValidationFeilds.confirmPassword,
    confirmEmail:generalValidationFeilds.confirmEmail,
    gender:generalValidationFeilds.gender // enum validate
  }).superRefine((data, ctx) => {
    generalValidationFeilds.matchFeilds({original :"password" , copy :"confirmPassword" , data ,ctx })
    generalValidationFeilds.matchFeilds({original :"email" , copy :"confirmEmail" , data , ctx})
  }),
  //query validation
  query: z.object({
    lang: z.enum(['ar', 'en']).default('en')
  }).optional()
});
