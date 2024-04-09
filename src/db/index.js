import mongoose from "mongoose";

const Dbconnected = async ()=>{
  try{
    const connectioninstance= await  mongoose.connect(process.env.MONGODB_URL)
    console.log(`\n mongodb connected !! DB host ${connectioninstance.connection.host}`)
  }catch (error) {
        console.log("MONGODB connection is Failled ", error)
        process.exit(1)
    }
}


export {Dbconnected}