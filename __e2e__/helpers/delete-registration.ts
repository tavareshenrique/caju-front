import { Page } from '@playwright/test';

import { TPerson } from '../interfaces/person';

export async function deleteRegistration(page: Page, person: TPerson) {
	const deleteCardButton = page
		.getByRole('button', { name: person.name })
		.getByRole('button')
		.nth(3);

	await deleteCardButton.click();

	await page.waitForTimeout(500);

	const deleteDialogButton = page.getByRole('button', { name: 'Deletar' });

	await deleteDialogButton.click();

	await page.waitForTimeout(500);
}
