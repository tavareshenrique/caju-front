import api from '@/libs/axios';

import { ChangeRegistrationStatusError } from './errors/change-registration-status-error';
import { TRegistrationStatus } from './interfaces/registration';

export interface IRegistrationStatus {
	id: string;
	newStatus: TRegistrationStatus;
}

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
