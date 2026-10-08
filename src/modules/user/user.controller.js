import {Router} from 'express'
import { profile, rotateToken, update } from './user.services.js'
import { authetication } from '../../middleware/index.js'
import { TokenTypeEnum } from '../../common/enum/security.enum.js'
const router = Router()


router.get('/', authetication() ,async(req , res ,next) =>{
    const data = await profile(req.user)
    res.status(200).json({message:"Done" , data})
})
router.patch('/', authetication() ,async(req , res ,next) =>{
    const data = await update(req.user, req.body  )
    res.status(200).json({message:"Done" , data})
})


router.post('/rotate-token',authetication(TokenTypeEnum.REFRESH),   async  (req, res) => {
    const data = await rotateToken(req.payload , req.user);
    return res.status(200).json({message:"token refreshed successfully",    data});

})
export default router