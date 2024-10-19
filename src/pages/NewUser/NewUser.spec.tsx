import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { cpf } from '@/utils/cpf';

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

	it('should call onChange with the masked CPF value', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<NewUserPage />
			</QueryClientProvider>,
		);

		const cpfInput = screen.getByPlaceholderText(/cpf/i) as HTMLInputElement;
		const maskedCPF = cpf.applyMask('12345678900');

		fireEvent.change(cpfInput, { target: { value: '12345678900' } });

		expect(cpfInput.value).toBe(maskedCPF);
	});

	it('should call goToHome when IconButton is clicked', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<NewUserPage />
			</QueryClientProvider>,
		);

		const iconButton = screen.getByRole('button', { name: /back/i });

		fireEvent.click(iconButton);

		expect(historyMock).toHaveBeenCalledWith('/dashboard');
	});
});
