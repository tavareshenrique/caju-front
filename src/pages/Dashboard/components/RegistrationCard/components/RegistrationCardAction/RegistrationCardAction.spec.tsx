import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { AlertDialog } from '@/components/atoms/AlertDialog';

import { RegistrationCardAction } from './';

const { Approved, Reject, Pending, Delete } = RegistrationCardAction;

describe('RegistrationCardAction', () => {
	const mockOnRegisterStatus = vi.fn();

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('Approved', () => {
		it('renders correctly and calls onRegisterStatus when clicked', () => {
			render(
				<AlertDialog.Root>
					<Approved status="PENDING" onRegisterStatus={mockOnRegisterStatus} />,
				</AlertDialog.Root>,
			);

			const button = screen.getByRole('button', { name: /aprovar/i });
			expect(button).toBeInTheDocument();
			expect(button).not.toBeDisabled();

			fireEvent.click(button);
			expect(mockOnRegisterStatus).toHaveBeenCalledWith('APPROVED');
		});

		it('is disabled when status is APPROVED or REJECTED', () => {
			render(
				<AlertDialog.Root>
					<Approved status="APPROVED" onRegisterStatus={mockOnRegisterStatus} />
				</AlertDialog.Root>,
			);
			const button = screen.getByRole('button', { name: /aprovar/i });
			expect(button).toBeDisabled();

			render(
				<AlertDialog.Root>
					<Approved status="REJECTED" onRegisterStatus={mockOnRegisterStatus} />
				</AlertDialog.Root>,
			);
			expect(button).toBeDisabled();
		});
	});

	describe('Reject', () => {
		it('renders correctly and calls onRegisterStatus when clicked', () => {
			render(
				<AlertDialog.Root>
					<Reject status="PENDING" onRegisterStatus={mockOnRegisterStatus} />
				</AlertDialog.Root>,
			);

			const button = screen.getByRole('button', { name: /reprovar/i });
			expect(button).toBeInTheDocument();
			expect(button).not.toBeDisabled();

			fireEvent.click(button);
			expect(mockOnRegisterStatus).toHaveBeenCalledWith('REJECTED');
		});

		it('is disabled when status is REJECTED or APPROVED', () => {
			render(
				<AlertDialog.Root>
					<Reject status="REJECTED" onRegisterStatus={mockOnRegisterStatus} />
				</AlertDialog.Root>,
			);
			const button = screen.getByRole('button', { name: /reprovar/i });
			expect(button).toBeDisabled();

			render(
				<AlertDialog.Root>
					<Reject status="APPROVED" onRegisterStatus={mockOnRegisterStatus} />
				</AlertDialog.Root>,
			);
			expect(button).toBeDisabled();
		});
	});

	describe('Pending', () => {
		it('renders correctly and calls onRegisterStatus when clicked', () => {
			render(
				<AlertDialog.Root>
					<Pending status="APPROVED" onRegisterStatus={mockOnRegisterStatus} />
				</AlertDialog.Root>,
			);

			const button = screen.getByRole('button', { name: /revisar novamente/i });
			expect(button).toBeInTheDocument();
			expect(button).not.toBeDisabled();

			fireEvent.click(button);
			expect(mockOnRegisterStatus).toHaveBeenCalledWith('PENDING');
		});

		it('is disabled when status is PENDING', () => {
			render(
				<AlertDialog.Root>
					<Pending status="PENDING" onRegisterStatus={mockOnRegisterStatus} />
				</AlertDialog.Root>,
			);
			const button = screen.getByRole('button', { name: /revisar novamente/i });
			expect(button).toBeDisabled();
		});
	});

	describe('Delete', () => {
		it('calls onRegisterStatus with DELETE when clicked', () => {
			render(
				<AlertDialog.Root>
					<Delete onRegisterStatus={mockOnRegisterStatus} />
				</AlertDialog.Root>,
			);

			const deleteButton = screen.getByRole('button');

			fireEvent.click(deleteButton);
			expect(mockOnRegisterStatus).toHaveBeenCalledWith('DELETE');
		});
	});
});
