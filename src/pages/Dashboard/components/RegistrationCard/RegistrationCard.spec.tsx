import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TRegistrationStatus } from '@/repositories/interfaces/registration';

import { RegistrationCard } from './';

const mockStatus = vi.fn<() => TRegistrationStatus | null>(() => null);

vi.mock('@tanstack/react-query', () => ({
	useMutation: vi.fn(),
	useQueryClient: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
	toast: {
		error: vi.fn(),
	},
}));

vi.mock('../../hooks/useRegistrationCard', () => ({
	useRegistrationCard: () => ({
		handleConfirmationAction: vi.fn(),
		handleRegistrationStatus: vi.fn(),
		status: mockStatus(),
	}),
}));

vi.mock('./components/RegistrationCardAlert', () => ({
	__esModule: true,
	RegistrationCardAlert: () => <div data-testid="registration-card-alert" />,
}));

describe('RegistrationCard', () => {
	it('should render the card with the user data', () => {
		const data = {
			id: faker.string.uuid(),
			admissionDate: '2021-09-01',
			email: faker.internet.email(),
			employeeName: faker.person.firstName(),
			status: 'PENDING' as TRegistrationStatus,
			cpf: '123.456.789-00',
		};

		render(<RegistrationCard data={data} />);

		expect(screen.getByText(data.employeeName)).toBeInTheDocument();
		expect(screen.getByText(data.email)).toBeInTheDocument();
		expect(screen.getByText(data.admissionDate)).toBeInTheDocument();
	});

	it('should show Registration Card Alert when have status', async () => {
		const data = {
			id: faker.string.uuid(),
			admissionDate: '2021-09-01',
			email: faker.internet.email(),
			employeeName: faker.person.firstName(),
			status: 'PENDING' as TRegistrationStatus,
			cpf: '123.456.789-00',
		};

		mockStatus.mockReturnValueOnce('APPROVED');

		render(<RegistrationCard data={data} />);

		const getByTestId = screen.getByTestId('registration-card-alert');

		expect(getByTestId).toBeInTheDocument();
	});
});
