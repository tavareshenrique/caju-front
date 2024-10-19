export type TRegistrationStatus = 'APPROVED' | 'REJECTED' | 'PENDING';

export type TRegistration = {
	id: string;
	admissionDate: string;
	email: string;
	employeeName: string;
	status: TRegistrationStatus;
	cpf: string;
};

export interface IRegistrationStatus {
	id: string;
	newStatus: TRegistrationStatus;
}
