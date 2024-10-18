import '@testing-library/jest-dom';

import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TRegistrationStatus } from '@/repositories/interfaces/registration';

import { Columns } from './';

interface ILottieProps {
	animationData: string;
}

const mockWatch = vi.fn((field: string) => (field === 'cpf' ? '' : ''));

vi.mock('lottie-react', () => ({
	default: ({ animationData }: ILottieProps) => (
		<img src={animationData} alt="Lottie animation" />
	),
}));

vi.mock('@/repositories/change-registration-status', () => ({
	changeRegistrationStatusUseCase: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
	useMutation: vi.fn(),
	useQueryClient: () => ({
		clear: vi.fn(),
	}),
}));

vi.mock('@/pages/Dashboard/hooks/useSearchForm', () => ({
	useSearchForm: () => ({
		watch: mockWatch,
	}),
}));

vi.mock('react-router-dom', () => ({
	useHistory: () => ({
		push: vi.fn(),
	}),
}));

const mockRegistrations = [
	{
		id: faker.string.uuid(),
		status: 'PENDING' as TRegistrationStatus,
		admissionDate: '2023-01-01',
		email: faker.internet.email(),
		employeeName: faker.person.firstName(),
		cpf: '123.456.789-00',
	},
	{
		id: faker.string.uuid(),
		status: 'PENDING' as TRegistrationStatus,
		admissionDate: '2023-01-02',
		email: faker.internet.email(),
		employeeName: faker.person.firstName(),
		cpf: '987.654.321-00',
	},
];

describe('Columns Component', () => {
	it('renders empty state when no registrations', () => {
		render(<Columns registrationIsLoading={false} registrations={[]} />);

		const emptyMessage = screen.getByText(
			/Você ainda não cadastrou nenhuma admissão/i,
		);
		expect(emptyMessage).toBeInTheDocument();
	});

	it('renders columns with registrations', () => {
		render(
			<Columns
				registrationIsLoading={false}
				registrations={mockRegistrations}
			/>,
		);

		const pendingList = screen.getByRole('heading', {
			name: /pronto para revisar/i,
		});

		const approvedList = screen.getByRole('heading', {
			name: /aprovado/i,
		});

		const rejectedList = screen.getByRole('heading', {
			name: /reprovado/i,
		});

		expect(pendingList).toBeInTheDocument();
		expect(approvedList).toBeInTheDocument();
		expect(rejectedList).toBeInTheDocument();

		const personName = screen.getByRole('heading', {
			name: mockRegistrations[0].employeeName,
		});
		const personEmail = screen.getByText(mockRegistrations[0].email);

		expect(personName).toBeInTheDocument();
		expect(personEmail).toBeInTheDocument();
	});
});
