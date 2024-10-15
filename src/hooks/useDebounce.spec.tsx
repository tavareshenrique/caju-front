import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import useDebounce from './useDebounce';

vi.useFakeTimers();

describe('useDebounce', () => {
	it('should return the initial value immediately', () => {
		const { result } = renderHook(() => useDebounce('test', 500));
		expect(result.current).toBe('test');
	});

	it('should return the updated value after the debounce delay', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { value: 'test', delay: 500 },
			},
		);

		expect(result.current).toBe('test');

		rerender({ value: 'new value', delay: 500 });
		expect(result.current).toBe('test');

		act(() => {
			vi.advanceTimersByTime(500);
		});
		expect(result.current).toBe('new value');
	});

	it('should reset the debounce timer if the value changes before completion', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { value: 'first value', delay: 500 },
			},
		);

		expect(result.current).toBe('first value');

		rerender({ value: 'second value', delay: 500 });
		act(() => {
			vi.advanceTimersByTime(300);
		});
		expect(result.current).toBe('first value');

		rerender({ value: 'third value', delay: 500 });
		act(() => {
			vi.advanceTimersByTime(500);
		});
		expect(result.current).toBe('third value');
	});
});
