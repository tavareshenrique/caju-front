import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { IconButton } from './IconButton';

describe('IconButton', () => {
	it('should render the IconButton with children', () => {
		render(
			<IconButton>
				<svg data-testid="icon">Icon</svg>
			</IconButton>,
		);

		const button = screen.getByRole('button');
		const icon = screen.getByTestId('icon');

		expect(button).toBeInTheDocument();
		expect(icon).toBeInTheDocument();
		expect(icon).toHaveTextContent('Icon');
	});

	it('should have the correct default styles', () => {
		render(
			<IconButton>
				<svg data-testid="icon">Icon</svg>
			</IconButton>,
		);

		const button = screen.getByRole('button');

		expect(button).toHaveStyle('cursor: pointer');
		expect(button).toHaveStyle('border: 2px solid #64a98c');
		expect(button).toHaveStyle('border-radius: 24px');
		expect(button).toHaveStyle('background-color: transparent');
	});

	it('should trigger a click event when clicked', async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(
			<IconButton onClick={onClick}>
				<svg data-testid="icon">Icon</svg>
			</IconButton>,
		);

		const button = screen.getByRole('button');
		await user.click(button);

		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
