import { faker } from '@faker-js/faker/locale/pt_BR';
import { describe, expect, it, Mock, vi } from 'vitest';

import api from '@/libs/axios';

import { deleteRegistrationUseCase } from './delete-registration';
import { DeleteRegistrationError } from './errors/delete-registration-error';

vi.mock('@/libs/axios');

describe('deleteRegistrationUseCase', () => {
	it('should call api.delete with correct values', async () => {
		const id = faker.string.uuid();

		await deleteRegistrationUseCase({ id });

		expect(api.delete).toHaveBeenCalledWith(`/registrations/${id}`);
	});

	it('should throw FetchingRegistrationError when api.delete throws', async () => {
		const id = faker.string.uuid();

		(api.delete as Mock).mockRejectedValueOnce(new Error('API Error'));

		await expect(deleteRegistrationUseCase({ id })).rejects.toThrow(
			DeleteRegistrationError,
		);
	});
});
