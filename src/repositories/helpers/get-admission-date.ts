function getAdmissionDate(admissionDate: string) {
	const formattedAdmissionDate = Intl.DateTimeFormat('pt-BR').format(
		new Date(admissionDate),
	);

	return formattedAdmissionDate;
}

export { getAdmissionDate };
