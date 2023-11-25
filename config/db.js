const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async ()=>{

    try{

        mongoose.set("strictQuery", false);

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB connected : ${conn.connection.host}`);

    }catch(err){
        
        console.log(err);
        process.exit(1);

    }
}

module.exports = connectDB;