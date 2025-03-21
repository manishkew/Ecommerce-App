import mongoose from 'mongoose'

const connectDB = async() =>{
     try{
          const conn = await mongoose.connect(process.env.MONGO_URL)
          console.log(`connected to the Mongodb Database ${conn.connection.host}`);
          
     }catch(error){
        console.log(`error in mongoDb ${error}`);
        
     }
}  

export default connectDB;

