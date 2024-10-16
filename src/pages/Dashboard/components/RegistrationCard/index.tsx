import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
	HiOutlineCalendar,
	HiOutlineMail,
	HiOutlineUser,
} from 'react-icons/hi';

import { AlertDialog } from '@/components/AlertDialog';
import {
	changeRegistrationStatus,
	IRegistrationStatus,
} from '@/repositories/change-registration-status';
import {
	deleteRegistration,
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
		mutationFn: async ({ id, newStatus }: IRegistrationStatus) => {
			changeRegistrationStatus({
				id,
				newStatus,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['registrations'],
			});
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async ({ id }: IDeleteRegistration) => {
			deleteRegistration({ id });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['registrations'],
			});
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
