import mongoose from "mongoose";

async function connect(){
    await mongoose.connect('mongodb://localhost:27017/to_do');
    console.log("Conectado ao banco de dados");
}

export default connect;