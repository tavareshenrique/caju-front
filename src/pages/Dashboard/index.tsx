import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

import useDebounce from '@/hooks/useDebounce';
import { fetchRegistrationsUseCase } from '@/repositories/fetch-registrations';

import { Columns } from './components/Columns';
import { SearchBar } from './components/Searchbar';
import * as S from './styles';

function DashboardPage() {
	const [cpf, setCpf] = useState('');

	const cpfValue = useDebounce(cpf, 500);

	const queryClient = useQueryClient();

	const { data: registrationsData, isLoading: registrationIsLoading } =
		useQuery({
			queryKey: ['registrations', cpfValue],
			refetchOnWindowFocus: true,
			queryFn: async () => fetchRegistrationsUseCase(cpfValue),
		});

	function handleSearchCpf(cpfValue: string) {
		queryClient.invalidateQueries({
			queryKey: ['registrations'],
		});

		setCpf(cpfValue.trim());
	}

	return (
		<>
			<Helmet>
				<title>Registro de Candidatos | Caju</title>
				<meta
					name="description"
					content="Página de registros de candidatos da Caju."
				/>
			</Helmet>

			<S.Container>
				<SearchBar searchValue={cpf} onSearch={handleSearchCpf} />
				<Columns
					registrations={registrationsData}
					registrationIsLoading={registrationIsLoading}
				/>
			</S.Container>
		</>
	);
}

export { DashboardPage };
