export class CreateRegistrationError extends Error {
	constructor() {
		super('Failed to create registration');
	}
}
