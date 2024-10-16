import { useQueryClient } from '@tanstack/react-query';
import { HiRefresh } from 'react-icons/hi';

import { IconButton } from '@/components/Buttons/IconButton';
import TextField from '@/components/TextField';
import { cpf } from '@/helpers/cpf';

import { NewRegisterButton } from '../NewRegisterButton';
import * as S from './styles';

interface ISearchBarProps {
	searchValue: string;
	onSearch: (cpf: string) => void;
}
function SearchBar({ searchValue, onSearch }: ISearchBarProps) {
	const queryClient = useQueryClient();

	function handleRefreshData() {
		queryClient.invalidateQueries({
			queryKey: ['registrations'],
		});
	}

	return (
		<S.Container>
			<TextField
				placeholder="Digite um CPF válido"
				value={cpf.applyMask(searchValue)}
				onChange={(e) => onSearch(e.target.value)}
			/>
			<S.Actions>
				<IconButton aria-label="refetch" onClick={handleRefreshData}>
					<HiRefresh />
				</IconButton>
				<NewRegisterButton />
			</S.Actions>
		</S.Container>
	);
}

export { SearchBar };
