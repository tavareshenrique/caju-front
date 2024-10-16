import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import Button from '@/components/Buttons';
import { IconButton } from '@/components/Buttons/IconButton';
import TextField from '@/components/TextField';
import { cpf } from '@/helpers/cpf';
import { createRegistrationUseCase } from '@/repositories/create-registration';
import { CpfAlreadyExistsError } from '@/repositories/errors/cpf-already-exists-error';
import { NameFirstLetterIsNumberError } from '@/repositories/errors/name-first-letter-is-number-error';
import routes from '@/router/routes';

import * as S from './styles';

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

const NewUserPage = () => {
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

	const goToHome = () => {
		history.push(routes.dashboard);
	};

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
				if (error instanceof CpfAlreadyExistsError) {
					setError('cpf', {
						message: error.message,
					});

					toast.error(error.message);
				}

				if (error instanceof NameFirstLetterIsNumberError) {
					console.log(error);

					setError('employeeName', {
						message: error.message,
					});

					toast.error(error.message);
				}
			}
		},
	);

	return (
		<>
			<Helmet>
				<title>Adicionar Novo Candidato | Caju</title>
				<meta
					name="description"
					content="Página de adição de novos candidatos da Caju."
				/>
			</Helmet>

			<S.Container onSubmit={onSubmit}>
				<S.Card>
					<IconButton onClick={() => goToHome()} aria-label="back">
						<HiOutlineArrowLeft size={24} />
					</IconButton>

					<Controller
						name="employeeName"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								placeholder="Nome"
								label="Nome"
								error={errors.employeeName?.message}
							/>
						)}
					/>

					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								placeholder="Email"
								label="Email"
								type="email"
								error={errors.email?.message}
							/>
						)}
					/>

					<Controller
						name="cpf"
						control={control}
						render={({ field: { onChange, value } }) => (
							<TextField
								placeholder="CPF"
								label="CPF"
								value={cpf.applyMask(value)}
								onChange={(e) => onChange(cpf.applyMask(e.target.value))}
								error={errors.cpf?.message}
							/>
						)}
					/>

					<Controller
						name="admissionDate"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Data de admissão"
								type="date"
								error={errors.admissionDate?.message}
							/>
						)}
					/>
					<Button type="submit" disabled={isSubmitButtonDisabled}>
						Cadastrar
					</Button>
				</S.Card>
			</S.Container>
		</>
	);
};

export default NewUserPage;
