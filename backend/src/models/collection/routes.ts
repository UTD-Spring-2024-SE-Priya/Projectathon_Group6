import { Router } from "express";

import { Controller } from "./controller";

const router = Router();

const controller = new Controller();

router.post('/create', async (req, res) => {
    try {
        await controller.createCollection(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in create collection controller');
    }
});

router.post('/update', async (req, res) => {
    try {
        await controller.updateCollection(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in update collection controller');
    }
});

router.post('/delete', async (req, res) => {
    try {
        await controller.deleteCollection(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in delete collection controller');
    }
});

router.post('/ideas', async (req, res) => {
    try {
        await controller.getIdeasInCollection(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in get ideas in collection controller');
    }
});

router.post('/addIdea', async (req, res) => {
    try {
        await controller.addIdeaToCollection(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in add idea to collection controller');
    }
});

router.post('/deleteIdea', async (req, res) => {
    try {
        await controller.removeIdeaFromCollection(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in remove idea from collection controller');
    }
});

export default router;