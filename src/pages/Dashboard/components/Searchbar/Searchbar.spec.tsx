import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { useSearchForm } from '../../hooks/useSearchForm';
import { SearchBar } from './';

const historyMock = vi.fn();

vi.mock('react-router-dom', () => ({
	useHistory: () => ({
		push: historyMock,
	}),
}));

vi.mock('../../hooks/useSearchForm', () => ({
	useSearchForm: vi.fn(),
}));

const mockOnChange = vi.fn();

vi.mock('react-hook-form', () => ({
	Controller: ({ render, ...rest }: any) =>
		render({
			field: { onChange: mockOnChange(), value: '123' },
			fieldState: {},
			formState: {},
			...rest,
		}),
}));

const queryClient = new QueryClient();

describe('SearchBar', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should reset the CPF field and invalidate the query when clear icon is clicked', async () => {
		const mockControl = { control: {}, resetField: vi.fn() };
		(useSearchForm as Mock).mockReturnValue(mockControl);

		const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

		render(
			<QueryClientProvider client={queryClient}>
				<SearchBar />
			</QueryClientProvider>,
		);

		fireEvent.click(screen.getByRole('button', { name: /limpar campo/i }));

		await waitFor(() => {
			expect(mockControl.resetField).toHaveBeenCalledWith('cpf');
			expect(invalidateQueriesSpy).toHaveBeenCalledWith({
				queryKey: ['registrations'],
			});
		});
	});

	it('should refetch when the refresh button is clicked', async () => {
		const mockControl = { control: {}, resetField: vi.fn() };
		(useSearchForm as Mock).mockReturnValue(mockControl);

		const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

		render(
			<QueryClientProvider client={queryClient}>
				<SearchBar />
			</QueryClientProvider>,
		);

		fireEvent.click(screen.getByRole('button', { name: /refetch/i }));

		await waitFor(() => {
			expect(invalidateQueriesSpy).toHaveBeenCalledWith({
				queryKey: ['registrations'],
			});
		});
	});
});
