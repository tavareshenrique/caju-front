import { InputHTMLAttributes } from 'react';
import { MdClear } from 'react-icons/md';

import { Input, TextFieldContainer, TextFieldContent } from './style';

type TTextFieldProps = {
	label?: string;
	error?: string;
	onClearIconClick?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = ({
	label,
	id,
	error,
	value,
	onClearIconClick,
	...rest
}: TTextFieldProps) => {
	return (
		<>
			{label && <label htmlFor={id}>{label}</label>}

			<TextFieldContainer>
				<TextFieldContent>
					<Input {...rest} value={value} id={id} />

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
};

export default TextField;
