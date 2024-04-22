import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../src/app";
import { CreateFeedbackInput } from "../src/models/feedback/types";

const port = 5002;

beforeAll(() => {
    app.listen(port);
    console.info(`Server started on port ${port}`);
});

describe("Feedback Tests", () => {
    it("should create feedback for an idea", async () => {
        const inputBody: CreateFeedbackInput = {
            userId: 1,
            ideaId: 1,
            feedback: "This is a test feedback",
            rating: true
        };

        const response = await fetch(`http://localhost:${port}/feedback/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputBody),
        });

        expect(response.status).toBe(201);

        const body = await response.json();
        expect(body).toHaveProperty("id");
        expect(body.userId).toBe(inputBody.userId);
        expect(body.ideaId).toBe(inputBody.ideaId);
        expect(body.feedback).toBe(inputBody.feedback);
    });

    it("should get all feedback", async () => {
        const response = await fetch(`http://localhost:${port}/feedback/all`, {
            method: "GET",
        });

        expect(response.status).toBe(200);

        const body = await response.json();
        expect(body).toBeInstanceOf(Array);
    })
})