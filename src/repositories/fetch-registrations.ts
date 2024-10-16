import api from '@/libs/axios';

import { FetchingRegistrationError } from './errors/fetching-registration-error';
import { TRegistration } from './interfaces/registration';

interface IFetchRegistrationsParams {
	key: string;
	value: string;
}

async function fetchRegistrationsUseCase({
	key,
	value,
}: IFetchRegistrationsParams) {
	try {
		let url = '/registrations';

		if (key && value) {
			url = `/registrations?${key}=${value}`;
		}

		const { data } = await api.get<TRegistration[]>(url);

		return data;
	} catch (error) {
		throw new FetchingRegistrationError();
	}
}

export { fetchRegistrationsUseCase };
