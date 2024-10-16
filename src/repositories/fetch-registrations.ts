import { cpf } from '@/helpers/cpf';
import api from '@/libs/axios';

import { FetchingRegistrationError } from './errors/fetching-registration-error';
import { TRegistration } from './interfaces/registration';

async function fetchRegistrationsUseCase(cpfValue?: string) {
	try {
		let url = '/registrations';

		if (cpfValue) {
			const cpfWithoutMask = cpf.removeMask(cpfValue || '');

			url = `/registrations?cpf=${cpfWithoutMask}`;
		}

		const { data } = await api.get<TRegistration[]>(url);

		return data;
	} catch (error) {
		throw new FetchingRegistrationError();
	}
}

export { fetchRegistrationsUseCase };
