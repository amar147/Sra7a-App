import express from  "express"
import {globalErrorHandling} from "./middleware/index.js";
import { bootstrapDB } from "./DB/dbConnection.js";
import { authController, userController } from "./modules/index.js";
import { PORT } from "./config.js";
const app = express()
app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'))
bootstrapDB(app, PORT)
app.use(authController)
app.use('/user', userController)



app.use(globalErrorHandling)