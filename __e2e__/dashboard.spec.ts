import { faker } from '@faker-js/faker/locale/pt_BR';
import { expect, test } from '@playwright/test';

import { addNewRegistration } from './helpers/add-new-registration';
import { deleteRegistration } from './helpers/delete-registration';
import { TPerson } from './new-registration.spec';

test.describe('Buttons Events', () => {
	const person = {
		name: faker.person.firstName(),
		email: faker.internet.email(),
		cpf: '422.390.580-56',
		admissionDate: '2024-10-10',
	} as TPerson;

	test.afterEach(async ({ page }) => {
		await deleteRegistration(page, person);
	});

	test('should be possible to register a new registration and view it', async ({
		page,
	}) => {
		await page.goto('http://localhost:3001/dashboard');

		await addNewRegistration(page, person);

		expect(page.getByRole('button', { name: person.name })).toBeVisible();
	});

	test('should be possible to register a new registration and move it to APPROVED', async ({
		page,
	}) => {
		await page.goto('http://localhost:3001/dashboard');

		await addNewRegistration(page, person);

		const approvedButton = page.getByRole('button', {
			name: 'Aprovar',
			exact: true,
		});

		await approvedButton.click();

		await page.waitForTimeout(1000);

		const confirmApprovedButton = page.getByRole('button', { name: 'Aprovar' });

		await confirmApprovedButton.click();

		page.waitForTimeout(1000);

		expect(page.getByText(`Aprovado${person.name}`)).toBeVisible();
	});

	test('should be possible to register a new registration and move it to REJECTED', async ({
		page,
	}) => {
		await page.goto('http://localhost:3001/dashboard');

		await addNewRegistration(page, person);

		const rejectedButton = page.getByRole('button', {
			name: 'Reprovar',
			exact: true,
		});

		await rejectedButton.click();

		await page.waitForTimeout(1000);

		const confirmRejectedButton = page.getByRole('button', {
			name: 'Reprovar',
		});

		await confirmRejectedButton.click();

		page.waitForTimeout(1000);

		expect(page.getByText(`Reprovado${person.name}`)).toBeVisible();
	});

	test('should be possible to register a new registration and move it to PENDING', async ({
		page,
	}) => {
		await page.goto('http://localhost:3001/dashboard');

		await addNewRegistration(page, person);

		const rejectedButton = page.getByRole('button', {
			name: 'Reprovar',
			exact: true,
		});

		await rejectedButton.click();

		await page.waitForTimeout(1000);

		const confirmRejectedButton = page.getByRole('button', {
			name: 'Reprovar',
		});

		await confirmRejectedButton.click();

		page.waitForTimeout(1000);

		expect(page.getByText(`Reprovado${person.name}`)).toBeVisible();

		const pendingButton = page.getByRole('button', {
			name: 'Revisar novamente',
			exact: true,
		});

		await pendingButton.click();

		await page.waitForTimeout(1000);

		const confirmPendingButton = page.getByRole('button', {
			name: 'Revisar',
		});

		await confirmPendingButton.click();

		expect(page.getByText(`Pronto para revisar${person.name}`)).toBeVisible();
	});
});

test.describe('Filter', () => {
	const person1 = {
		name: faker.person.firstName(),
		email: faker.internet.email(),
		cpf: '422.390.580-56',
		admissionDate: '2024-10-10',
	} as TPerson;

	const person2 = {
		name: faker.person.firstName(),
		email: faker.internet.email(),
		cpf: '416.707.600-49',
		admissionDate: '2024-10-15',
	} as TPerson;

	test.afterEach(async ({ page }) => {
		await deleteRegistration(page, person1);
		await deleteRegistration(page, person2);
	});

	test('should find registration by CPF', async ({ page }) => {
		await page.goto('http://localhost:3001/dashboard');

		await addNewRegistration(page, person1);
		await addNewRegistration(page, person2);

		expect(page.getByRole('button', { name: person1.name })).toBeVisible();
		expect(page.getByRole('button', { name: person1.name })).toBeVisible();

		const cpfInput = page.getByPlaceholder('Digite um CPF válido');

		await cpfInput.fill(person2.cpf);

		page.waitForTimeout(1000);

		const register1 = page.getByRole('button', { name: person1.name });
		const register2 = page.getByRole('button', { name: person2.name });

		expect(register1).toBeHidden();
		expect(register2).toBeVisible();

		await cpfInput.fill('');

		page.waitForTimeout(1000);
	});
});
