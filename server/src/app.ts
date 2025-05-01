import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();
const corsOptions = {
  origin: ['http://localhost:5173'],
};

const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
