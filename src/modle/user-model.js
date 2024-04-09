import mongoose from "mongoose";
import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken";
const userSchema = new mongoose.Schema({
fullname:{
    type: String,
    require: true,
    
},
email :{
    type: String,
    require:true,
    unique: true
},
password:{
    type: String,
    require :[true, "password is required"],
  
}
})


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    } else {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    }
  });
  userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
} 
userSchema.methods.getJwtToken = async function(){
    return Jwt.sign({id: this._id},
        process.env.JWT_SECRET_KEY,
    {    expiresIn : process.env.JWT_EXPIRY}
        )
}


const User = mongoose.model("User", userSchema)
export default User