import { useHistory } from 'react-router-dom';

import Button from '@/components/Buttons';
import routes from '@/router/routes';

function NewRegisterButton() {
	const history = useHistory();

	function handleGoToNewAdmissionPage() {
		history.push(routes.newUser);
	}

	return <Button onClick={handleGoToNewAdmissionPage}>Nova Admissão</Button>;
}

export { NewRegisterButton };
