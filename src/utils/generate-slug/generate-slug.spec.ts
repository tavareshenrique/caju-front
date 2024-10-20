import { describe, expect, it } from 'vitest';

import { generateSlug } from './';

describe('generateSlug', () => {
	it('should return a slug from a string', () => {
		const result = generateSlug('John Doe');
		expect(result).toBe('john-doe');
	});
});
