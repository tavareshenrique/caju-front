import api from '@/libs/axios';

import { ChangeRegistrationStatusError } from './errors/change-registration-status-error';
import { IRegistrationStatus } from './interfaces/registration';

async function changeRegistrationStatusUseCase({
	id,
	newStatus,
}: IRegistrationStatus) {
	try {
		await api.patch(`/registrations/${id}`, {
			status: newStatus,
		});
	} catch (error) {
		throw new ChangeRegistrationStatusError();
	}
}

export { changeRegistrationStatusUseCase };
