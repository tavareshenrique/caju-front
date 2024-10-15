import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import useDebounce from '@/hooks/useDebounce';
import api from '@/libs/axios';

import Columns from './components/Columns';
import { SearchBar } from './components/Searchbar';
import * as S from './styles';

export type TRegistrationStatus = 'APPROVED' | 'REJECTED' | 'PENDING';

export interface IRegistration {
	id: string;
	admissionDate: string;
	email: string;
	employeeName: string;
	status: TRegistrationStatus;
	cpf: string;
}

const DashboardPage = () => {
	const [cpf, setCpf] = useState('');

	const cpfDebounced = useDebounce(cpf, 500);

	const queryClient = useQueryClient();

	const { data: registrationsData } = useQuery({
		queryKey: ['registrations', cpfDebounced],
		queryFn: async () => {
			const cpfWithoutMask = cpfDebounced.replace(/\D/g, '');

			const url = cpfDebounced
				? `/registrations?cpf=${cpfWithoutMask}`
				: '/registrations';

			return (await api.get<IRegistration[]>(url)).data;
		},
	});

	function handleSearch(cpfValue: string) {
		queryClient.invalidateQueries({
			queryKey: ['registrations'],
		});

		setCpf(cpfValue.trim());
	}

	return (
		<S.Container>
			<SearchBar searchValue={cpf} onSearch={handleSearch} />
			<Columns registrations={registrationsData} />
		</S.Container>
	);
};
export default DashboardPage;
