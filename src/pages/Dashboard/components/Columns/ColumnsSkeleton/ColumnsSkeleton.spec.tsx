import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { allColumns } from '..';
import { ColumnsSkeleton } from '.';

interface ILottieProps {
	animationData: string;
}

vi.mock('lottie-react', () => ({
	default: ({ animationData }: ILottieProps) => (
		<img src={animationData} alt="Lottie animation" />
	),
}));

vi.mock('@/components/ColumnsSkeleton/styles', () => ({
	Container: (props: any) => <div {...props} />,
	Column: (props: any) => <div {...props} />,
	TitleColumn: (props: any) => <div {...props} />,
	ColumContent: (props: any) => <div {...props} />,
}));

describe('ColumnsSkeleton', () => {
	it('renders skeletons for each column', () => {
		render(<ColumnsSkeleton />);

		allColumns.forEach((column) => {
			const columnTitle = screen.getByText(column.title);
			expect(columnTitle).toBeInTheDocument();

			const skeletons = screen.getAllByTestId('skeleton');
			expect(skeletons.length).toBeGreaterThan(0);
		});
	});
});
