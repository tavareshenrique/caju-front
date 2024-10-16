export class NameFirstLetterIsNumberError extends Error {
	constructor() {
		super('A primeira letra do nome não pode ser um número');
	}
}
