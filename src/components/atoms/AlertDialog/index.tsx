import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { forwardRef, ReactNode } from 'react';

import { AlertDialogContent, AlertDialogOverlay } from './style';

interface IAlertDialogProps {
	children: ReactNode;
}

function Root({ ...rest }: IAlertDialogProps) {
	return <AlertDialogPrimitive.Root {...rest} />;
}

function Trigger({ ...rest }: AlertDialogPrimitive.AlertDialogTriggerProps) {
	return <AlertDialogPrimitive.Trigger {...rest} />;
}

function Portal({ ...rest }: AlertDialogPrimitive.AlertDialogPortalProps) {
	return <AlertDialogPrimitive.Portal {...rest} />;
}

const Overlay = forwardRef<
	HTMLDivElement,
	AlertDialogPrimitive.AlertDialogOverlayProps
>(({ ...rest }, ref) => {
	return <AlertDialogOverlay {...rest} ref={ref} />;
});

Overlay.displayName = 'Overlay';

const Content = forwardRef<
	HTMLDivElement,
	AlertDialogPrimitive.AlertDialogContentProps
>(({ ...rest }, ref) => {
	return <AlertDialogContent {...rest} ref={ref} />;
});

Content.displayName = 'Content';

function Title({ ...rest }: AlertDialogPrimitive.AlertDialogTitleProps) {
	return <AlertDialogPrimitive.Title {...rest} />;
}

function Description({
	...rest
}: AlertDialogPrimitive.AlertDialogDescriptionProps) {
	return <AlertDialogPrimitive.Description {...rest} />;
}

function Cancel({ ...rest }: AlertDialogPrimitive.AlertDialogCancelProps) {
	return <AlertDialogPrimitive.Cancel {...rest} />;
}

function Action({ ...rest }: AlertDialogPrimitive.AlertDialogActionProps) {
	return <AlertDialogPrimitive.Action {...rest} />;
}

export const AlertDialog = {
	Action,
	Cancel,
	Content,
	Description,
	Overlay,
	Portal,
	Root,
	Title,
	Trigger,
};
