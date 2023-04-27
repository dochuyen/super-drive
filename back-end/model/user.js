import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    cartitem:{
        type:Array,
        default:[],
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String
    },
    passwordChangeAt:{
        type:String
    },
    passwordResetToken:{
        type:String
    },
    passwordResetExpires:{
        type:String
    }
});

//Export the model
export default mongoose.model('User', userSchema);