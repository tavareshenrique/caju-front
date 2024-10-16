import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
	HiOutlineCalendar,
	HiOutlineMail,
	HiOutlineUser,
} from 'react-icons/hi';

import { AlertDialog } from '@/components/atoms/AlertDialog';
import {
	changeRegistrationStatusUseCase,
	IRegistrationStatus,
} from '@/repositories/change-registration-status';
import {
	deleteRegistrationUseCase,
	IDeleteRegistration,
} from '@/repositories/delete-registration';
import {
	TRegistration,
	TRegistrationStatus,
} from '@/repositories/interfaces/registration';

import { RegistrationCardAction } from './components/RegistrationCardAction';
import { RegistrationCardAlert } from './components/RegistrationCardAlert';
import * as S from './styles';

export type TRegistrationCardStatus = TRegistrationStatus | 'DELETE';

interface IRegistrationCardProps {
	data: TRegistration;
}

function RegistrationCard({ data }: IRegistrationCardProps) {
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
				id: data.id,
			});

			setStatus(null);

			return;
		}

		updateStatusMutation.mutate({
			id: data.id,
			newStatus: status,
		});

		setStatus(null);
	}

	return (
		<AlertDialog.Root>
			<S.Card>
				<S.IconAndText>
					<HiOutlineUser />
					<h3>{data.employeeName}</h3>
				</S.IconAndText>

				<S.IconAndText>
					<HiOutlineMail />
					<p>{data.email}</p>
				</S.IconAndText>

				<S.IconAndText>
					<HiOutlineCalendar />
					<span>{data.admissionDate}</span>
				</S.IconAndText>

				<S.Actions>
					<RegistrationCardAction.Reject
						onRegisterStatus={handleRegistrationStatus}
						status={data.status}
					/>

					<RegistrationCardAction.Approved
						onRegisterStatus={handleRegistrationStatus}
						status={data.status}
					/>

					<RegistrationCardAction.Pending
						onRegisterStatus={handleRegistrationStatus}
						status={data.status}
					/>

					<RegistrationCardAction.Delete
						onRegisterStatus={handleRegistrationStatus}
						status={data.status}
					/>
				</S.Actions>
			</S.Card>

			{status && (
				<RegistrationCardAlert
					data={data}
					handleConfirmationAction={handleConfirmationAction}
					status={status}
				/>
			)}
		</AlertDialog.Root>
	);
}

export { RegistrationCard };
