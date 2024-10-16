export class ChangeRegistrationStatusError extends Error {
	constructor() {
		super('Falha ao alterar o status de registro');
	}
}
