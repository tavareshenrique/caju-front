import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createRegistrationUseCase } from '@/repositories/create-registration';
import { ResourceAlreadyExistsError } from '@/repositories/errors/resource-already-exists-error';

import { useNewUserPage } from './';

vi.mock('react-hot-toast', () => ({
	default: {
		error: vi.fn(),
	},
}));

vi.mock('uuid', () => ({
	v4: vi.fn(() => 'mock-uuid'),
}));

const historyMock = vi.fn();

vi.mock('react-router-dom', () => ({
	useHistory: () => ({
		push: historyMock,
	}),
}));

vi.mock('@/repositories/create-registration', () => ({
	createRegistrationUseCase: vi.fn(),
}));

vi.mock('@hookform/resolvers/zod');

describe('useNewUserPage Hook', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should handle successful form submission and redirect', async () => {
		const { result } = renderHook(() => useNewUserPage());

		const formData = {
			admissionDate: '2022-01-01',
			cpf: '12345678900',
			email: 'test@test.com',
			employeeName: 'John Doe',
			id: 'mock-uuid',
			status: 'PENDING',
		};

		await act(async () => {
			await result.current.onSubmit(formData as any);
		});

		expect(createRegistrationUseCase).toHaveBeenCalled();
		expect(historyMock).toHaveBeenCalled();
	});

	it('should disable submit button if any required field is empty', () => {
		const { result } = renderHook(() => useNewUserPage());

		expect(result.current.isSubmitButtonDisabled).toBe(true);
	});

	it('should handle ResourceAlreadyExistsError', async () => {
		vi.mocked(createRegistrationUseCase).mockRejectedValueOnce(
			new ResourceAlreadyExistsError('Registration already exists', 'email'),
		);

		const { result } = renderHook(() => useNewUserPage());

		await act(async () => {
			result.current.onSubmit({
				admissionDate: '2022-01-01',
				email: 'test@test.com',
				employeeName: 'John Doe',
				cpf: '12345678900',
				id: 'mock-uuid',
				status: 'PENDING',
			} as any);
		});

		expect(result.current.errors.email?.message).toBe(
			'Registration already exists',
		);
	});
});
