import { ResourceAlreadyExistsError } from '../errors/resource-already-exists';
import { fetchRegistrationsUseCase } from '../fetch-registrations';

async function checkEmailIsAlreadyInUse(email: string) {
	const emailAlreadyExists = await fetchRegistrationsUseCase({
		key: 'email',
		value: email.trim(),
	});

	if (emailAlreadyExists.length > 0) {
		throw new ResourceAlreadyExistsError('Email já cadastrado.', 'email');
	}
}

export { checkEmailIsAlreadyInUse };
