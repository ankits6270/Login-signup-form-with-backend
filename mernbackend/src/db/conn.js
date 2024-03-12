const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/youtubeRegistration')
.then(()=>{
    console.log("Mongo Connected");
})
.catch((e)=>{
    console.log('No connection');
});