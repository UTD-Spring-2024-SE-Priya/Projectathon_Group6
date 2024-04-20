import { PrismaClient } from "@prisma/client";

import { Request, Response } from 'express';
import { prisma } from "../../db";
import { CreateIdeaInput } from "./types";

import { ideaGeneration } from "../../utils"

export class Controller {
    async getIdeasForUser(req: Request, res: Response) {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).send('Missing required fields');
            return;
        }

        const ideas = await prisma.projectIdea.findMany({
            where: {
                userId: parseInt(userId),
            },
        });

        res.status(200).json(ideas);
    }

    async createProjectIdea(req: Request, res: Response) {
        const { userId, description, }: CreateIdeaInput = req.body;

        if (!userId || !description) {
            res.status(400).send('Missing required fields');
            return;
        }

        const userInfo = await prisma.userInfo.findUnique({
            where: {
                userId: userId,
            },
        });

        ideaGeneration(userInfo.skills, userInfo.programming_languages, userInfo.interests, 10).then((value) => {
            this.rest(value, userId, description).then((idea) => {
                res.status(201).json({
                    id: idea.id,
                    title: idea.title,
                    description: idea.description,
                    technologies: idea.technologies,
                    userId: idea.userId,
                });
            });
            
        });
    }

    // part of createProjectIdea, result of callback hell lol
    async rest(word: any, userId: any, description: string) {
        return await prisma.projectIdea.create({
            data: {
                userId,
                title: word,
                description: description,
                technologies: "lang here",
            },
        });
    }

}