import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './';

describe('Skeleton', () => {
	it('should render the skeleton with the correct count and size', () => {
		render(<Skeleton count={3} size={{ height: 100, width: 100 }} />);

		const skeletons = screen.getAllByTestId('skeleton');

		expect(skeletons).toHaveLength(1);
	});
});
