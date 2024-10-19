function getAdmissionDate(admissionDate: string) {
	const formattedAdmissionDate = Intl.DateTimeFormat('pt-BR').format(
		new Date(admissionDate + 'T00:00:00'),
	);

	return formattedAdmissionDate;
}

export { getAdmissionDate };
