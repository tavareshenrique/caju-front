import { forwardRef, InputHTMLAttributes } from 'react';
import { MdClear } from 'react-icons/md';

import { Input, TextFieldContainer, TextFieldContent } from './style';

type TTextFieldProps = {
	label?: string;
	error?: string;
	onClearIconClick?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TTextFieldProps>(
	({ label, id, error, value, onClearIconClick, ...rest }, ref) => {
		return (
			<>
				{label && <label htmlFor={id}>{label}</label>}

				<TextFieldContainer>
					<TextFieldContent>
						<Input {...rest} id={id} ref={ref} />

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
					<span style={{ fontSize: 12, color: 'red' }}>{error}</span>
				</TextFieldContainer>
			</>
		);
	},
);

TextField.displayName = 'TextField';

export default TextField;
