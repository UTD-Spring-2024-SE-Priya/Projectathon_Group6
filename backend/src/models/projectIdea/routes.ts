import { Router } from "express";

import { Controller } from "./controller";

const router = Router();

const controller = new Controller();

// get all project ideas for user

router.get('/:userId/all', async (req, res) => {
    try {
        await controller.getIdeasForUser(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in get all project ideas controller');
    }
});

// creates project idea

router.post('/createidea', async (req, res) => {
    try {
        await controller.createProjectIdea(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in create project idea controller');
    }
});

export default router;