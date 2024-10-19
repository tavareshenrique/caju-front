import { faker } from '@faker-js/faker/locale/pt_BR';
import { describe, expect, it, Mock, vi } from 'vitest';

import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error';
import { fetchRegistrationsUseCase } from '../fetch-registrations';
import { checkEmailIsAlreadyInUse } from './check-email-is-already-in-use';

vi.mock('../fetch-registrations', () => ({
	fetchRegistrationsUseCase: vi.fn(),
}));

describe('checkEmailIsAlreadyInUse', () => {
	it('should throw error if email is already registered', async () => {
		const emailValue = faker.internet.email();

		(fetchRegistrationsUseCase as Mock).mockResolvedValue([[]]);

		await expect(checkEmailIsAlreadyInUse(emailValue)).rejects.toThrow(
			ResourceAlreadyExistsError,
		);
		await expect(checkEmailIsAlreadyInUse(emailValue)).rejects.toThrow(
			'Email já cadastrado.',
		);
	});

	it('should not throw error if email is not registered', async () => {
		const emailValue = faker.internet.email();

		(fetchRegistrationsUseCase as Mock).mockResolvedValue([]);

		await expect(checkEmailIsAlreadyInUse(emailValue)).resolves.not.toThrow();
	});
});
