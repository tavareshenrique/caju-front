import { useMutation, useQueryClient } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { useRegistrationCard } from './';

vi.mock('@tanstack/react-query', () => ({
	useMutation: vi.fn(),
	useQueryClient: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
	toast: {
		error: vi.fn(),
	},
}));

vi.mock('@/repositories/change-registration-status', () => ({
	changeRegistrationStatusUseCase: vi.fn(),
}));

vi.mock('@/repositories/delete-registration', () => ({
	deleteRegistrationUseCase: vi.fn(),
}));

describe('useRegistrationCard', () => {
	const cardId = '123';
	const queryClient = {
		invalidateQueries: vi.fn(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
		(useQueryClient as Mock).mockReturnValue(queryClient);
	});

	it('should initialize with null status', () => {
		const { result } = renderHook(() => useRegistrationCard({ cardId }));
		expect(result.current.status).toBeNull();
	});

	it('should update the status when handleRegistrationStatus is called', () => {
		const { result } = renderHook(() => useRegistrationCard({ cardId }));

		act(() => {
			result.current.handleRegistrationStatus('APPROVED');
		});

		expect(result.current.status).toBe('APPROVED');
	});

	it('should call updateStatusMutation on handleConfirmationAction for status update', async () => {
		const mutateFn = vi.fn();
		(useMutation as Mock).mockReturnValue({
			mutate: mutateFn,
		});

		const { result } = renderHook(() => useRegistrationCard({ cardId }));

		await act(() => {
			result.current.handleRegistrationStatus('APPROVED');
		});

		await act(() => {
			result.current.handleConfirmationAction();

			expect(mutateFn).toHaveBeenCalledWith({
				id: cardId,
				newStatus: 'APPROVED',
			});
		});
	});

	it('should call deleteMutation on handleConfirmationAction when status is DELETE', async () => {
		const mutateFn = vi.fn();
		(useMutation as Mock).mockReturnValue({
			mutate: mutateFn,
		});

		const { result } = renderHook(() => useRegistrationCard({ cardId }));

		act(() => {
			result.current.handleRegistrationStatus('DELETE');
		});

		act(() => {
			result.current.handleConfirmationAction();

			expect(mutateFn).toHaveBeenCalledWith({ id: cardId });
		});
	});

	it('should validate when status is empty', async () => {
		const mutateFn = vi.fn();
		(useMutation as Mock).mockReturnValue({
			mutate: mutateFn,
		});

		const { result } = renderHook(() => useRegistrationCard({ cardId }));

		act(() => {
			result.current.handleConfirmationAction();

			expect(mutateFn).not.toBeCalled();
		});
	});
});
