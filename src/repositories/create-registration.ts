import api from '@/libs/axios';
import { TNewRegistrationSchema } from '@/pages/NewUser';

import { CreateRegistrationError } from './errors/create-registration-errror';
import { TRegistrationStatus } from './interfaces/registration';

export interface IRegistrationStatus {
	id: string;
	newStatus: TRegistrationStatus;
}

async function createRegistration({
	admissionDate,
	cpf,
	email,
	employeeName,
	id,
	status,
}: TNewRegistrationSchema) {
	try {
		await api.post('/registrations', {
			id,
			employeeName,
			email,
			cpf,
			admissionDate,
			status,
		});
	} catch (error) {
		throw new CreateRegistrationError();
	}
}

export { createRegistration };
