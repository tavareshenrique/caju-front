import Lottie from 'lottie-react';

import emptyLottie from '../../../../../../public/assets/lotties/empty.json';
import { NewRegisterButton } from '../../NewRegisterButton';
import * as S from './styles';

function EmptyRegister() {
	return (
		<S.Container>
			<Lottie animationData={emptyLottie} loop={true} />
			<p>
				Você ainda <strong>não cadastrou nenhuma admissão</strong>, clique
				abaixo para <strong>adicionar uma admissão nova</strong>:
			</p>

			<NewRegisterButton />
		</S.Container>
	);
}

export { EmptyRegister };
