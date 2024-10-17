import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import styled from 'styled-components';

export const AlertDialogContent = styled(AlertDialogPrimitive.Content)`
	background-color: white;
	border-radius: 6px;
	box-shadow:
		hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
		hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90vw;
	max-width: 500px;
	max-height: 85vh;
	padding: 25px;
	animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const AlertDialogOverlay = styled(AlertDialogPrimitive.Overlay)`
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const AlertDialogAction = styled(AlertDialogPrimitive.Action)`
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;
