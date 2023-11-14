import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/auth-routes.js';
import conversationRoutes from './src/routes/conversation-routes.js'
import session from 'express-session';


const app = express();

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // true if using HTTPS
}));

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(authRoutes);
app.use('/conversations', conversationRoutes);

export default app;
