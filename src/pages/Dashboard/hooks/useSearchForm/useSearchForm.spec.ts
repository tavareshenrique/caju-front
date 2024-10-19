import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useSearchForm } from './';

describe('useSearchForm', () => {
	it('should return register object', () => {
		const { result } = renderHook(() => useSearchForm());

		expect(result.current).not.toBeNull();
		expect(result.current).not.toBeUndefined();
	});
});
