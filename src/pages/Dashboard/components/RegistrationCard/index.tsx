import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
	HiOutlineCalendar,
	HiOutlineMail,
	HiOutlineTrash,
	HiOutlineUser,
} from 'react-icons/hi';

import { AlertDialog } from '@/components/AlertDialog';
import Button, { ButtonSmall } from '@/components/Buttons';
import api from '@/libs/axios';

import { IRegistration, TRegistrationStatus } from '../..';
import * as S from './styles';

type Props = {
	data: IRegistration;
};

interface IMutationFnParams {
	id: string;
	newStatus: TRegistrationStatus;
}

const ALERT_DIALOG_MAPPER = {
	REJECTED: {
		title: 'Reprovar registro',
		description: (name: string) =>
			`Tem certeza que deseja reprovar o registro do(a) ${name}`,
		actions: {
			confirm: {
				text: 'Reprovar',
				bgcolor: 'rgb(218, 58, 71)',
			},
			cancel: {
				text: 'Cancelar',
				bgcolor: 'rgb(192, 192, 192)',
			},
		},
	},
	APPROVED: {
		title: 'Aprovar registro',
		description: (name: string) =>
			`Tem certeza que deseja aprovar o registro do(a) ${name}`,
		actions: {
			confirm: {
				text: 'Aprovar',
				bgcolor: 'rgb(79, 197, 79)',
			},
			cancel: {
				text: 'Cancelar',
				bgcolor: 'rgb(192, 192, 192)',
			},
		},
	},
	PENDING: {
		title: 'Revisar registro',
		description: (name: string) =>
			`Tem certeza que deseja revisar o registro do(a) ${name}`,
		actions: {
			confirm: {
				text: 'Revisar',
				bgcolor: '#ff8858',
			},
			cancel: {
				text: 'Cancelar',
				bgcolor: 'rgb(192, 192, 192)',
			},
		},
	},
	DELETE: {
		title: 'Deletar registro',
		description: (name: string) =>
			`Tem certeza que deseja deletar o registro do(a) ${name}`,
		actions: {
			confirm: {
				text: 'Deletar',
				bgcolor: 'rgb(218, 58, 71)',
			},
			cancel: {
				text: 'Cancelar',
				bgcolor: 'rgb(192, 192, 192)',
			},
		},
	},
};

type TRegistrationCardStatus = TRegistrationStatus | 'DELETE';

const RegistrationCard = (props: Props) => {
	const [status, setStatus] = useState<TRegistrationCardStatus | null>(null);

	const queryClient = useQueryClient();

	const updateStatusMutation = useMutation({
		mutationFn: async ({ id, newStatus }: IMutationFnParams) => {
			await api.patch(`/registrations/${id}`, {
				status: newStatus,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['registrations'],
			});
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			await api.delete(`/registrations/${id}`);
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
				id: props.data.id,
			});

			setStatus(null);

			return;
		}

		updateStatusMutation.mutate({
			id: props.data.id,
			newStatus: status,
		});

		setStatus(null);
	}

	return (
		<AlertDialog.Root>
			<S.Card>
				<S.IconAndText>
					<HiOutlineUser />
					<h3>{props.data.employeeName}</h3>
				</S.IconAndText>
				<S.IconAndText>
					<HiOutlineMail />
					<p>{props.data.email}</p>
				</S.IconAndText>
				<S.IconAndText>
					<HiOutlineCalendar />
					<span>{props.data.admissionDate}</span>
				</S.IconAndText>
				<S.Actions>
					<AlertDialog.Trigger asChild>
						<ButtonSmall
							bgcolor="rgb(255, 145, 154)"
							disabled={
								props.data.status === 'REJECTED' ||
								props.data.status === 'APPROVED'
							}
							onClick={() => handleRegistrationStatus('REJECTED')}
						>
							Reprovar
						</ButtonSmall>
					</AlertDialog.Trigger>

					<AlertDialog.Trigger asChild>
						<ButtonSmall
							bgcolor="rgb(155, 229, 155)"
							disabled={
								props.data.status === 'APPROVED' ||
								props.data.status === 'REJECTED'
							}
							onClick={() => handleRegistrationStatus('APPROVED')}
						>
							Aprovar
						</ButtonSmall>
					</AlertDialog.Trigger>

					<AlertDialog.Trigger asChild>
						<ButtonSmall
							bgcolor="#ff8858"
							disabled={props.data.status === 'PENDING'}
							onClick={() => handleRegistrationStatus('PENDING')}
						>
							Revisar novamente
						</ButtonSmall>
					</AlertDialog.Trigger>

					<AlertDialog.Trigger
						asChild
						onClick={() => handleRegistrationStatus('DELETE')}
					>
						<HiOutlineTrash />
					</AlertDialog.Trigger>
				</S.Actions>
			</S.Card>

			{status && (
				<AlertDialog.Portal>
					<AlertDialog.Overlay />

					<AlertDialog.Content>
						<AlertDialog.Title>
							{ALERT_DIALOG_MAPPER[status].title}
						</AlertDialog.Title>
						<AlertDialog.Description>
							{ALERT_DIALOG_MAPPER[status].description(props.data.employeeName)}
						</AlertDialog.Description>

						<S.AlertDialogActions>
							<AlertDialog.Action asChild>
								<Button
									bgcolor={ALERT_DIALOG_MAPPER[status].actions.cancel.bgcolor}
								>
									{ALERT_DIALOG_MAPPER[status].actions.cancel.text}
								</Button>
							</AlertDialog.Action>

							<AlertDialog.Action asChild onClick={handleConfirmationAction}>
								<Button
									bgcolor={ALERT_DIALOG_MAPPER[status].actions.confirm.bgcolor}
								>
									{ALERT_DIALOG_MAPPER[status].actions.confirm.text}
								</Button>
							</AlertDialog.Action>
						</S.AlertDialogActions>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			)}
		</AlertDialog.Root>
	);
};

export default RegistrationCard;
