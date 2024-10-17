import 'react-loading-skeleton/dist/skeleton.css';

import ReactSkeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { SkeletonContent } from './style';

export interface ISkeletonProps {
	/**
	 * Number of skeletons to render
	 */
	count?: number;
	/**
	 * Skeleton height and width
	 */
	size: {
		height: number | string;
		width: number | string;
	};
}

const SKELETON_BASE_COLOR = '#afaeae';
const SKELETON_HIGHLIGHT_COLOR = '#444';

export function Skeleton({
	size = {
		height: 80,
		width: 80,
	},
	count = 1,
}: ISkeletonProps) {
	return (
		<SkeletonTheme
			baseColor={SKELETON_BASE_COLOR}
			highlightColor={SKELETON_HIGHLIGHT_COLOR}
		>
			<SkeletonContent>
				<ReactSkeleton
					count={count}
					style={{ height: size.height, width: size.width }}
					borderRadius="8px"
				/>
			</SkeletonContent>
		</SkeletonTheme>
	);
}
