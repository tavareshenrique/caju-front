import { AlertDialog } from '@/components/atoms/AlertDialog';
import { Button } from '@/components/atoms/Buttons';
import { TRegistrationCardStatus } from '@/pages/Dashboard/hooks/useRegistrationCard';

import * as S from './styles';

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

interface IRegistrationCardAlertProps {
	status: TRegistrationCardStatus;
	data: {
		employeeName: string;
	};
	handleConfirmationAction: () => void;
}

function RegistrationCardAlert({
	data,
	handleConfirmationAction,
	status,
}: IRegistrationCardAlertProps) {
	return (
		<AlertDialog.Portal>
			<AlertDialog.Overlay />

			<AlertDialog.Content data-testid="registration-card-alert">
				<AlertDialog.Title>
					{ALERT_DIALOG_MAPPER[status].title}
				</AlertDialog.Title>
				<AlertDialog.Description>
					{ALERT_DIALOG_MAPPER[status].description(data.employeeName)}
				</AlertDialog.Description>

				<S.AlertDialogActions>
					<AlertDialog.Action asChild>
						<Button
							$bgcolor={ALERT_DIALOG_MAPPER[status].actions.cancel.bgcolor}
						>
							{ALERT_DIALOG_MAPPER[status].actions.cancel.text}
						</Button>
					</AlertDialog.Action>

					<AlertDialog.Action asChild onClick={handleConfirmationAction}>
						<Button
							$bgcolor={ALERT_DIALOG_MAPPER[status].actions.confirm.bgcolor}
						>
							{ALERT_DIALOG_MAPPER[status].actions.confirm.text}
						</Button>
					</AlertDialog.Action>
				</S.AlertDialogActions>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	);
}

export { RegistrationCardAlert };
