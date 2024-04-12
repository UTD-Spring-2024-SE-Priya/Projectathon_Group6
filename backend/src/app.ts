import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from './utils';
import { Controller } from './controller';

const app = express();
const controller = new Controller();

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// POST endpoint for user sign-up
app.post('/signup', async (req: Request, res: Response) => {
    try {
        await controller.signup(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in user sign-up controller');
    }
});

// POST endpoint for user login
app.post('/login', async (req: Request, res: Response) => {
    try {
        await controller.login(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in user login controller');
    }
})

// POST endpoint for updating user info (skills, programming languages, interests)
app.post('/update-user-info', async (req: Request, res: Response) => {
    try {
        await controller.updateUserInfo(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in updating user info controller');
    }
})

// Handle not found 404
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;