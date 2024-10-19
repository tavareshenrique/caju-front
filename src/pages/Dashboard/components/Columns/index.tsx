import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult,
} from 'react-beautiful-dnd';
import toast from 'react-hot-toast';

import { Skeleton } from '@/components/atoms/Skeleton';
import { changeRegistrationStatusUseCase } from '@/repositories/change-registration-status';
import {
	IRegistrationStatus,
	TRegistration,
} from '@/repositories/interfaces/registration';

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
	const [columns, setColumns] = useState<
		| {
				[key in ERegistrationStatus]: {
					title: string;
					items: TRegistration[];
				};
		  }
		| null
	>(null);

	const hasRegistrations = registrations && registrations.length > 0;
	const hasNoRegistrations = !registrationIsLoading && !hasRegistrations;

	const queryClient = useQueryClient();

	const updateStatusMutation = useMutation({
		mutationFn: async ({ id, newStatus }: IRegistrationStatus) =>
			changeRegistrationStatusUseCase({
				id,
				newStatus,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['registrations'],
			});
		},
		onError: () => {
			toast.error(
				'Erro ao atualizar o status do registro, por favor, tente novamente!',
			);
		},
	});

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination || !columns) return;

		if (source.droppableId === destination.droppableId) {
			const column = columns[source.droppableId as ERegistrationStatus];

			const copiedItems = [...column.items];

			const [removed] = copiedItems.splice(source.index, 1);

			copiedItems.splice(destination.index, 0, removed);

			setColumns({
				...columns,
				[source.droppableId as ERegistrationStatus]: {
					...column,
					items: copiedItems,
				},
			});
		} else {
			const sourceColumn = columns[source.droppableId as ERegistrationStatus];

			const destColumn =
				columns[destination.droppableId as ERegistrationStatus];

			const sourceItems = [...sourceColumn.items];

			const destItems = [...destColumn.items];

			const [removed] = sourceItems.splice(source.index, 1);

			destItems.splice(destination.index, 0, removed);

			setColumns({
				...columns,
				[source.droppableId as ERegistrationStatus]: {
					...sourceColumn,
					items: sourceItems,
				},
				[destination.droppableId as ERegistrationStatus]: {
					...destColumn,
					items: destItems,
				},
			});
		}

		updateStatusMutation.mutate({
			id: result.draggableId,
			newStatus: destination.droppableId as ERegistrationStatus,
		});
	};

	useEffect(() => {
		if (registrations) {
			const initialColumns = {
				[ERegistrationStatus.PENDING]: {
					title: 'Pronto para revisar',
					items:
						registrations?.filter(
							(r) => r.status === ERegistrationStatus.PENDING,
						) || [],
				},
				[ERegistrationStatus.APPROVED]: {
					title: 'Aprovado',
					items:
						registrations?.filter(
							(r) => r.status === ERegistrationStatus.APPROVED,
						) || [],
				},
				[ERegistrationStatus.REJECTED]: {
					title: 'Reprovado',
					items:
						registrations?.filter(
							(r) => r.status === ERegistrationStatus.REJECTED,
						) || [],
				},
			};

			setColumns(initialColumns);
		}
	}, [registrations]);

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
