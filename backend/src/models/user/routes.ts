import { Router } from "express";

import { Controller } from "./controller";

const router = Router();

const controller = new Controller();

// signup
router.post('/signup', async (req, res) => {
    try {
        await controller.signup(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in user sign-up controller');
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        await controller.login(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in user login controller');
    }
});

// get all users
router.get('/all', async (req, res) => {
    try {
        await controller.getAllUsers(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in getting all users controller');
    }
});

// get user by id
router.get('/:userId', async (req, res) => {
    try {
        await controller.getUserById(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in getting user by id controller');
    }
});

// delete user by id
router.delete('/delete/:userId', async (req, res) => {
    try {
        await controller.deleteUser(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error in deleting user controller');
    }
});

export default router;