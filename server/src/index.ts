import express from "express"
import mongoose from "mongoose"

const app = express();
const port=process.env.port || 3001

app.use(express.json())

const mongoURI: string = "mongodb+srv://lavish:NvUzH1nwb5ogQOQL@lavishmunjal.n7wqxge.mongodb.net/Finance"

mongoose.connect(mongoURI)
.then(()=>console.log('Connectd to mongodb'))
.catch((err)=>console.log("failed to connect to mongodb:", err) 
)
app.listen(port, ()=>{
    console.log(`Server is listening at ${port}`);
    
})