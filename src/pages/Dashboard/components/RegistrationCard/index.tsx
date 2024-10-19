import {
	HiOutlineCalendar,
	HiOutlineMail,
	HiOutlineUser,
} from 'react-icons/hi';

import { AlertDialog } from '@/components/atoms/AlertDialog';
import { TRegistration } from '@/repositories/interfaces/registration';

import { useRegistrationCard } from '../../hooks/useRegistrationCard';
import { RegistrationCardAction } from './components/RegistrationCardAction';
import { RegistrationCardAlert } from './components/RegistrationCardAlert';
import * as S from './styles';

interface IRegistrationCardProps {
	data: TRegistration;
}

function RegistrationCard({ data }: IRegistrationCardProps) {
	const { handleConfirmationAction, handleRegistrationStatus, status } =
		useRegistrationCard({ cardId: data.id });

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
