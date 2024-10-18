import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button, ButtonSmall } from './';

describe('Button', () => {
	it('should render the Button with default styles', () => {
		render(<Button>Click Me</Button>);
		const button = screen.getByText('Click Me');

		expect(button).toBeInTheDocument();
		expect(button).toHaveStyle('background-color: #64a98c');
		expect(button).toHaveStyle('color: #fff');
		expect(button).toHaveStyle('height: 56px');
	});

	it('should render the Button with custom styles', () => {
		render(
			<Button $bgcolor="#000" $color="#fff">
				Custom Button
			</Button>,
		);
		const button = screen.getByText('Custom Button');

		expect(button).toBeInTheDocument();
		expect(button).toHaveStyle('background-color: #000');
		expect(button).toHaveStyle('color: #fff');
	});

	it('should trigger a click event when clicked', async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Clickable Button</Button>);

		const button = screen.getByText('Clickable Button');
		await user.click(button);

		expect(onClick).toHaveBeenCalledTimes(1);
	});
});

describe('ButtonSmall', () => {
	it('should render the ButtonSmall with default styles', () => {
		render(<ButtonSmall>Small Button</ButtonSmall>);
		const button = screen.getByText('Small Button');

		expect(button).toBeInTheDocument();
		expect(button).toHaveStyle('font-size: 12px');
		expect(button).toHaveStyle('background-color: none');
		expect(button).toHaveStyle('color: #000');
	});

	it('should render the ButtonSmall with custom styles', () => {
		render(
			<ButtonSmall $bgcolor="#ccc" $color="#333">
				Custom Small Button
			</ButtonSmall>,
		);
		const button = screen.getByText('Custom Small Button');

		expect(button).toBeInTheDocument();
		expect(button).toHaveStyle('background-color: #ccc');
		expect(button).toHaveStyle('color: #333');
	});

	it('should trigger a click event when clicked', async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(<ButtonSmall onClick={onClick}>Clickable Small Button</ButtonSmall>);

		const button = screen.getByText('Clickable Small Button');
		await user.click(button);

		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
