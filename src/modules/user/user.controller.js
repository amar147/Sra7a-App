import {Router} from 'express'
import { profile } from './user.services.js'
const router = Router()


router.get('/:userId' , async(req , res ,next) =>{
    const data = await profile(req.params)
    res.status(200).json({message:"Done" , data})
})

export default router