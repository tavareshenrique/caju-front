import { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';

import { useChangeRegistrationStatus } from '@/hooks/http/useChangeRegistrationStatus';
import { TRegistration } from '@/repositories/interfaces/registration';

import { ERegistrationStatus } from '../../components/Columns';

interface IUseDragAndDropParams {
	registrations?: TRegistration[];
}

function useDragAndDrop({ registrations }: IUseDragAndDropParams) {
	const [columns, setColumns] = useState<
		| {
				[key in ERegistrationStatus]: {
					title: string;
					items: TRegistration[];
				};
		  }
		| null
	>(null);

	const { updateStatusMutation } = useChangeRegistrationStatus();

	function onDragEnd(result: DropResult) {
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
	}

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

	return {
		onDragEnd,
		columns,
	};
}

export { useDragAndDrop };
