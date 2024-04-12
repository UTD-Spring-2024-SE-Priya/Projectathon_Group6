import { PrismaClient } from "@prisma/client";

import { Request, Response } from 'express';
import { hashPassword } from "./utils";

type SignUpInput = {
    email: string;
    name: string;
    password: string;
};

type UpdateUserInfoInput = {
    userId: number;
    skills: string[];
    programmingLanguages: string[];
    interests: string[];
}

export class Controller {
    prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient();
        console.log('Controller created!');
    }

    async signup(req: Request, res: Response) {
        try {
            const { email, name, password } = req.body as unknown as SignUpInput;

            if (!email || !name || !password) {
                res.status(400).send('Missing required fields');
                return;
            }

            // add hashing for the password for security reasons
            const user = await this.prisma.user.create({
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
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).send('Missing required fields');
                return;
            }

            const user = await this.prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                res.status(404).send('User not found');
                return;
            }

            if (user.password !== await hashPassword(password)) {
                res.status(401).send('Invalid password');
                return;
            }

            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
            });
        } catch (error) {
            console.error(error);
            res.status(400).send('Error in user login');
        }
    }

    async updateUserInfo(req: Request, res: Response) {
        try {
            const { userId, skills, programmingLanguages, interests } = req.body as unknown as UpdateUserInfoInput;

            if (!userId || !skills || !programmingLanguages || !interests) {
                res.status(400).send('Missing required fields');
                return;
            }

            const userInfo = await this.prisma.userInfo.upsert({
                where: {
                    userId,
                },
                update: {
                    skills: {
                        set: skills.join(','),
                    },
                    programming_languages: {
                        set: programmingLanguages.join(','),
                    },
                    interests: {
                        set: interests.join(','),
                    },
                },
                create: {
                    userId,
                    skills: skills.join(','),
                    programming_languages: programmingLanguages.join(','),
                    interests: interests.join(',')
                },
            });

            res.status(200).send('User info updated successfully');
        } catch (error) {
            console.error(error);
            res.status(400).send('Error in updating user info');
        }
    }
}