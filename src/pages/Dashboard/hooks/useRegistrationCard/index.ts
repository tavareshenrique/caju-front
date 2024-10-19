import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { changeRegistrationStatusUseCase } from '@/repositories/change-registration-status';
import {
	deleteRegistrationUseCase,
	IDeleteRegistration,
} from '@/repositories/delete-registration';
import {
	IRegistrationStatus,
	TRegistrationStatus,
} from '@/repositories/interfaces/registration';

export type TRegistrationCardStatus = TRegistrationStatus | 'DELETE';

interface IRegistrationCardProps {
	cardId: string;
}

function useRegistrationCard({ cardId }: IRegistrationCardProps) {
	const [status, setStatus] = useState<TRegistrationCardStatus | null>(null);

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

	const deleteMutation = useMutation({
		mutationFn: async ({ id }: IDeleteRegistration) =>
			deleteRegistrationUseCase({ id }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['registrations'],
			});
		},
		onError: () => {
			toast.error('Erro ao deletar o registro, por favor, tente novamente!');
		},
	});

	function handleRegistrationStatus(status: TRegistrationCardStatus) {
		setStatus(status);
	}

	function handleConfirmationAction() {
		if (!status) return;

		if (status === 'DELETE') {
			deleteMutation.mutate({
				id: cardId,
			});

			setStatus(null);

			return;
		}

		updateStatusMutation.mutate({
			id: cardId,
			newStatus: status,
		});

		setStatus(null);
	}

	return {
		status,
		handleRegistrationStatus,
		handleConfirmationAction,
	};
}

export { useRegistrationCard };
