import { Helmet } from 'react-helmet';
import { Controller } from 'react-hook-form';
import { HiOutlineArrowLeft } from 'react-icons/hi';

import { Button } from '@/components/atoms/Buttons';
import { IconButton } from '@/components/atoms/Buttons/IconButton';
import { TextField } from '@/components/molecules/TextField';
import { cpf } from '@/utils/cpf';

import { useNewUserPage } from './hooks/useNewUserPage';
import * as S from './styles';

function NewUserPage() {
	const { onSubmit, goToHome, control, errors, isSubmitButtonDisabled } =
		useNewUserPage();

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
								fullWidth
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
								fullWidth
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
								fullWidth
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
								fullWidth
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
}

export { NewUserPage };
