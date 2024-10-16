import { ValidationError } from '../errors/validation-error';

async function checkEmployeeNameIsValid(employeeName: string) {
	const nameWithoutSpaces = employeeName.trim();

	const checkIfFirstLetterIsNumber = nameWithoutSpaces.match(/^\d/);

	if (checkIfFirstLetterIsNumber) {
		throw new ValidationError(
			'A primeira letra do nome não pode ser um número',
			'employeeName',
		);
	}
}

export { checkEmployeeNameIsValid };
