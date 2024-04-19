import { Router } from "express";

import { Controller } from "./controller";

const router = Router();

const controller = new Controller();

router.get('/all', async (req, res) => {
    try {
        await controller.getAllFeedback(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in get all feedback controller');
    }
});

router.post('/create', async (req, res) => {
    try {
        await controller.createFeedback(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in create feedback controller');
    }
});

export default router;