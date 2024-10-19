import { fireEvent, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { RegistrationCardAlert } from './';

vi.mock('@/components/atoms/AlertDialog', () => ({
	AlertDialog: {
		Portal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
		Overlay: () => <div role="presentation" />,
		Content: ({ children }: { children: ReactNode }) => <div>{children}</div>,
		Title: ({ children }: { children: ReactNode }) => <h1>{children}</h1>,
		Description: ({ children }: { children: ReactNode }) => <p>{children}</p>,
		Action: ({
			children,
			onClick,
		}: {
			children: ReactNode;
			onClick?: () => void;
		}) => <div onClick={onClick}>{children}</div>,
	},
}));

describe('RegistrationCardAlert', () => {
	const mockHandleConfirmationAction = vi.fn();

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders correctly for APPROVED status', () => {
		const { getByText } = render(
			<RegistrationCardAlert
				status="APPROVED"
				data={{ employeeName: 'John Doe' }}
				handleConfirmationAction={mockHandleConfirmationAction}
			/>,
		);

		expect(getByText('Aprovar registro')).toBeInTheDocument();
		expect(
			getByText('Tem certeza que deseja aprovar o registro do(a) John Doe'),
		).toBeInTheDocument();
		expect(getByText('Aprovar')).toBeInTheDocument();
		expect(getByText('Cancelar')).toBeInTheDocument();
	});

	it('renders correctly for REJECTED status', () => {
		const { getByText } = render(
			<RegistrationCardAlert
				status="REJECTED"
				data={{ employeeName: 'Jane Doe' }}
				handleConfirmationAction={mockHandleConfirmationAction}
			/>,
		);

		expect(getByText('Reprovar registro')).toBeInTheDocument();
		expect(
			getByText('Tem certeza que deseja reprovar o registro do(a) Jane Doe'),
		).toBeInTheDocument();
		expect(getByText('Reprovar')).toBeInTheDocument();
		expect(getByText('Cancelar')).toBeInTheDocument();
	});

	it('renders correctly for PENDING status', () => {
		const { getByText } = render(
			<RegistrationCardAlert
				status="PENDING"
				data={{ employeeName: 'Jack Smith' }}
				handleConfirmationAction={mockHandleConfirmationAction}
			/>,
		);

		expect(getByText('Revisar registro')).toBeInTheDocument();
		expect(
			getByText('Tem certeza que deseja revisar o registro do(a) Jack Smith'),
		).toBeInTheDocument();
		expect(getByText('Revisar')).toBeInTheDocument();
		expect(getByText('Cancelar')).toBeInTheDocument();
	});

	it('renders correctly for DELETE status', () => {
		const { getByText } = render(
			<RegistrationCardAlert
				status="DELETE"
				data={{ employeeName: 'Alice Cooper' }}
				handleConfirmationAction={mockHandleConfirmationAction}
			/>,
		);

		expect(getByText('Deletar registro')).toBeInTheDocument();
		expect(
			getByText('Tem certeza que deseja deletar o registro do(a) Alice Cooper'),
		).toBeInTheDocument();
		expect(getByText('Deletar')).toBeInTheDocument();
		expect(getByText('Cancelar')).toBeInTheDocument();
	});

	it('calls handleConfirmationAction on confirm button click', () => {
		render(
			<RegistrationCardAlert
				status="APPROVED"
				data={{ employeeName: 'John Doe' }}
				handleConfirmationAction={mockHandleConfirmationAction}
			/>,
		);

		fireEvent.click(screen.getByText('Aprovar'));
		expect(mockHandleConfirmationAction).toHaveBeenCalled();
	});
});
