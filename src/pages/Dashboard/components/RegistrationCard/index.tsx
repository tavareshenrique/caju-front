import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	HiOutlineCalendar,
	HiOutlineMail,
	HiOutlineTrash,
	HiOutlineUser,
} from 'react-icons/hi';

import { ButtonSmall } from '@/components/Buttons';
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

const RegistrationCard = (props: Props) => {
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

	function handleRegistrationAction(status: TRegistrationStatus) {
		updateStatusMutation.mutate({
			id: props.data.id,
			newStatus: status,
		});
	}

	return (
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
				<ButtonSmall
					bgcolor="rgb(255, 145, 154)"
					disabled={
						props.data.status === 'REJECTED' || props.data.status === 'APPROVED'
					}
					onClick={() => handleRegistrationAction('REJECTED')}
				>
					Reprovar
				</ButtonSmall>
				<ButtonSmall
					bgcolor="rgb(155, 229, 155)"
					disabled={
						props.data.status === 'APPROVED' || props.data.status === 'REJECTED'
					}
					onClick={() => handleRegistrationAction('APPROVED')}
				>
					Aprovar
				</ButtonSmall>
				<ButtonSmall
					bgcolor="#ff8858"
					disabled={props.data.status === 'PENDING'}
					onClick={() => handleRegistrationAction('PENDING')}
				>
					Revisar novamente
				</ButtonSmall>

				<HiOutlineTrash />
			</S.Actions>
		</S.Card>
	);
};

export default RegistrationCard;
