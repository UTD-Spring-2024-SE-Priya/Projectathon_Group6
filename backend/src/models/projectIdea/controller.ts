import { PrismaClient } from "@prisma/client";

import { Request, Response } from 'express';
import { prisma } from "../../db";

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
}