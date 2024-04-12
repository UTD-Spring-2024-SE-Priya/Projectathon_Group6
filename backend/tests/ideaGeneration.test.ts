import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ideaGeneration } from "../src/utils"

describe('ideaGeneration()', () => {
    it('should return a promise containing a generated idea', () => {
        ideaGeneration("",["rust", "java"], ["frontend", "backend", "AI"], 10).then((value) => {
            expect(value).toBe('');
        });
        ideaGeneration("beginner",["rust", "c"], ["backend", "AI"], 0).then((value) => {
            expect(value).toBe('');
        });
    });
});