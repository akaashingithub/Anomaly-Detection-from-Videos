const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginFormPractice")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const videoSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    path: String,
});
const Video =new mongoose.model('Video', videoSchema);
const LogInCollection=new mongoose.model('LogInCollection',logInSchema)


module.exports = {
    LogInCollection, // Export the LogInCollection model
    Video, // Export the Video model
};