import { describe, expect, it } from 'vitest';

import { cpf } from './';

describe('cpf', () => {
	it('should apply mask to cpf', () => {
		const cpfValue = '12345678901';
		const expected = '123.456.789-01';

		const result = cpf.applyMask(cpfValue);

		expect(result).toBe(expected);
	});

	it('should remove mask from cpf', () => {
		const cpfValue = '123.456.789-01';
		const expected = '12345678901';

		const result = cpf.removeMask(cpfValue);

		expect(result).toBe(expected);
	});

	it('should return false when cpf is invalid', () => {
		const cpfValue = '123.456.789-01';

		const result = cpf.validator(cpfValue);

		expect(result).toBe(false);
	});

	it('should return true when cpf is valid', () => {
		const cpfValue = '20978595009';

		const result = cpf.validator(cpfValue);

		expect(result).toBe(true);
	});
});
