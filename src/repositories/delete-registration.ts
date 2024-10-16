import api from '@/libs/axios';

import { DeleteRegistrationError } from './errors/delete-registration-error';

export interface IDeleteRegistration {
	id: string;
}

async function deleteRegistrationUseCase({ id }: IDeleteRegistration) {
	try {
		await api.delete(`/registrations/${id}`);
	} catch (error) {
		throw new DeleteRegistrationError();
	}
}

export { deleteRegistrationUseCase };
