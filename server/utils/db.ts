import mongoose from "mongoose";
require('dotenv').config()

const dbUrl:string = process.env.DB_URI || ''

const connectDB = async ()=>{
    try {
        await mongoose.connect(dbUrl).then((data:any)=>{
            console.log('Database connection established')
        })
    } catch (error:any) {
        console.log('Database connection error')
        setTimeout(connectDB, 5000)
    }
}

export default connectDB