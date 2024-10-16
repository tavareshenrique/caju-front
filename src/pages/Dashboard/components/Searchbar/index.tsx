import { useQueryClient } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';
import { HiRefresh } from 'react-icons/hi';

import { IconButton } from '@/components/Buttons/IconButton';
import TextField from '@/components/TextField';
import { cpf } from '@/utils/cpf';

import { useSearchForm } from '../../hooks/useSearchForm';
import { NewRegisterButton } from '../NewRegisterButton';
import * as S from './styles';

function SearchBar() {
	const queryClient = useQueryClient();

	const { control, resetField } = useSearchForm();

	function onInvalidateRegistrationQuery() {
		queryClient.invalidateQueries({
			queryKey: ['registrations'],
		});
	}

	function handleResetCpfField() {
		resetField('cpf');

		onInvalidateRegistrationQuery();
	}

	return (
		<S.Container>
			<Controller
				name="cpf"
				control={control}
				render={({ field: { onChange, value } }) => (
					<TextField
						placeholder="Digite um CPF válido"
						value={cpf.applyMask(value)}
						onChange={(e) => onChange(cpf.applyMask(e.target.value))}
						onClearIconClick={handleResetCpfField}
					/>
				)}
			/>

			<S.Actions>
				<IconButton
					aria-label="refetch"
					onClick={onInvalidateRegistrationQuery}
				>
					<HiRefresh />
				</IconButton>
				<NewRegisterButton />
			</S.Actions>
		</S.Container>
	);
}

export { SearchBar };
