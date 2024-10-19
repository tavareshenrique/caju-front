import { describe, expect, it, Mock, vi } from 'vitest';

import api from '@/libs/axios';

import { changeRegistrationStatusUseCase } from './change-registration-status';
import { ChangeRegistrationStatusError } from './errors/change-registration-status-error';

vi.mock('@/libs/axios');

describe('changeRegistrationStatusUseCase', () => {
	it('should change the registration status', async () => {
		const id = '1';
		const newStatus = 'APPROVED';

		await changeRegistrationStatusUseCase({ id, newStatus });

		expect(api.patch).toHaveBeenCalledWith('/registrations/1', {
			status: 'APPROVED',
		});
	});

	it('should throw an error if the request fails', async () => {
		const id = '1';
		const newStatus = 'APPROVED';

		(api.patch as Mock).mockImplementationOnce(() => {
			throw new Error();
		});

		await expect(
			changeRegistrationStatusUseCase({ id, newStatus }),
		).rejects.toThrow(ChangeRegistrationStatusError);
	});
});
