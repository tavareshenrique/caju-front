import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { EmptyRegister } from './';

interface ILottieProps {
	animationData: string;
}

const mockWatch = vi.fn((field: string) => (field === 'cpf' ? '' : ''));

vi.mock('lottie-react', () => ({
	default: ({ animationData }: ILottieProps) => (
		<img src={animationData} alt="Lottie animation" />
	),
}));

vi.mock('../../NewRegisterButton', () => ({
	NewRegisterButton: () => <button>Registrar Novo</button>,
}));

vi.mock('@/pages/Dashboard/hooks/useSearchForm', () => ({
	useSearchForm: () => ({
		watch: mockWatch,
	}),
}));

describe('EmptyRegister Component', () => {
	it('renders the empty state without CPF', () => {
		mockWatch.mockReturnValueOnce('');

		render(<EmptyRegister />);

		const animation = screen.getByRole('img', { name: /Lottie animation/i });
		expect(animation).toBeInTheDocument();

		const text = screen.getByText(/Você ainda não cadastrou nenhuma admissão/i);
		expect(text).toBeInTheDocument();

		const button = screen.getByRole('button', { name: /Registrar Novo/i });
		expect(button).toBeInTheDocument();
	});

	it('renders the empty state with CPF', () => {
		mockWatch.mockReturnValueOnce('12345678900');

		render(<EmptyRegister />);

		const animation = screen.getByRole('img', { name: /Lottie animation/i });
		expect(animation).toBeInTheDocument();

		const text = screen.getByText(/O CPF informado não foi encontrado/i);
		expect(text).toBeInTheDocument();

		expect(
			screen.queryByRole('button', { name: /Registrar Novo/i }),
		).not.toBeInTheDocument();
	});
});
