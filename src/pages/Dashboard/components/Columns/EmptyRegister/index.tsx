import Lottie from 'lottie-react';

import { useSearchForm } from '@/pages/Dashboard/hooks/useSearchForm';

import emptyLottie from '../../../../../../public/assets/lotties/empty.json';
import { NewRegisterButton } from '../../NewRegisterButton';
import * as S from './styles';

const EMPTY_REGISTER_TEXT = {
	withCpf:
		'O CPF informado não foi encontrado, por favor, tente uma nova busca!',
	withoutCpf:
		'Você ainda não cadastrou nenhuma admissão, clique no botão abaixo para cadastrar:',
};

function EmptyRegister() {
	const { watch } = useSearchForm();

	const cpf = watch('cpf');

	const hasCpfValue = cpf !== '';

	return (
		<S.Container>
			<Lottie animationData={emptyLottie} loop={true} />
			<p>
				{hasCpfValue
					? EMPTY_REGISTER_TEXT.withCpf
					: EMPTY_REGISTER_TEXT.withoutCpf}
			</p>

			{!hasCpfValue && <NewRegisterButton />}
		</S.Container>
	);
}

export { EmptyRegister };
