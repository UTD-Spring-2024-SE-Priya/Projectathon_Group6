import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from './utils';

const prisma = new PrismaClient();
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// POST endpoint for user sign-up
app.post('/signup', async (req: Request, res: Response) => {
    try {
        const { email, name, password } = req.body;

        // Here you should add hashing for the password for security reasons
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: await hashPassword(password),
            },
        });

        res.status(201).json({
            id: user.id,
            email: user.email,
            name: user.name,
        });
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in user sign-up');
    }
});

// Handle not found 404
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;