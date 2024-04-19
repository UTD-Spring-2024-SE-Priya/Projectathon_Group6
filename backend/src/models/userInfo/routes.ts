import { Router } from "express";

import { Controller } from "./controller";

const router = Router();

const controller = new Controller();

// get user info
router.get('/:userId', async (req, res) => {
    try {
        await controller.getUserInfo(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in get user info controller');
    }
});

// update user info
router.post('/update', async (req, res) => {
    try {
        await controller.updateUserInfo(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in update user info controller');
    }
});

export default router;