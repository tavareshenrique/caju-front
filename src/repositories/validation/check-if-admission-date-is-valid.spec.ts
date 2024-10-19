import { faker } from '@faker-js/faker/locale/pt_BR';
import { describe, expect, it } from 'vitest';

import { checkIfAdmissionDateIsValid } from './check-if-admission-date-is-valid';

describe('checkIfAdmissionDateIsValid', () => {
	it('should throw error if admission date is in the future', async () => {
		const admissionDate = faker.date.future().toISOString();

		await expect(checkIfAdmissionDateIsValid(admissionDate)).rejects.toThrow(
			'A data de admissão não pode ser uma data futura',
		);
	});

	it('should not throw error if admission date is in the past', async () => {
		const admissionDate = faker.date.past().toISOString();

		await expect(
			checkIfAdmissionDateIsValid(admissionDate),
		).resolves.not.toThrow();
	});
});
