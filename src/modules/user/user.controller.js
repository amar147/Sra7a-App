import {Router} from 'express'
import { logout, profile, profileImage, rotateToken, update } from './user.services.js'
import { authetication } from '../../middleware/index.js'
import { TokenTypeEnum } from '../../common/enum/security.enum.js'
import { fileValidation, localFileUpload, localMulterMiddleware } from '../../common/utils/index.js'
const router = Router()

// router.post('/profile-image',localFileUpload().single('attachment') , async(req , res ,next) =>{
//     res.status(200).json({message:"Done" , data:{file:req.file}})
// })
router.post(
    '/profile-image',
    authetication(),
    localMulterMiddleware({
        multerMiddleware: localFileUpload({ fileSize: 5 }).single('attachment'),
        validation: fileValidation.image,
        customPath: 'Users',
    }),
    async (req, res, next) => {
        const data =await profileImage(req.user, req.file)
        res.status(200).json({ message: "Done", data });
    }
);

router.get('/profile', authetication() ,async(req , res ,next) =>{
    const data = await profile(req.user)
    res.status(200).json({message:"Done" , data})
})
router.patch('/ipdate-profile', authetication() ,async(req , res ,next) =>{
    const data = await update(req.user, req.body  )
    res.status(200).json({message:"Done" , data})
})


router.post('/rotate-token',authetication(TokenTypeEnum.REFRESH),   async  (req, res) => {
    const data = await rotateToken(req.payload , req.user);
    return res.status(200).json({message:"token refreshed successfully",    data});

})



router.post('/logout',authetication(),   async  (req, res) => {
    const data = await logout(req.payload , req.user);
    return res.status(200).json({message:"user logged out successfully",data})

})
export default router