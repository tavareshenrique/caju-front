import { faker } from '@faker-js/faker/locale/pt_BR';
import { describe, expect, it, Mock, vi } from 'vitest';

import api from '@/libs/axios';

import { FetchingRegistrationError } from './errors/fetching-registration-error';
import { fetchRegistrationsUseCase } from './fetch-registrations';
import { TRegistration } from './interfaces/registration';

vi.mock('@/libs/axios');

describe('fetchRegistrationsUseCase', () => {
	const mockData: TRegistration[] = [
		{
			id: faker.string.uuid(),
			employeeName: faker.person.firstName(),
			admissionDate: faker.date.recent().toISOString(),
			cpf: '123.456.789-00',
			email: faker.internet.email(),
			status: 'PENDING',
		},
	];

	it('should fetch registrations without filters', async () => {
		(api.get as Mock).mockResolvedValueOnce({ data: mockData });

		const result = await fetchRegistrationsUseCase({ key: '', value: '' });

		expect(api.get).toHaveBeenCalledWith('/registrations');
		expect(result).toEqual(mockData);
	});

	it('should fetch registrations with filters', async () => {
		const key = 'status';
		const value = 'approved';
		(api.get as Mock).mockResolvedValueOnce({ data: mockData });

		const result = await fetchRegistrationsUseCase({ key, value });

		expect(api.get).toHaveBeenCalledWith(`/registrations?${key}=${value}`);
		expect(result).toEqual(mockData);
	});

	it('should throw FetchingRegistrationError on API error', async () => {
		(api.get as Mock).mockRejectedValueOnce(new Error('API Error'));

		await expect(
			fetchRegistrationsUseCase({ key: '', value: '' }),
		).rejects.toThrow(FetchingRegistrationError);
	});
});
