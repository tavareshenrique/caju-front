import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import useDebounce from '@/hooks/useDebounce';
import { fetchRegistrationsUseCase } from '@/repositories/fetch-registrations';

import { Columns } from './components/Columns';
import { SearchBar } from './components/Searchbar';
import * as S from './styles';

const searchSchema = z.object({
	cpf: z.string(),
});

export type TSearchSchema = z.infer<typeof searchSchema>;

function DashboardPage() {
	const methods = useForm<TSearchSchema>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			cpf: '',
		},
	});

	const cpf = methods.watch('cpf');

	const cpfValue = useDebounce(cpf, 500);

	const { data: registrationsData, isLoading: registrationIsLoading } =
		useQuery({
			queryKey: ['registrations', cpfValue],
			refetchOnWindowFocus: true,
			queryFn: async () => fetchRegistrationsUseCase(cpfValue),
		});

	return (
		<FormProvider {...methods}>
			<Helmet>
				<title>Registro de Candidatos | Caju</title>
				<meta
					name="description"
					content="Página de registros de candidatos da Caju."
				/>
			</Helmet>

			<S.Container>
				<SearchBar />
				<Columns
					registrations={registrationsData}
					registrationIsLoading={registrationIsLoading}
				/>
			</S.Container>
		</FormProvider>
	);
}

export { DashboardPage };
