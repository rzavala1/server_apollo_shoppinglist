const {connect}=require('mongoose');

const connectDB=async()=>{
    try{
        await connect(process.env.MONGODB_URI);
        console.log("Mongo db Connect");
    }catch(error){
        console.info(error)
    };
}

module.exports={connectDB}
