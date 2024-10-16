import { useQueryClient } from '@tanstack/react-query';
import { HiRefresh } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';

import Button from '@/components/Buttons';
import { IconButton } from '@/components/Buttons/IconButton';
import TextField from '@/components/TextField';
import routes from '@/router/routes';

import * as S from './styles';

interface ISearchBarProps {
	searchValue: string;
	onSearch: (cpf: string) => void;
}

export const SearchBar = ({ searchValue, onSearch }: ISearchBarProps) => {
	const history = useHistory();

	const queryClient = useQueryClient();

	function handleGoToNewAdmissionPage() {
		history.push(routes.newUser);
	}

	function maskCpf(cpf: string) {
		return cpf
			.replace(/\D/g, '')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})/, '$1-$2')
			.replace(/(-\d{2})\d+?$/, '$1');
	}

	function handleRefresh() {
		queryClient.invalidateQueries({
			queryKey: ['registrations'],
		});
	}

	return (
		<S.Container>
			<TextField
				placeholder="Digite um CPF válido"
				value={maskCpf(searchValue)}
				onChange={(e) => onSearch(e.target.value)}
			/>
			<S.Actions>
				<IconButton aria-label="refetch" onClick={handleRefresh}>
					<HiRefresh />
				</IconButton>
				<Button onClick={handleGoToNewAdmissionPage}>Nova Admissão</Button>
			</S.Actions>
		</S.Container>
	);
};
