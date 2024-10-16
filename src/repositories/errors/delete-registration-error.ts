export class DeleteRegistrationError extends Error {
	constructor() {
		super('Failed to delete registration');
	}
}
