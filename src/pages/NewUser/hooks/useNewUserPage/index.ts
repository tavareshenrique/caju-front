import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import { createRegistrationUseCase } from '@/repositories/create-registration';
import { ResourceAlreadyExistsError } from '@/repositories/errors/resource-already-exists-error';
import { ValidationError } from '@/repositories/errors/validation-error';
import routes from '@/router/routes';
import { cpf } from '@/utils/cpf';

const newRegistrationSchema = z.object({
	id: z.string().uuid(),
	email: z.string().email('O email deve ser válido'),
	admissionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida'),
	status: z.string().default('PENDING'),
	employeeName: z
		.string()
		.min(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
		.regex(/^[^\d]/, 'O nome não pode começar com um número'),
	cpf: z.string().refine(cpf.validator, {
		message: 'CPF inválido',
	}),
});

export type TNewRegistrationSchema = z.infer<typeof newRegistrationSchema>;

function useNewUserPage() {
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
		setError,
	} = useForm<TNewRegistrationSchema>({
		resolver: zodResolver(newRegistrationSchema),
		defaultValues: {
			id: uuid(),
			admissionDate: '',
			email: '',
			status: 'PENDING',
			employeeName: '',
			cpf: '',
		},
	});

	const history = useHistory();

	const isSubmitButtonDisabled =
		watch('employeeName') === '' ||
		watch('email') === '' ||
		watch('cpf') === '' ||
		watch('admissionDate') === '';

	function goToHome() {
		history.push(routes.dashboard);
	}

	function handleError(error: ResourceAlreadyExistsError | ValidationError) {
		setError(error.property as keyof TNewRegistrationSchema, {
			message: error.message,
		});

		toast.error(error.message);
	}

	const onSubmit = handleSubmit(
		async ({ admissionDate, cpf, email, employeeName, id, status }) => {
			try {
				await createRegistrationUseCase({
					admissionDate,
					cpf,
					email,
					employeeName,
					id,
					status,
				});

				goToHome();
			} catch (error) {
				if (
					error instanceof ResourceAlreadyExistsError ||
					error instanceof ValidationError
				) {
					handleError(error);
				}
			}
		},
	);

	return {
		control,
		errors,
		isSubmitButtonDisabled,
		onSubmit,
		goToHome,
	};
}

export { useNewUserPage };
