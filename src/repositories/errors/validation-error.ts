export class ValidationError extends Error {
	constructor(
		message: string,
		public property: string,
	) {
		super(message || 'Preencha esse campo corretamente.');

		this.property = property;
	}
}
