const mongoose=require('mongoose');
const mongoURI="mongodb+srv://akshatag55:9911402806%40aA@atlascluster.bqyl71f.mongodb.net/"
async function connecttomongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }
  
  module.exports = connecttomongo;
