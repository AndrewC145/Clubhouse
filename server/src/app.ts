import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { signUpRouter } from '../routes/signUpRouter';

const app = express();
const corsOptions = {
  origin: ['http://localhost:5173'],
};

const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/register', signUpRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
