import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { changeRegistrationStatusUseCase } from '@/repositories/change-registration-status';
import { IRegistrationStatus } from '@/repositories/interfaces/registration';

function useChangeRegistrationStatus() {
	const queryClient = useQueryClient();

	const updateStatusMutation = useMutation({
		mutationFn: async ({ id, newStatus }: IRegistrationStatus) =>
			changeRegistrationStatusUseCase({
				id,
				newStatus,
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ['registrations'],
			}),
		onError: () => {
			toast.error(
				'Erro ao atualizar o status do registro, por favor, tente novamente!',
			);
		},
	});

	return { updateStatusMutation };
}

export { useChangeRegistrationStatus };
