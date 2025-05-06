import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js'; 
import userRoute from './routes/users.js';
import todoRoute from './routes/todos.js';


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());


dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true  
}));


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      console.log(`API Documentation available at: http://localhost:${PORT}/todolist/api-docs`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });

app.use('/api/user', userRoute);
app.use('/api/todos', todoRoute);


app.use("/todolist/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: "Todo List Management API",  
}));

app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



export default app;
