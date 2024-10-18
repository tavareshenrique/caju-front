import { faker } from '@faker-js/faker/locale/pt_BR';
import { expect, test } from '@playwright/test';

import { TPerson } from './interfaces/person';

test('should validate if name not start with number', async ({ page }) => {
	const person = {
		name: '123 failed name',
		email: faker.internet.email(),
		cpf: '094.594.590-64',
		admissionDate: '2024-10-10',
	} as TPerson;

	await page.goto('http://localhost:3001/#/new-user');

	const inputName = page.getByPlaceholder('Nome');
	const inputEmail = page.getByPlaceholder('Email');
	const inputCpf = page.getByPlaceholder('CPF');
	const inputAdmissionDate = page.locator('input[name="admissionDate"]');

	await expect(inputName).toBeVisible();
	await expect(inputEmail).toBeVisible();
	await expect(inputCpf).toBeVisible();
	await expect(inputAdmissionDate).toBeVisible();

	await inputName.fill(person.name);
	await inputEmail.fill(person.email);
	await inputCpf.fill(person.cpf);
	await inputAdmissionDate.fill(person.admissionDate);

	const submitButton = page.getByRole('button', { name: 'Cadastrar' });

	await submitButton.click();

	const error = page.getByText('O nome não pode começar com um número');

	await expect(error).toBeVisible();
});

test('should not register with invalid cpf', async ({ page }) => {
	const person = {
		name: faker.person.firstName(),
		email: faker.internet.email(),
		cpf: '000.000.000-00',
		admissionDate: '2024-10-10',
	} as TPerson;

	await page.goto('http://localhost:3001/#/new-user');

	const inputName = page.getByPlaceholder('Nome');
	const inputEmail = page.getByPlaceholder('Email');
	const inputCpf = page.getByPlaceholder('CPF');
	const inputAdmissionDate = page.locator('input[name="admissionDate"]');

	await expect(inputName).toBeVisible();
	await expect(inputEmail).toBeVisible();
	await expect(inputCpf).toBeVisible();
	await expect(inputAdmissionDate).toBeVisible();

	await inputName.fill(person.name);
	await inputEmail.fill(person.email);
	await inputCpf.fill(person.cpf);
	await inputAdmissionDate.fill(person.admissionDate);

	const submitButton = page.getByRole('button', { name: 'Cadastrar' });

	await submitButton.click();

	const error = page.getByText('CPF inválido');

	await expect(error).toBeVisible();
});

test('should not register with a date in the future', async ({ page }) => {
	const person = {
		name: faker.person.firstName(),
		email: faker.internet.email(),
		cpf: '094.594.590-64',
		admissionDate: '2099-10-10',
	} as TPerson;

	await page.goto('http://localhost:3001/#/new-user');

	const inputName = page.getByPlaceholder('Nome');
	const inputEmail = page.getByPlaceholder('Email');
	const inputCpf = page.getByPlaceholder('CPF');
	const inputAdmissionDate = page.locator('input[name="admissionDate"]');

	await expect(inputName).toBeVisible();
	await expect(inputEmail).toBeVisible();
	await expect(inputCpf).toBeVisible();
	await expect(inputAdmissionDate).toBeVisible();

	await inputName.fill(person.name);
	await inputEmail.fill(person.email);
	await inputCpf.fill(person.cpf);
	await inputAdmissionDate.fill(person.admissionDate);

	const submitButton = page.getByRole('button', { name: 'Cadastrar' });

	await submitButton.click();

	await page.waitForTimeout(1000);

	const error = page
		.locator('span')
		.filter({ hasText: 'A data de admissão não pode ser uma data futura' });

	await expect(error).toBeVisible();
});
