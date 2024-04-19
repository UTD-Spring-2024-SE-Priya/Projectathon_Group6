import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateFeedbackInput } from "./types";
import { prisma } from "../../db";

export class Controller {
    async getAllFeedback(req: Request, res: Response) {
        const feedback = await prisma.feedback.findMany();
        res.status(200).json(feedback);
    }

    async createFeedback(req: Request, res: Response) {
        const { userId, ideaId, feedback, rating } = req.body as CreateFeedbackInput;

        if (!userId || !ideaId || !feedback || !rating) {
            res.status(400).send('Missing required fields');
            return;
        }

        const newFeedback = await prisma.feedback.create({
            data: {
                userId,
                ideaId,
                feedback,
                rating,
            },
        });

        res.status(201).json({
            id: newFeedback.id,
            userId: newFeedback.userId,
            ideaId: newFeedback.ideaId,
            feedback: newFeedback.feedback,
        });
    }

}