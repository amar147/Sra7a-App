import mongoose from 'mongoose'
import { DB_URI } from './../config.js';
import { userModel } from './model/user.model.js';


export  const bootstrapDB = async(app , port)=>{
    try {
        await mongoose.connect(DB_URI)
        await userModel.syncIndexes() // lw fe index email 
        console.log('DB connected');
        app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
    } catch (error) {
        console.log(error);
        
    }
}