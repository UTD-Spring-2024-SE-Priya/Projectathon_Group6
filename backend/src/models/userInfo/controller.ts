import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UpdateUserInfoInput } from "./types";
import { prisma } from "../../db";

export class Controller {
    async getUserInfo(req: Request, res: Response) {
        const userId = req.params.userId;

        if (!userId) {
            res.status(400).send('Missing required fields');
            return;
        }

        const userInfo = await prisma.userInfo.findUnique({
            where: {
                userId: parseInt(userId),
            },
        });

        if (!userInfo) {
            res.status(404).send('User info not found');
            return;
        }

        res.status(200).json({
            userId: userInfo.userId,
            skills: userInfo.skills.split(',').map(skill => skill.trim()),
            programmingLanguages: userInfo.programming_languages.split(',').map(language => language.trim()),
            interests: userInfo.interests.split(',').map(interest => interest.trim()),
        });
    }
    async updateUserInfo(req: Request, res: Response) {

        const { userId, skills, programmingLanguages, interests } = req.body as unknown as UpdateUserInfoInput;

        if (!userId || !skills || !programmingLanguages || !interests) {
            res.status(400).send('Missing required fields');
            return;
        }

        const userInfo = await prisma.userInfo.upsert({
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
    }
}