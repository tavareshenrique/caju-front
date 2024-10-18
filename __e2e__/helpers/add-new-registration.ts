import { expect, Page } from '@playwright/test';

import { TPerson } from '../dashboard.spec';

export async function addNewRegistration(page: Page, person: TPerson) {
	const addNewRegistrationButton = page
		.getByRole('button', { name: 'Nova Admissão' })
		.first();

	await addNewRegistrationButton.click();

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
}
