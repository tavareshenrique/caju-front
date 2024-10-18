import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { NewRegisterButton } from './';

const historyMock = vi.fn();

vi.mock('react-router-dom', () => ({
	useHistory: () => ({
		push: historyMock,
	}),
}));

describe('NewRegisterButton', () => {
	it('renders the button with correct text', () => {
		render(<NewRegisterButton />);

		const button = screen.getByRole('button', { name: /nova admiss/i });

		expect(button).toBeInTheDocument();
	});

	it('navigates to new user route on button click', () => {
		render(<NewRegisterButton />);

		const button = screen.getByRole('button', { name: /nova admiss/i });

		button.click();

		expect(historyMock).toHaveBeenCalledWith('/new-user');
	});
});
