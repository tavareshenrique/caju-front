import { useState } from 'react';

import { useChangeRegistrationStatus } from '@/hooks/http/useChangeRegistrationStatus';
import { useDeleteRegistration } from '@/hooks/http/useDeleteRegistration';
import { TRegistrationStatus } from '@/repositories/interfaces/registration';

export type TRegistrationCardStatus = TRegistrationStatus | 'DELETE';

interface IRegistrationCardProps {
	cardId: string;
}

function useRegistrationCard({ cardId }: IRegistrationCardProps) {
	const [status, setStatus] = useState<TRegistrationCardStatus | null>(null);

	const { updateStatusMutation } = useChangeRegistrationStatus();
	const { deleteMutation } = useDeleteRegistration();

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
