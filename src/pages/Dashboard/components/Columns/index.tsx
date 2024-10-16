import { Skeleton } from '@/components/Skeleton';
import { TRegistration } from '@/repositories/interfaces/registration';

import { RegistrationCard } from '../RegistrationCard';
import { EmptyRegister } from './EmptyRegister';
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

interface IColumnsProps {
	registrations?: TRegistration[];
	registrationIsLoading: boolean;
}

function Columns({ registrationIsLoading, registrations }: IColumnsProps) {
	const hasRegistrations = registrations && registrations.length > 0;
	const hasNoRegistrations = !registrationIsLoading && !hasRegistrations;

	if (hasNoRegistrations) {
		return <EmptyRegister />;
	}

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
								<>
									{registrationIsLoading ? (
										<Skeleton
											size={{
												height: 144,
												width: '100%',
											}}
											count={2}
										/>
									) : (
										<>
											{registrations?.map((registration) => {
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
								</>
							</S.ColumContent>
						</>
					</S.Column>
				);
			})}
		</S.Container>
	);
}

export { Columns };
