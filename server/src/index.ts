import express from "express"
import mongoose from "mongoose"
import financialRecordRouter from "./routes/financial-records"

const app = express();
const port=process.env.port || 3001

app.use(express.json())

const mongoURI:string = process.env.MONGOURI||"";

mongoose.connect(mongoURI)
.then(()=>console.log('Connectd to mongodb'))
.catch((err)=>console.log("failed to connect to mongodb:", err) 
)


app.use("/financial-record", financialRecordRouter)
app.listen(port, ()=>{
    console.log(`Server is listening at ${port}`);
    
})