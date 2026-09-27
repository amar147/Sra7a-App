import {Router} from 'express'
import { profile, update } from './user.services.js'
import { authetication } from '../../middleware/index.js'
const router = Router()


router.get('/', authetication ,async(req , res ,next) =>{
    const data = await profile(req.user)
    res.status(200).json({message:"Done" , data})
})
router.patch('/', authetication ,async(req , res ,next) =>{
    const data = await update(req.user, req.body  )
    res.status(200).json({message:"Done" , data})
})

export default router