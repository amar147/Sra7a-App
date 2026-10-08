import {Router} from "express";
import { login, signup  } from "./auth.services.js";
import { validation } from "../../middleware/validation.middleware.js";
import { loginValidationSchema, signupSchema } from "./auth.validation.js";
import {  logout} from "../user/user.services.js";
const router = Router();


router.post('/signup', validation(signupSchema), async  (req, res) => {
    const data = await signup(req.body);
    return res.status(201).json({message:"user created successfully",data})

})


router.post('/login',validation(loginValidationSchema),   async  (req, res) => {
    const data = await login(req.body);
    return res.status(200).json({message:"user logged in successfully",data})

})





router.post('/logout',validation(),   async  (req, res) => {
    const data = await logout(req.payload , req.user);
    return res.status(200).json({message:"user logged out successfully",data})

})



// router.post('/refresh-token',validation(),   async  (req, res) => {
//     const data = await rotateToken(req.payload , req.user, req.issuer);
//     return res.status(200).json({message:"token refreshed successfully",data})

// })







export default router;