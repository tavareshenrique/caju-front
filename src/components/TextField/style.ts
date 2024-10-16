import styled from 'styled-components';

export const Input = styled.input`
	all: unset;

	padding: 0 8px;
	width: 100%;
	min-height: 36px;
	font-size: 16px;
	line-height: 18px;
	font-weight: normal;
`;

export const TextFieldContainer = styled.div`
	vertical-align: middle;
	border-radius: 8px;
	min-height: 36px;
	background-color: #ffffff;
	border: 1px solid rgba(36, 28, 21, 0.3);
	transition: all 0.2s ease-in-out 0s;
	font-size: 16px;
	line-height: 18px;
	font-weight: normal;

	&:focus-within {
		outline: none;
		border: 1px solid #007c89;
		transition: all 0.2s ease-in-out 0s;
		border-radius: 8px;
		box-shadow: inset 0 0 0 1px #007c89;
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
