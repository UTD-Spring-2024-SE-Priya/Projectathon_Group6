import { PrismaClient } from "@prisma/client";

import { Request, Response } from 'express';
import { prisma } from "../../db";
import { CreateIdeaInput } from "./types";
import { ideaGeneration } from "../../utils";

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

        res.status(200).json(ideas.map((idea) => {
            return {
                ...idea,
                technologies: idea.technologies.split(","),
            };
        }));
    }

    async createProjectIdea(req: Request, res: Response) {
        const { userId, interests, programmingLanguages, skills }: CreateIdeaInput = req.body;

        console.debug(`Received: ${JSON.stringify(req.body)}`);

        if (!userId || !interests || !programmingLanguages || !skills) {
            res.status(400).send('Missing required fields');
            return;
        }

        const genereated = await ideaGeneration(skills.join(' '), programmingLanguages, interests, 1000);

        const split = genereated.split('\n')

        // first line 
        const title = split[0];

        // last line
        // skip first three words
        const technologies: string[] = split[split.length - 1].split(",").map((tech: string) => tech.trim());

        const idea = split.slice(1, split.length - 1).join('\n');

        console.log(`Generated idea: ${idea}`)

        if (idea === '') {
            res.status(400).send('Error generating project idea');
            return;
        }

        const newIdea = await prisma.projectIdea.create({
            data: {
                description: idea,
                userId: userId,
                technologies: technologies.join(","),
                title: title
            }
        });

        res.status(200).json({
            id: newIdea.id,
            userId,
            title,
            description: idea,
            technologies,
        });
    }
}