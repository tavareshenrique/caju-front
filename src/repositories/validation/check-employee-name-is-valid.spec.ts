import { faker } from '@faker-js/faker/locale/pt_BR';
import { describe, expect, it } from 'vitest';

import { checkEmployeeNameIsValid } from './check-employee-name-is-valid';

describe('checkEmployeeNameIsValid', () => {
	it('should throw error when employee name starts with a number', async () => {
		const employeeName = faker.person.firstName();
		const employeeNameWithNumber = `1${employeeName}`;

		await expect(
			checkEmployeeNameIsValid(employeeNameWithNumber),
		).rejects.toThrow('A primeira letra do nome não pode ser um número');
	});

	it('should not throw error when employee name does not start with a number', async () => {
		const employeeName = faker.person.firstName();

		await expect(checkEmployeeNameIsValid(employeeName)).resolves.not.toThrow();
	});
});
