import express from "express";
import userRoutes from './routes/userRoutes.js';
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

const port = 5000;

const app = express();


mongoose.connect("mongodb+srv://nika:nika1234@nun.02mct.mongodb.net/userData").then((val) => {
  app.listen(port, (e) => {
    console.log('connected');
  });

}).catch((err) => {
  console.log(err);
});


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev'));





app.get('/', (req, res) => {
  return res.status(200).json({ data: 'connected sucessfully' });
});



app.use('/api/users', userRoutes);



