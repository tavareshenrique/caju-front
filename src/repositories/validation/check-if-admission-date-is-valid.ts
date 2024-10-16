import { ValidationError } from '../errors/validation-error';

async function checkIfAdmissionDateIsValid(admissionDate: string) {
	const registerDate = new Date(admissionDate);

	if (registerDate > new Date()) {
		throw new ValidationError(
			'A data de admissão não pode ser uma data futura',
			'admissionDate',
		);
	}
}

export { checkIfAdmissionDateIsValid };
