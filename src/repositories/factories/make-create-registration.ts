import { TNewRegistrationSchema } from '@/pages/NewUser';

import { getAdmissionDate } from '../helpers/get-admission-date';
import { getCpf } from '../helpers/get-cpf';
import { checkCpfIsAlreadyInUse } from '../validation/check-cpf-is-already-in-use';
import { checkEmailIsAlreadyInUse } from '../validation/check-email-is-already-in-use';
import { checkEmployeeNameIsValid } from '../validation/check-employee-name-is-valid';
import { checkIfAdmissionDateIsValid } from '../validation/check-if-admission-date-is-valid';

async function makeCreateRegistration(data: TNewRegistrationSchema) {
	const cpf = getCpf(data.cpf);
	const admissionDate = getAdmissionDate(data.admissionDate);

	await checkCpfIsAlreadyInUse(cpf);
	await checkIfAdmissionDateIsValid(data.admissionDate);
	await checkEmailIsAlreadyInUse(data.email);
	await checkEmployeeNameIsValid(data.email);

	return { ...data, cpf, admissionDate };
}

export { makeCreateRegistration };
