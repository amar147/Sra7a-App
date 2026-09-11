import mongoose from "mongoose";
import { GenderEnum } from "../../common/enum/index.js";
//schema and model 



//user schema
const userSchema= new mongoose.Schema({

    firstName:{
        type:String,
        minLengh:[2],
        maxLengh:[25],
        required:true

    },
    lastName:{
        type:String,
        minLengh:[2],
        maxLengh:[25],
        required:true

    },
    email:{
        type:String,
        unique:true,
        required:true

    },
    password:{
        type:String,  
        required:true

    },
    phone:{
        type:String,        
    },
    DOB:Date,
    confirmEmail:Date,
    image:String,
    coverImage:[String], //scroll
    gender:{
        type:Number,
        enum:Object.values(GenderEnum),
        default:GenderEnum.MALE
    }



},{
    timestamps:true,
    toObject:{virtuals:true},
    toJSON:{virtuals:true},
    strict:true, //mfi4 7aga mn bra el schema
    strictQuery:true,
    autoIndex:true


})

userSchema.virtual('username')
  .set(function (value) {
    const [firstName, lastName] = value?.split(' ') || [];
    this.set({ firstName, lastName });
  })
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

export const userModel = mongoose.models.User || mongoose.model('User',userSchema)