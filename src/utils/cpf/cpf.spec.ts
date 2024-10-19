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

	describe('validator', () => {
		it('should return true for a valid CPF', () => {
			const validCpf = '123.456.789-09';
			expect(cpf.validator(validCpf)).toBe(true);
		});

		it('should return false for a CPF with less than 11 digits', () => {
			const invalidCpf = '123.456.789';
			expect(cpf.validator(invalidCpf)).toBe(false);
		});

		it('should return false for a CPF with more than 11 digits', () => {
			const invalidCpf = '123.456.789-012';
			expect(cpf.validator(invalidCpf)).toBe(false);
		});

		it('should return false for a CPF with all digits the same', () => {
			const invalidCpf = '111.111.111-11';
			expect(cpf.validator(invalidCpf)).toBe(false);
		});

		it('should return false for an invalid CPF', () => {
			const invalidCpf = '123.456.789-00';
			expect(cpf.validator(invalidCpf)).toBe(false);
		});

		it('should return true for a valid CPF without formatting', () => {
			const validCpf = '12345678909';
			expect(cpf.validator(validCpf)).toBe(true);
		});

		it('should return false for a CPF with a rest of 11', () => {
			const invalidCpf = '123.456.789-11';
			expect(cpf.validator(invalidCpf)).toBe(false);
		});

		it('should return false for a CPF with an incorrect 10th digit', () => {
			const invalidCpf = '123.456.789-08';
			expect(cpf.validator(invalidCpf)).toBe(false);
		});

		it('should return false for a CPF with a rest of 10', () => {
			const invalidCpf = '123.456.789-10';
			expect(cpf.validator(invalidCpf)).toBe(false);
		});

		it('should return false for a CPF that results in rest equal to 11', () => {
			const invalidCpf = '123.456.789-11';
			expect(cpf.validator(invalidCpf)).toBe(false);
		});

		it('should return false for a CPF that results in rest equal to 10', () => {
			const invalidCpf = '123.456.789-10';
			expect(cpf.validator(invalidCpf)).toBe(false);
		});
	});
});
