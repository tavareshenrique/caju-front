import { HiOutlineTrash } from 'react-icons/hi';

import { AlertDialog } from '@/components/atoms/AlertDialog';
import { ButtonSmall } from '@/components/atoms/Buttons';
import { TRegistrationStatus } from '@/repositories/interfaces/registration';

import { TRegistrationCardStatus } from '../..';
import { DeleteContainer } from './styles';

interface IRegistrationCardCommonProps {
	status: TRegistrationStatus;
	onRegisterStatus: (status: TRegistrationCardStatus) => void;
}

const APPROVED = {
	color: 'rgb(155, 229, 155)',
	text: 'Aprovar',
};

function Approved({ status, onRegisterStatus }: IRegistrationCardCommonProps) {
	const isApproveButtonDisabled =
		status === 'APPROVED' || status === 'REJECTED';

	return (
		<AlertDialog.Trigger asChild>
			<ButtonSmall
				$bgcolor={APPROVED.color}
				disabled={isApproveButtonDisabled}
				onClick={() => onRegisterStatus('APPROVED')}
			>
				{APPROVED.text}
			</ButtonSmall>
		</AlertDialog.Trigger>
	);
}

const REJECT = {
	color: 'rgb(255, 145, 154)',
	text: 'Reprovar',
};

function Reject({ status, onRegisterStatus }: IRegistrationCardCommonProps) {
	const isRejectedButtonDisabled =
		status === 'REJECTED' || status === 'APPROVED';

	return (
		<AlertDialog.Trigger asChild>
			<ButtonSmall
				$bgcolor={REJECT.color}
				disabled={isRejectedButtonDisabled}
				onClick={() => onRegisterStatus('REJECTED')}
			>
				{REJECT.text}
			</ButtonSmall>
		</AlertDialog.Trigger>
	);
}

const PENDING = {
	color: '#ff8858',
	text: '	Revisar novamente',
};

function Pending({ status, onRegisterStatus }: IRegistrationCardCommonProps) {
	const isPendingButtonDisabled = status === 'PENDING';

	return (
		<AlertDialog.Trigger asChild>
			<ButtonSmall
				$bgcolor={PENDING.color}
				disabled={isPendingButtonDisabled}
				onClick={() => onRegisterStatus('PENDING')}
			>
				{PENDING.text}
			</ButtonSmall>
		</AlertDialog.Trigger>
	);
}

type TDeleteProps = Pick<IRegistrationCardCommonProps, 'onRegisterStatus'>;

function Delete({ onRegisterStatus }: TDeleteProps) {
	return (
		<DeleteContainer onClick={() => onRegisterStatus('DELETE')}>
			<HiOutlineTrash />
		</DeleteContainer>
	);
}

export const RegistrationCardAction = {
	Approved,
	Reject,
	Pending,
	Delete,
};
