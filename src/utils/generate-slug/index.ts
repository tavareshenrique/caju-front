function generateSlug(value: string) {
	return value.toLowerCase().replace(' ', '-');
}

export { generateSlug };
