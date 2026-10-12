import express from  "express"
import {globalErrorHandling} from "./middleware/index.js";
import { bootstrapDB } from "./DB/dbConnection.js";
import { authController, msgController, userController } from "./modules/index.js";
import { PORT } from "./config.js";
import cors from "cors";
const app = express()
await bootstrapDB(app, PORT)

app.use(cors() ,express.json());
app.use('/uploads' , express.static('./uploads'))




app.get('/', (req, res) => res.send('Welcome to BE API!'))
app.use('/auth', authController)
app.use('/user', userController)
app.use('/message', msgController)




app.use(globalErrorHandling)