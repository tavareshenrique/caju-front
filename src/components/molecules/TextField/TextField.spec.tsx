import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TextField } from './';

describe('TextField Component', () => {
	it('should render the label when provided', () => {
		render(<TextField label="Test Label" id="test-input" />);

		const label = screen.getByLabelText('Test Label');
		expect(label).toBeInTheDocument();
	});

	it('should display the error message when provided', () => {
		render(<TextField error="Error message" />);

		const errorText = screen.getByText('Error message');
		expect(errorText).toBeInTheDocument();
	});

	it('should call the onClearIconClick function when the clear button is clicked', () => {
		const onClearMock = vi.fn();
		render(
			<TextField
				value="Test"
				onChange={vi.fn()}
				onClearIconClick={onClearMock}
				label="Test Input"
			/>,
		);

		const clearButton = screen.getByRole('button', { name: /limpar campo/i });
		expect(clearButton).toBeInTheDocument();

		fireEvent.click(clearButton);
		expect(onClearMock).toHaveBeenCalled();
	});

	it('should disable the clear button when there is no value', () => {
		render(<TextField onClearIconClick={vi.fn()} />);

		const clearButton = screen.getByRole('button', { name: /limpar campo/i });
		expect(clearButton).toBeDisabled();
	});

	it('should pass the value and attributes to the input field', () => {
		render(
			<TextField
				label="Test Input"
				value="Test"
				onChange={vi.fn()}
				id="test-input"
				placeholder="Enter text"
			/>,
		);

		const input = screen.getByLabelText('Test Input') as HTMLInputElement;
		expect(input.value).toBe('Test');
		expect(input.placeholder).toBe('Enter text');
	});
});
