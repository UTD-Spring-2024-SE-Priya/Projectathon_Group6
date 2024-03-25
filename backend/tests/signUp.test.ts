import { describe, it, expect, vi, beforeEach } from 'vitest';
// import request from 'supertest';
import express, { Express } from 'express';
import { PrismaClient } from '@prisma/client';

import app from "../src/app"

// Mock the Prisma Client
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: vi.fn().mockImplementation(() => ({
      user: {
        create: vi.fn().mockResolvedValue({
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          password: 'hashedPassword'
        })
      }
    }))
  };
});

describe('POST /signup', () => {
  it('should create a new user and return it', async () => {
    const testUser = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123'
    }

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(testUser)
    });

    expect(response.status).toBe(201);

    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(body.email).toBe('test@example.com');
    expect(body.name).toBe('Test User');
    // Do not return or assert the password
  });
});
