import express, { Request, Response } from 'express';

import collectionRoutes from './models/collection/routes';
import feedbackRoutes from './models/feedback/routes';
import projectIdeaRoutes from './models/projectIdea/routes';
import userRoutes from './models/user/routes';
import userInfoRoutes from './models/userInfo/routes';

import cors from 'cors';

export const app = express();

// Allow cross-origin requests
app.use(cors())

app.use(express.json()); // Middleware to parse JSON bodies

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} ${res.statusCode} ${new Date().toISOString()}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Add routes
app.use('/collection', collectionRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/projectIdea', projectIdeaRoutes);
app.use('/user', userRoutes);
app.use('/userInfo', userInfoRoutes);

// Handle not found 404
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});