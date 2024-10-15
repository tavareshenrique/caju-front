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

	function handleGoToNewAdmissionPage() {
		history.push(routes.newUser);
	}

	return (
		<S.Container>
			<TextField
				placeholder="Digite um CPF válido"
				value={searchValue}
				onChange={(e) => onSearch(e.target.value)}
			/>
			<S.Actions>
				<IconButton aria-label="refetch">
					<HiRefresh />
				</IconButton>
				<Button onClick={handleGoToNewAdmissionPage}>Nova Admissão</Button>
			</S.Actions>
		</S.Container>
	);
};
