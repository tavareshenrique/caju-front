import { Skeleton } from '@/components/Skeleton';

import { IRegistration } from '../..';
import RegistrationCard from '../RegistrationCard';
import * as S from './styles';

export enum ERegistrationStatus {
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
	PENDING = 'PENDING',
}

const allColumns = [
	{ status: ERegistrationStatus.PENDING, title: 'Pronto para revisar' },
	{ status: ERegistrationStatus.APPROVED, title: 'Aprovado' },
	{ status: ERegistrationStatus.REJECTED, title: 'Reprovado' },
];

type Props = {
	registrations?: IRegistration[];
	registrationIsLoading: boolean;
};

const Columns = (props: Props) => {
	return (
		<S.Container>
			{allColumns.map((column) => {
				return (
					<S.Column status={column.status} key={column.title}>
						<>
							<S.TitleColumn status={column.status}>
								{column.title}
							</S.TitleColumn>
							<S.ColumContent>
								{props.registrationIsLoading ? (
									<Skeleton
										size={{
											height: 144,
											width: '100%',
										}}
										count={2}
									/>
								) : (
									<>
										{props.registrations?.map((registration) => {
											if (registration.status !== column.status) {
												return null;
											}

											return (
												<RegistrationCard
													data={registration}
													key={registration.id}
												/>
											);
										})}
									</>
								)}
							</S.ColumContent>
						</>
					</S.Column>
				);
			})}
		</S.Container>
	);
};
export default Columns;
