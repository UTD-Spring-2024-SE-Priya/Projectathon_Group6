import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { SignUpInput } from "./types";
import { hashPassword } from "./utils";
import { prisma } from "../../db";
import bcrypt from 'bcrypt';

export class Controller {
    async signup(req: Request, res: Response) {
        const { email, name, password } = req.body as unknown as SignUpInput;

        if (!email || !name || !password) {
            res.status(400).send('Missing required fields');
            return;
        }

        // add hashing for the password for security reasons
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
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send('Missing required fields');
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            res.status(404).send('User not found');
            return;
        }


        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            res.status(401).send('Invalid password');
            return;
        }

        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
        });
    }

    async getAllUsers(req: Request, res: Response) {
        const users = await prisma.user.findMany();

        res.status(200).json(users);
    }

    async getUserById(req: Request, res: Response) {
        const userId = req.params.userId;

        if (!userId) {
            res.status(400).send('Missing required fields');
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });

        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
        });
    }

    async deleteUser(req: Request, res: Response) {
        const userId = req.params.userId;

        if (!userId) {
            res.status(400).send('Missing required fields');
            return;
        }

        await prisma.user.delete({
            where: {
                id: parseInt(userId),
            },
        });

        res.status(200).send('User deleted');
    }
}