import { faker } from '@faker-js/faker/locale/pt_BR';
import { expect, test } from '@playwright/test';
import generateCpf from 'gerar-cpf';

import { generateSlug } from '../src/utils/generate-slug';
import { addNewRegistration } from './helpers/add-new-registration';
import { deleteRegistration } from './helpers/delete-registration';
import { TPerson } from './interfaces/person';

test.describe('Buttons Events', () => {
	const person = {
		name: faker.person.firstName(),
		email: faker.internet.email(),
		cpf: generateCpf(),
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

		const personButton = page.getByRole('button', { name: person.name });

		await expect(personButton).toBeVisible();
	});

	test('should be possible to register a new registration and move it to APPROVED', async ({
		page,
	}) => {
		await page.goto('http://localhost:3001/dashboard');

		await addNewRegistration(page, person);

		const approvedButton = page
			.getByTestId(`registration-card-${generateSlug(person.name)}-pending`)
			.getByRole('button', { name: 'Aprovar' });

		await approvedButton.click();

		await page.waitForTimeout(1000);

		const confirmApprovedButton = page.getByRole('button', { name: 'Aprovar' });

		await confirmApprovedButton.click();

		await page.waitForTimeout(1000);

		const approvedCard = page.getByTestId(
			`registration-card-${generateSlug(person.name)}-approved`,
		);

		await expect(approvedCard).toBeVisible();
	});

	test('should be possible to register a new registration and move it to REJECTED', async ({
		page,
	}) => {
		await page.goto('http://localhost:3001/dashboard');

		await addNewRegistration(page, person);

		const rejectedButton = page
			.getByTestId(`registration-card-${generateSlug(person.name)}-pending`)
			.getByRole('button', { name: 'Reprovar' });

		await rejectedButton.click();

		await page.waitForTimeout(1000);

		const confirmRejectedButton = page.getByRole('button', {
			name: 'Reprovar',
		});

		await confirmRejectedButton.click();

		await page.waitForTimeout(1000);

		const rejectedCard = page.getByTestId(
			`registration-card-${generateSlug(person.name)}-rejected`,
		);

		await expect(rejectedCard).toBeVisible();
	});

	test('should be possible to register a new registration and move it to PENDING', async ({
		page,
	}) => {
		await page.goto('http://localhost:3001/dashboard');

		await addNewRegistration(page, person);

		const rejectedButton = page
			.getByTestId(`registration-card-${generateSlug(person.name)}-pending`)
			.getByRole('button', { name: 'Reprovar' });

		await rejectedButton.click();

		await page.waitForTimeout(1000);

		const confirmRejectedButton = page.getByRole('button', {
			name: 'Reprovar',
		});

		await confirmRejectedButton.click();

		page.waitForTimeout(1000);

		const rejectedCard = page.getByTestId(
			`registration-card-${generateSlug(person.name)}-rejected`,
		);

		await expect(rejectedCard).toBeVisible();

		const pendingButton = page
			.getByTestId(`registration-card-${generateSlug(person.name)}-rejected`)
			.getByRole('button', { name: 'Revisar novamente' });

		await pendingButton.click();

		await page.waitForTimeout(1000);

		const confirmPendingButton = page.getByRole('button', {
			name: 'Revisar',
		});

		await confirmPendingButton.click();

		page.waitForTimeout(1000);

		const pendingCard = page.getByTestId(
			`registration-card-${generateSlug(person.name)}-pending`,
		);

		await expect(pendingCard).toBeVisible();
	});
});

test.describe('Filter', () => {
	const person1 = {
		name: faker.person.firstName(),
		email: faker.internet.email(),
		cpf: generateCpf(),
		admissionDate: '2024-10-10',
	} as TPerson;

	const person2 = {
		name: faker.person.firstName(),
		email: faker.internet.email(),
		cpf: generateCpf(),
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

		const person1Card = page.getByTestId(
			`registration-card-${generateSlug(person1.name)}-pending`,
		);
		const person2Card = page.getByTestId(
			`registration-card-${generateSlug(person2.name)}-pending`,
		);

		await expect(person1Card).toBeVisible();
		await expect(person2Card).toBeVisible();

		const cpfInput = page.getByPlaceholder('Digite um CPF válido');

		await cpfInput.fill(person2.cpf);

		page.waitForTimeout(1000);

		expect(person1Card).toBeHidden();
		expect(person2Card).toBeVisible();

		await cpfInput.fill('');

		page.waitForTimeout(1000);

		await expect(person1Card).toBeVisible();
		await expect(person2Card).toBeVisible();
	});
});
