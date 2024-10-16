import { cpf } from '@/helpers/cpf';
import api from '@/libs/axios';
import { TNewRegistrationSchema } from '@/pages/NewUser';

import { CpfAlreadyExistsError } from './errors/cpf-already-exists-error';
import { CreateRegistrationError } from './errors/create-registration-errror';
import { NameFirstLetterIsNumberError } from './errors/name-first-letter-is-number-error';
import { fetchRegistrationsUseCase } from './fetch-registrations';
import { TRegistrationStatus } from './interfaces/registration';

export interface IRegistrationStatus {
	id: string;
	newStatus: TRegistrationStatus;
}

async function createRegistrationUseCase(data: TNewRegistrationSchema) {
	try {
		const cpfWithoutMask = cpf.removeMask(data.cpf);

		const cpfAlreadyExists = await fetchRegistrationsUseCase(cpfWithoutMask);

		if (cpfAlreadyExists.length > 0) {
			throw new CpfAlreadyExistsError();
		}

		const nameWithoutSpaces = data.employeeName.trim();

		const checkIfFirstLetterIsNumber = nameWithoutSpaces.match(/^\d/);

		if (checkIfFirstLetterIsNumber) {
			throw new NameFirstLetterIsNumberError();
		}

		const formattedData = Intl.DateTimeFormat('pt-BR').format(
			new Date(data.admissionDate),
		);

		await api.post('/registrations', {
			...data,
			cpf: cpfWithoutMask,
			admissionDate: formattedData,
		});
	} catch (error) {
		if (error instanceof CpfAlreadyExistsError) {
			throw error;
		}

		if (error instanceof NameFirstLetterIsNumberError) {
			throw error;
		}

		throw new CreateRegistrationError();
	}
}

export { createRegistrationUseCase };
