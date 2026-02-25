import mongoose from 'mongoose';
  const   dbConnection=()=>{
    try {
        mongoose.connect('mongodb://localhost:27017/Auth2026').then(()=>console.log("Database is Connected"))
    } catch (error) {
        console.log("datababse is not connected");
    }
}

export default dbConnection;