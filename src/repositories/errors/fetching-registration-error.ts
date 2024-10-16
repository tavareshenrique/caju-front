export class FetchingRegistrationError extends Error {
	constructor() {
		super('Falha ao buscar o registro');
	}
}
