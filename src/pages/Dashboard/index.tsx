import { useQuery } from '@tanstack/react-query';

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
	const {
		data: registrationsData,
		// isLoading,
		// error,
	} = useQuery({
		queryKey: ['registrations'],
		queryFn: async () => {
			return (await api.get<IRegistration[]>('/registrations')).data;
		},
		// select: (data) => makeOrderDetails(data),
	});

	return (
		<S.Container>
			<SearchBar />
			<Columns registrations={registrationsData} />
		</S.Container>
	);
};
export default DashboardPage;
