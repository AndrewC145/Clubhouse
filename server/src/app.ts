import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import { signUpRouter } from '../routes/signUpRouter';
import { loginRouter } from '../routes/loginRouter';
import logoutRouter from '../routes/logoutRouter';
import postRouter from '../routes/createRouter';
import deleteRouter from '../routes/deleteRouter';
import { getPosts } from './db/postQueries';

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
};

const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not defined.');
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/register', signUpRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/create', postRouter);
app.get('/', async (req: Request, res: Response) => {
  const posts = await getPosts();
  res.status(200).json({
    user: req.isAuthenticated() ? req.user : null,
    posts,
  });
});

app.use('/posts', deleteRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
