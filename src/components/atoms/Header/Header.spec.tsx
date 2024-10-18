import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Header } from './';

describe('Header', () => {
	it('should render the Header with an image and title', () => {
		render(
			<Header>
				<img src="logo.png" alt="logo" />
				<h1>Site Title</h1>
			</Header>,
		);

		const img = screen.getByAltText('logo');
		const title = screen.getByText('Site Title');

		expect(img).toBeInTheDocument();
		expect(title).toBeInTheDocument();
		expect(title).toHaveTextContent('Site Title');
	});

	it('should have the correct styles', () => {
		render(
			<Header>
				<img src="logo.png" alt="logo" />
				<h1>Site Title</h1>
			</Header>,
		);

		const header = screen.getByRole('banner');

		expect(header).toHaveStyle(`
			width: 100%;
			height: 64px;
			position: fixed;
			top: 0;
			display: flex;
			align-items: center;
		`);

		const img = screen.getByAltText('logo');
		expect(img).toHaveStyle('margin-left: 8px');

		const title = screen.getByText('Site Title');
		expect(title).toHaveStyle('color: #fff');
		expect(title).toHaveStyle('font-size: 24px');
		expect(title).toHaveStyle('margin-left: 16px');
	});
});
