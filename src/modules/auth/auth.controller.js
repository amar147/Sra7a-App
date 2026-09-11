import {Router} from "express";
import { login, signup  } from "./auth.services.js";
const router = Router();


router.post('/signup', async  (req, res) => {
    const data = await signup(req.body);
    return res.status(201).json({message:"user created successfully",data})

})


router.post('/login',async  (req, res) => {
    const data = await login(req.body);
    return res.status(200).json({message:"user logged in successfully",data})

})

export default router;