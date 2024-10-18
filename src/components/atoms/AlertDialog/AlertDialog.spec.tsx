import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { AlertDialog } from './';

describe('AlertDialog', () => {
	it('should open the dialog when the trigger is clicked', async () => {
		const user = userEvent.setup();
		render(
			<AlertDialog.Root>
				<AlertDialog.Trigger data-testid="trigger">
					Open Dialog
				</AlertDialog.Trigger>
				<AlertDialog.Portal>
					<AlertDialog.Overlay />
					<AlertDialog.Content>
						<AlertDialog.Title>Alert Title</AlertDialog.Title>
						<AlertDialog.Description>
							This is an important alert message.
						</AlertDialog.Description>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<AlertDialog.Action>Confirm</AlertDialog.Action>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog.Root>,
		);

		expect(screen.queryByText('Alert Title')).toBeNull();

		await user.click(screen.getByTestId('trigger'));

		expect(screen.getByText('Alert Title')).toBeInTheDocument();
		expect(
			screen.getByText('This is an important alert message.'),
		).toBeInTheDocument();
		expect(screen.getByText('Cancel')).toBeInTheDocument();
		expect(screen.getByText('Confirm')).toBeInTheDocument();
	});

	it('should close the dialog when cancel button is clicked', async () => {
		const user = userEvent.setup();
		render(
			<AlertDialog.Root>
				<AlertDialog.Trigger data-testid="trigger">
					Open Dialog
				</AlertDialog.Trigger>
				<AlertDialog.Portal>
					<AlertDialog.Overlay />
					<AlertDialog.Content>
						<AlertDialog.Title>Alert Title</AlertDialog.Title>
						<AlertDialog.Description>
							This is an important alert message.
						</AlertDialog.Description>
						<AlertDialog.Cancel data-testid="cancel">Cancel</AlertDialog.Cancel>
						<AlertDialog.Action>Confirm</AlertDialog.Action>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog.Root>,
		);

		await user.click(screen.getByTestId('trigger'));
		expect(screen.getByText('Alert Title')).toBeInTheDocument();

		await user.click(screen.getByTestId('cancel'));

		expect(screen.queryByText('Alert Title')).toBeNull();
	});
});
