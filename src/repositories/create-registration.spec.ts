import { describe, expect, it, Mock, vi } from 'vitest';

import api from '@/libs/axios';
import { TNewRegistrationSchema } from '@/pages/NewUser/hooks/useNewUserPage';

import { createRegistrationUseCase } from './create-registration';
import { CreateRegistrationError } from './errors/create-registration-error';
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error';
import { ValidationError } from './errors/validation-error';
import { makeCreateRegistration } from './factories/make-create-registration';

vi.mock('@/libs/axios');
vi.mock('./factories/make-create-registration');

describe('createRegistrationUseCase', () => {
	const mockData: TNewRegistrationSchema = {
		admissionDate: '2023-01-01',
		cpf: '123.456.789-00',
		email: 'test@example.com',
		employeeName: 'Test User',
		id: '1',
		status: 'active',
	};

	it('should create a registration successfully', async () => {
		(makeCreateRegistration as Mock).mockResolvedValueOnce(mockData);
		(api.post as Mock).mockResolvedValueOnce({});

		await createRegistrationUseCase(mockData);

		expect(makeCreateRegistration).toHaveBeenCalledWith(mockData);
		expect(api.post).toHaveBeenCalledWith('/registrations', mockData);
	});

	it('should throw ResourceAlreadyExistsError if it occurs', async () => {
		(makeCreateRegistration as Mock).mockResolvedValueOnce(mockData);
		(api.post as Mock).mockRejectedValueOnce(
			new ResourceAlreadyExistsError(
				'Dados já cadastrados previamente.',
				'cpf',
			),
		);

		await expect(createRegistrationUseCase(mockData)).rejects.toThrow(
			ResourceAlreadyExistsError,
		);

		expect(makeCreateRegistration).toHaveBeenCalledWith(mockData);
		expect(api.post).toHaveBeenCalledWith('/registrations', mockData);
	});

	it('should throw ValidationError if it occurs', async () => {
		(makeCreateRegistration as Mock).mockResolvedValueOnce(mockData);
		(api.post as Mock).mockRejectedValueOnce(
			new ValidationError('Validation error message', 'property'),
		);

		await expect(createRegistrationUseCase(mockData)).rejects.toThrow(
			ValidationError,
		);

		expect(makeCreateRegistration).toHaveBeenCalledWith(mockData);
		expect(api.post).toHaveBeenCalledWith('/registrations', mockData);
	});

	it('should throw CreateRegistrationError on any other error', async () => {
		(makeCreateRegistration as Mock).mockResolvedValueOnce(mockData);
		(api.post as Mock).mockRejectedValueOnce(new Error('Unknown Error'));

		await expect(createRegistrationUseCase(mockData)).rejects.toThrow(
			CreateRegistrationError,
		);

		expect(makeCreateRegistration).toHaveBeenCalledWith(mockData);
		expect(api.post).toHaveBeenCalledWith('/registrations', mockData);
	});
});
