import { forwardRef, InputHTMLAttributes } from 'react';
import { MdClear } from 'react-icons/md';

import {
	Container,
	ErrorText,
	Input,
	Label,
	TextFieldContainer,
	TextFieldContent,
} from './style';

type TTextFieldProps = {
	label?: string;
	error?: string;
	onClearIconClick?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TTextFieldProps>(
	({ label, id, error, value, onClearIconClick, ...rest }, ref) => {
		const hasError = !!error;

		return (
			<Container>
				{label && (
					<Label $error={hasError} htmlFor={id}>
						{label}
					</Label>
				)}

				<TextFieldContainer $error={hasError}>
					<TextFieldContent>
						<Input {...rest} id={id} ref={ref} value={value} />

						{onClearIconClick && (
							<button
								type="button"
								onClick={onClearIconClick}
								disabled={!value}
								aria-label="Limpar campo"
							>
								<MdClear size={16} color={value ? '#222222' : '#b7b7b7'} />
							</button>
						)}
					</TextFieldContent>
				</TextFieldContainer>

				<ErrorText>{error}</ErrorText>
			</Container>
		);
	},
);

TextField.displayName = 'TextField';

export default TextField;
