import Lottie from 'lottie-react';

import errorLottie from '../../assets/lotties/error.json';
import * as S from './styles';

function Error() {
	return (
		<S.Container>
			<Lottie animationData={errorLottie} loop={true} />
			<p>
				Parece que houve um problema inesperado, estamos trabalhando para
				resolver.
			</p>
		</S.Container>
	);
}

export { Error };
