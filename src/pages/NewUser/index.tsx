import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import Button from '@/components/Buttons';
import { IconButton } from '@/components/Buttons/IconButton';
import TextField from '@/components/TextField';
import { cpf } from '@/helpers/cpf';
import { createRegistration } from '@/repositories/create-registration';
import routes from '@/router/routes';

import * as S from './styles';

const newRegistrationSchema = z.object({
	id: z.string().uuid(),
	admissionDate: z.string(),
	email: z.string().email('O email deve ser válido'),
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
		// formState: { errors },
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

	const goToHome = () => {
		history.push(routes.dashboard);
	};

	const onSubmit = handleSubmit(async (data) => {
		await createRegistration(data);

		goToHome();
	});

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
							<TextField {...field} placeholder="Nome" label="Nome" />
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
							/>
						)}
					/>

					<Controller
						name="cpf"
						control={control}
						render={({ field }) => (
							<TextField {...field} placeholder="CPF" label="CPF" />
						)}
					/>

					<Controller
						name="admissionDate"
						control={control}
						render={({ field }) => (
							<TextField {...field} label="Data de admissão" type="date" />
						)}
					/>
					<Button type="submit">Cadastrar</Button>
				</S.Card>
			</S.Container>
		</>
	);
};

export default NewUserPage;
