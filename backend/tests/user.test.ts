import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
// import request from 'supertest';
import { PrismaClient } from '@prisma/client';

import { randomUUID } from 'crypto';
import { app } from '../src/app';
import { CreateCollectionInput } from '../src/models/collection/types';

let testUser: { email: string, name: string, password: string } | null = null;

let testUserId: number | null = null;

function getTestUser() {
  if (!testUser) {
    return {
      email: `test${randomUUID()}@example.com`,
      name: 'Test User',
      password: 'password123'
    };
  }

  return testUser;
}

beforeAll(() => {
  // Start the server
  app.listen(5000);
  console.info("Server started on port 3000");
})

describe('POST /signup', () => {
  it('should create a new user and return it', async () => {
    const testUser = getTestUser();

    const response = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(testUser)
    });

    console.info("successfully created user");

    expect(response.status).toBe(201);

    const body = await response.json();

    expect(body).toHaveProperty('id');
    testUserId = body.id;

    expect(body.email).toBe(testUser.email);
    expect(body.name).toBe(testUser.name);
    // Do not return or assert the password
  });

  it('should delete the user', async () => {
    if (!testUserId) {
      console.error("No test user to delete");
      return;
    }

    const response = await fetch(`http://localhost:5000/user/delete/${testUserId}`, {
      method: "DELETE",
    });

    expect(response.status).toBe(200);
  });

});
