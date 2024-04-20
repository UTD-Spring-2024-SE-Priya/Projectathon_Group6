import { beforeAll, beforeEach, expect, describe, it } from "vitest";
import { AddIdeaToCollectionInput, CreateCollectionInput, UpdateCollectionInput } from "../src/models/collection/types";
import { app } from "../src/app";

const testUserId = 1;

type User = {
    id: number;
    email: string;
    name: string;
}

let testUser: User = {
    id: testUserId,
    email: "alice@projectathon.io",
    name: "Alice"
}

let testCollectionId: number | null;

const port = 5000;

beforeAll(() => {
    // Start the server
    app.listen(port);
    console.info(`Server started on port ${port}`);
})

describe("Collection", () => {
    it('should create a collection for the user', async () => {
        const inputBody: CreateCollectionInput = {
            userId: testUserId!,
            collectionTitle: 'Test Collection',
            collectionDescription: 'This is a test collection'
        };

        const response = await fetch(`http://localhost:${port}/collection/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputBody)
        });

        expect(response.status).toBe(201);

        const body = await response.json();

        expect(body).toHaveProperty('id');
        testCollectionId = body.id;
        console.info("Collection ID: ", testCollectionId);

        expect(body.userId).toBe(testUserId);
        expect(body.title).toBe(inputBody.collectionTitle);
        expect(body.description).toBe(inputBody.collectionDescription);
    })

    it('should update the collection for the user', async () => {
        const inputBody: UpdateCollectionInput = {
            collectionId: testCollectionId!,
            collectionTitle: 'Updated Test Collection',
            collectionDescription: 'This is an updated test collection'
        }

        const response = await fetch(`http://localhost:${port}/collection/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputBody)
        });

        expect(response.status).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('id');
        expect(body.userId).toBe(testUserId);
        expect(body.title).toBe(inputBody.collectionTitle);
        expect(body.description).toBe(inputBody.collectionDescription);
    })

    it('should add a project idea to the collection', async () => {
        const inputBody = {
            // collectionId: testCollectionId!,
            userId: 1,
            ideaId: 1
        };

        const response = await fetch(`http://localhost:${port}/collection/addIdeaToLiked`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputBody)
        });

        expect(response.status).toBe(200);
    })
});