import {z} from 'zod'
import { GenderEnum } from './enum/user.gender.js';


const matchFeilds= ({original , copy , data ,ctx })=>{
        if (data[original] !== data[copy]) {
      ctx.addIssue({
        code: 'custom',
        message: `${original} and ${copy} not matched `,
        path: [copy]
      });
    }
}

export const generalValidationFeilds= {
        email: z.string().email(),
        password: z.string().min(8).max(20),
        username: z.string(),
        phone: z.string(),
        confirmPassword: z.string().min(8).max(20),
        gender:z.enum(GenderEnum), // enum validate
        confirmEmail: z.string().email(),
        matchFeilds
}