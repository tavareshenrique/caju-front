import styled from 'styled-components';

import { TRegistrationStatus } from '@/repositories/interfaces/registration';

const registrationStatusStyles: {
	[key in string]: { background: string; title: string };
} = {
	APPROVED: {
		background: '#EEEEFD',
		title: '#4242DF',
	},
	REJECTED: {
		background: '#FBEDF6',
		title: '#CE2893',
	},
	PENDING: {
		background: '#FDF8E9',
		title: '#EFC24D',
	},
};

export const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 24px;
	justify-content: center;
	margin-top: 24px;
`;

export const Column = styled.div<{ $status: string }>`
	height: auto;
	background-color: ${({ $status }) =>
		registrationStatusStyles[$status].background};
	border-radius: 32px;
	min-height: 75vh;
	/* max-height: 80vh; */
`;

export const TitleColumn = styled.h3<{ $status: TRegistrationStatus }>`
	margin: 0px;
	color: ${({ $status }) => registrationStatusStyles[$status].title};
	margin: 24px;
`;

export const ColumContent = styled.div`
	display: flex;
	flex-direction: column;

	overflow: auto;
	gap: 16px;
	height: 100%;
	padding: 16px;
`;
