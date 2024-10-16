export class ResourceAlreadyExistsError extends Error {
	constructor(
		message: string,
		public property: string,
	) {
		super(message || 'Dados já cadastrados previamente.');

		this.property = property;
	}
}
