import { cpf } from '@/utils/cpf';

function getCpf(cpfValue: string) {
	const cpfWithoutMask = cpf.removeMask(cpfValue);

	return cpfWithoutMask;
}

export { getCpf };
