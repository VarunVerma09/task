import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import api from "./routes/api.js"


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', api);


const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI)
.then(()=> app.listen(PORT, ()=> console.log(`Server running on ${PORT}`)))
.catch(err=> console.error(err));