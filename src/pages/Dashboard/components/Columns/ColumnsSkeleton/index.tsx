import { Skeleton } from '@/components/atoms/Skeleton';

import { allColumns } from '..';
import * as S from '../styles';

function ColumnsSkeleton() {
	return (
		<S.Container>
			{allColumns.map((column) => (
				<S.Column key={column.status} $status={column.status}>
					<S.TitleColumn $status={column.status}>{column.title}</S.TitleColumn>
					<S.ColumContent>
						<Skeleton
							size={{
								height: 144,
								width: '100%',
							}}
							count={2}
						/>
					</S.ColumContent>
				</S.Column>
			))}
		</S.Container>
	);
}

export { ColumnsSkeleton };
