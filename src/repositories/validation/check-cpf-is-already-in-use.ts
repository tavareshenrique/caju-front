import { ResourceAlreadyExistsError } from '../errors/resource-already-exists';
import { fetchRegistrationsUseCase } from '../fetch-registrations';

async function checkCpfIsAlreadyInUse(cpfValue: string) {
	const cpfAlreadyExists = await fetchRegistrationsUseCase({
		key: 'cpf',
		value: cpfValue,
	});

	if (cpfAlreadyExists.length > 0) {
		throw new ResourceAlreadyExistsError('CPF já cadastrado.', 'cpf');
	}
}

export { checkCpfIsAlreadyInUse };
