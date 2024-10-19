import api from '@/libs/axios';
import { TNewRegistrationSchema } from '@/pages/NewUser/hooks/useNewUserPage';

import { CreateRegistrationError } from './errors/create-registration-error';
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error';
import { ValidationError } from './errors/validation-error';
import { makeCreateRegistration } from './factories/make-create-registration';

async function createRegistrationUseCase(data: TNewRegistrationSchema) {
	try {
		const { admissionDate, cpf, email, employeeName, id, status } =
			await makeCreateRegistration(data);

		await api.post('/registrations', {
			admissionDate,
			cpf,
			email,
			employeeName,
			id,
			status,
		});
	} catch (error) {
		const validateErrors = [ResourceAlreadyExistsError, ValidationError];

		if (validateErrors.some((err) => error instanceof err)) {
			throw error;
		}

		throw new CreateRegistrationError();
	}
}

export { createRegistrationUseCase };
