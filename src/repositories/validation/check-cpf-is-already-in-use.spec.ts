import { describe, expect, it, Mock, vi } from 'vitest';

import { ResourceAlreadyExistsError } from '../errors/resource-already-exists';
import { fetchRegistrationsUseCase } from '../fetch-registrations';
import { checkCpfIsAlreadyInUse } from './check-cpf-is-already-in-use';

vi.mock('../fetch-registrations', () => ({
	fetchRegistrationsUseCase: vi.fn(),
}));

describe('checkCpfIsAlreadyInUse', () => {
	it('should throw error if cps is already registered', async () => {
		const cpfValue = '123.456.789-00';
		(fetchRegistrationsUseCase as Mock).mockResolvedValue([[]]);

		await expect(checkCpfIsAlreadyInUse(cpfValue)).rejects.toThrow(
			ResourceAlreadyExistsError,
		);
		await expect(checkCpfIsAlreadyInUse(cpfValue)).rejects.toThrow(
			'CPF já cadastrado.',
		);
	});

	it('should not throw error if cpf is not registered', async () => {
		const cpfValue = '123.456.789-00';
		(fetchRegistrationsUseCase as Mock).mockResolvedValue([]);

		await expect(checkCpfIsAlreadyInUse(cpfValue)).resolves.not.toThrow();
	});
});
