import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { NewUserPage } from './';

const historyMock = vi.fn();

vi.mock('react-router-dom', () => ({
	useHistory: () => ({
		push: historyMock,
	}),
}));

const queryClient = new QueryClient();

describe('NewUserPage', () => {
	it('should render the page', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<NewUserPage />
			</QueryClientProvider>,
		);

		expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/cpf/i)).toBeInTheDocument();
		expect(screen.getByText(/data de admissão/i)).toBeInTheDocument();
		expect(
			screen.getByRole('button', {
				name: /cadastrar/i,
			}),
		).toBeInTheDocument();
	});
});
