import { LanguageEnum } from "../common/enum/index.js";

export const validation =  (schema)=>{
    return (req , res , next ) =>{

        const lang = Number(req.headers['accept-language']  ?? LanguageEnum.EN)
        console.log({lang});
        
        
        const validationResult = schema.safeParse({
            body : req.body,
            // params : req.params,
            query : req.query
        } )
        console.log(validationResult);


        if (!validationResult.success) {
  return res.status(400).json({
    message: "Validation Error",
    errors: validationResult.error.issues
  });
}
        req.validate = validationResult.data 
        next()

    }

}