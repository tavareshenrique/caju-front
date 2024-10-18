import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Error } from './';

interface ILottieProps {
	animationData: string;
}

vi.mock('lottie-react', () => ({
	default: ({ animationData }: ILottieProps) => (
		<img src={animationData} alt="Lottie animation" />
	),
}));

describe('Error Component', () => {
	it('renders the error animation and message', () => {
		render(<Error />);

		const animation = screen.getByRole('img');
		expect(animation).toBeInTheDocument();

		const message = screen.getByText(
			/Parece que houve um problema inesperado/i,
		);
		expect(message).toBeInTheDocument();
	});
});
