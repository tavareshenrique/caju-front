export class DeleteRegistrationError extends Error {
	constructor() {
		super('Falha ao deletar o registro');
	}
}
