function applyMask(cpf: string) {
	return cpf
		.replace(/\D/g, '')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})/, '$1-$2')
		.replace(/(-\d{2})\d+?$/, '$1');
}

function removeMask(cpf: string) {
	return cpf.replace(/\D/g, '');
}

function validator(cpfValue: string) {
	const cleanedCPF = cpfValue.replace(/\D/g, '');

	if (cleanedCPF.length !== 11) return false;

	if (/^(\d)\1+$/.test(cleanedCPF)) return false;

	let sum = 0;
	let rest;

	for (let i = 1; i <= 9; i++) {
		sum += parseInt(cleanedCPF.substring(i - 1, i)) * (11 - i);
	}

	rest = (sum * 10) % 11;

	if (rest === 10 || rest === 11) rest = 0;
	if (rest !== parseInt(cleanedCPF.substring(9, 10))) return false;

	sum = 0;
	for (let i = 1; i <= 10; i++) {
		sum += parseInt(cleanedCPF.substring(i - 1, i)) * (12 - i);
	}

	rest = (sum * 10) % 11;

	if (rest === 10 || rest === 11) rest = 0;
	if (rest !== parseInt(cleanedCPF.substring(10, 11))) return false;

	return true;
}

export const cpf = {
	applyMask,
	removeMask,
	validator,
};
