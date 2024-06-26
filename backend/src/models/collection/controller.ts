import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';
import { CreateCollectionInput, AddIdeaToCollectionInput, GetIdeasInCollectionInput, AddIdeaToLikedCollectionInput } from "./types";

import { prisma } from "../../db";

export class Controller {
    async createCollection(req: Request, res: Response) {
        const { userId, collectionTitle, collectionDescription } = req.body as CreateCollectionInput;

        if (!userId || !collectionTitle || !collectionDescription) {
            res.status(400).send('Missing required fields');
            return;
        }

        const collection = await prisma.collection.create({
            data: {
                userId,
                title: collectionTitle,
                description: collectionDescription,
            },
        });

        res.status(201).json({
            id: collection.id,
            userId: collection.userId,
            title: collection.title,
            description: collection.description,
        });
    }

    async updateCollection(req: Request, res: Response) {
        const { collectionId, collectionTitle, collectionDescription } = req.body;

        if (!collectionId || !collectionTitle) {
            res.status(400).send('Missing required fields');
            return;
        }

        const collection = await prisma.collection.update({
            where: {
                id: collectionId,
            },
            data: {
                title: collectionTitle,
                description: collectionDescription,
            },
        });

        res.status(200).json({
            id: collection.id,
            userId: collection.userId,
            title: collection.title,
            description: collection.description,
        });
    }

    async deleteCollection(req: Request, res: Response) {
        const { collectionId } = req.body;

        if (!collectionId) {
            res.status(400).send('Missing required fields');
            return;
        }

        await prisma.collection.delete({
            where: {
                id: collectionId,
            },
        });

        res.status(200).send('Collection deleted successfully');
    }

    async addIdeaToLiked(req: Request, res: Response) {
        const { userId, ideaId } = req.body as AddIdeaToLikedCollectionInput;

        if (!userId || !ideaId) {
            res.status(400).send('Missing required fields');
            return;
        }

        // check if "liked" collection exists

        let collection = await prisma.collection.findFirst({
            where: {
                userId,
                title: 'Liked',
            },
        });

        if (!collection) {
            // create "liked" collection
            collection = await prisma.collection.create({
                data: {
                    userId,
                    title: 'Liked',
                    description: 'Liked ideas',
                    ideas: {
                        connect: {
                            id: ideaId,
                        },
                    },
                },
            });

            console.info('Created "liked" collection');
        }

        // add idea to "liked" collection
        await prisma.collection.update({
            where: {
                id: collection!.id
            },
            data: {
                ideas: {
                    connect: {
                        id: ideaId,
                    },
                },
            },
        });

        res.status(200).send('Idea added to liked successfully');
    }

    async getLikedIdeas(req: Request, res: Response) {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).send('Missing required fields');
            return;
        }

        const collection = await prisma.collection.findFirst({
            where: {
                userId,
                title: 'Liked',
            },
            include: {
                ideas: true,
            },
        });

        if (!collection) {
            // create "liked" collection
            await prisma.collection.create({
                data: {
                    userId,
                    title: 'Liked',
                    description: 'Liked ideas',
                },
            });

            res.status(200).json([]);
            return;
        }

        res.status(200).json(collection.ideas.map((idea) => {
            return {
                ...idea,
                technologies: idea.technologies.split(","),
            }
        }));
    }

    async addIdeaToCollection(req: Request, res: Response) {
        const { collectionId, ideaId } = req.body as AddIdeaToCollectionInput;

        if (!collectionId || !ideaId) {
            res.status(400).send('Missing required fields');
            return;
        }

        // Check if collection exists
        const collection = await prisma.collection.findUnique({
            where: {
                id: collectionId,
            },
        });

        if (!collection) {
            res.status(404).send('Collection not found');
            return;
        }

        await prisma.collection.update({
            where: {
                id: collectionId,
            },
            data: {
                ideas: {
                    connect: {
                        id: ideaId,
                    },
                },
            },
        });

        res.status(200).send('Idea added to collection successfully');
    }

    async getIdeasInCollection(req: Request, res: Response) {
        const { collectionId } = req.body as GetIdeasInCollectionInput;

        if (!collectionId) {
            res.status(400).send('Missing required fields');
            return;
        }

        // Check if collection exists
        const collection = await prisma.collection.findUnique({
            where: {
                id: collectionId,
            },
            include: {
                ideas: true,
            },
        });

        if (!collection) {
            res.status(404).send('Collection not found');
            return;
        }

        res.status(200).json({
            id: collection.id,
            userId: collection.userId,
            title: collection.title,
            description: collection.description,
            ideas: collection.ideas,
        });
    }

    async removeIdeaFromCollection(req: Request, res: Response) {
        const { collectionId, ideaId } = req.body;

        if (!collectionId || !ideaId) {
            res.status(400).send('Missing required fields');
            return;
        }

        // Check if collection exists
        const collection = await prisma.collection.findUnique({
            where: {
                id: collectionId,
            },
        });

        if (!collection) {
            res.status(404).send('Collection not found');
            return;
        }

        await prisma.collection.update({
            where: {
                id: collectionId,
            },
            data: {
                ideas: {
                    disconnect: {
                        id: ideaId,
                    }
                },
            },
        });
        res.status(200).send('Idea removed from collection successfully');
    }

    async getCollectionsForUser(req: Request, res: Response) {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).send('Missing required fields');
            return;
        }

        const collections = await prisma.collection.findMany({
            where: {
                userId,
            },
        });

        res.status(200).json(collections);
    }

}