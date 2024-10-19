import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
	deleteRegistrationUseCase,
	IDeleteRegistration,
} from '@/repositories/delete-registration';

function useDeleteRegistration() {
	const queryClient = useQueryClient();

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

	return { deleteMutation };
}

export { useDeleteRegistration };
