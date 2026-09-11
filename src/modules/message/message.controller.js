import { Router } from "express";
import { message } from "./message.services.js";
const router= new Router()


router.post('/', async (req , res)=>{
    const data = await message(req.body )
    return data 
})
export default router;