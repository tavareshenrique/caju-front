import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	width: 100%;

	gap: 4px;
`;

export const Input = styled.input`
	all: unset;

	padding: 0 8px;
	width: 100%;
	min-height: 36px;
	font-size: 16px;
	line-height: 18px;
	font-weight: normal;
`;

export const TextFieldContainer = styled.div<{
	$error: boolean;
	$fullWidth: boolean;
}>`
	${({ $fullWidth }) => $fullWidth && 'width: 100%;'}

	vertical-align: middle;
	border-radius: 8px;
	min-height: 36px;
	background-color: #ffffff;
	border: ${({ $error }) =>
		$error ? '1px solid #c40e0e' : '1px solid rgba(36, 28, 21, 0.3)'};

	transition: all 0.2s ease-in-out 0s;
	font-size: 16px;
	line-height: 18px;
	font-weight: normal;

	&:focus-within {
		outline: none;
		border: ${({ $error }) =>
			$error ? '1px solid #c40e0e' : '1px solid #007c89'};
		transition: all 0.2s ease-in-out 0s;
		border-radius: 8px;
		box-shadow: ${({ $error }) =>
			$error ? 'inset 0 0 0 1px #c40e0e' : 'inset 0 0 0 1px #007c89;'};
	}
`;

export const TextFieldContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	input {
		margin: 0 8px;
	}

	button {
		all: unset;
		cursor: pointer;
		margin: 0 8px;

		&:disabled {
			cursor: not-allowed;
		}

		&:hover {
			color: #313131;
		}
	}
`;

export const Label = styled.label<{ $error: boolean }>`
	font-size: 12px;
	color: ${({ $error }) => ($error ? '#c40e0e' : '#171616')};
`;

export const ErrorText = styled.span`
	font-size: 12px;
	color: #c40e0e;
`;
