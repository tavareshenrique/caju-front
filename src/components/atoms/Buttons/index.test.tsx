import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Button from '.';

describe('Button', () => {
	it('Should show button', () => {
		const { debug } = render(<Button>Ativar</Button>);
		expect(screen.getByRole('button', { name: /ativar/i }));
		debug();
	});
});
