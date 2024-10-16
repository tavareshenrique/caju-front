import api from '@/libs/axios';
import { TNewRegistrationSchema } from '@/pages/NewUser';

import { CreateRegistrationError } from './errors/create-registration-error';
import { ResourceAlreadyExistsError } from './errors/resource-already-exists';
import { ValidationError } from './errors/validation-error';
import { makeCreateRegistration } from './factories/make-create-registration';
import { TRegistrationStatus } from './interfaces/registration';

export interface IRegistrationStatus {
	id: string;
	newStatus: TRegistrationStatus;
}

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
