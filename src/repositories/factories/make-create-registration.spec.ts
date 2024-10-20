import { faker } from '@faker-js/faker/locale/pt_BR';
import { describe, expect, it, vi } from 'vitest';

import { TNewRegistrationSchema } from '@/pages/NewUser/hooks/useNewUserPage';

import { makeCreateRegistration } from './make-create-registration';

vi.mock('@/libs/axios');
vi.mock('./fetch-registrations');
vi.mock('../validation/check-cpf-is-already-in-use');
vi.mock('../validation/check-email-is-already-in-use');

describe('makeCreateRegistration', () => {
	it('should return a new registration', async () => {
		const data: TNewRegistrationSchema = {
			id: faker.string.uuid(),
			employeeName: faker.person.firstName(),
			email: faker.internet.email(),
			admissionDate: '2024-01-06',
			status: 'PENDING',
			cpf: '536.583.090-32',
		};

		const result = await makeCreateRegistration(data);

		expect(result).toEqual({
			...data,
			cpf: '53658309032',
			admissionDate: '06/01/2024',
		});
	});
});
