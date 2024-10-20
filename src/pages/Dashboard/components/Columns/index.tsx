import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Skeleton } from '@/components/atoms/Skeleton';
import { TRegistration } from '@/repositories/interfaces/registration';

import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { RegistrationCard } from '../RegistrationCard';
import { ColumnsSkeleton } from './ColumnsSkeleton';
import { EmptyRegister } from './EmptyRegister';
import * as S from './styles';

export enum ERegistrationStatus {
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
	PENDING = 'PENDING',
}

export const allColumns = [
	{ status: ERegistrationStatus.PENDING, title: 'Pronto para revisar' },
	{ status: ERegistrationStatus.APPROVED, title: 'Aprovado' },
	{ status: ERegistrationStatus.REJECTED, title: 'Reprovado' },
];

interface IColumnsProps {
	registrations?: TRegistration[];
	registrationIsLoading: boolean;
}

function Columns({ registrationIsLoading, registrations }: IColumnsProps) {
	const { columns, onDragEnd } = useDragAndDrop({ registrations });

	const hasRegistrations = registrations && registrations.length > 0;
	const hasNoRegistrations = !registrationIsLoading && !hasRegistrations;

	if (registrationIsLoading || !columns) {
		return <ColumnsSkeleton />;
	}

	if (hasNoRegistrations || !columns) {
		return <EmptyRegister />;
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<S.Container>
				{allColumns.map((column) => (
					<Droppable droppableId={column.status} key={column.status}>
						{(provided) => (
							<S.Column
								{...provided.droppableProps}
								$status={column.status}
								ref={provided.innerRef}
							>
								<S.TitleColumn $status={column.status}>
									{column.title}
								</S.TitleColumn>
								<S.ColumContent>
									{registrationIsLoading && !columns ? (
										<Skeleton
											size={{
												height: 144,
												width: '100%',
											}}
											count={2}
										/>
									) : (
										<>
											{columns[column.status]?.items?.map(
												(registration, index) => (
													<Draggable
														key={registration.id}
														draggableId={registration.id.toString()}
														index={index}
													>
														{(provided) => (
															<div
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
															>
																<RegistrationCard
																	data={registration}
																	key={registration.id}
																/>
															</div>
														)}
													</Draggable>
												),
											)}
										</>
									)}
								</S.ColumContent>
							</S.Column>
						)}
					</Droppable>
				))}
			</S.Container>
		</DragDropContext>
	);
}

export { Columns };
