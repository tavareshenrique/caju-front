import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { useChangeRegistrationStatus } from '@/hooks/http/useChangeRegistrationStatus';
import { TRegistration } from '@/repositories/interfaces/registration';

import { ERegistrationStatus } from '../../components/Columns';
import { useDragAndDrop } from './';

vi.mock('@/hooks/http/useChangeRegistrationStatus');

interface ILottieProps {
	animationData: string;
}

vi.mock('lottie-react', () => ({
	default: ({ animationData }: ILottieProps) => (
		<img src={animationData} alt="Lottie animation" />
	),
}));

const mockUpdateStatusMutation = vi.fn();

describe('useDragAndDrop', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		(useChangeRegistrationStatus as Mock).mockReturnValue({
			updateStatusMutation: { mutate: mockUpdateStatusMutation },
		});
	});

	const registrations: TRegistration[] = [
		{ id: '1', status: ERegistrationStatus.PENDING } as any,
		{ id: '2', status: ERegistrationStatus.APPROVED } as any,
		{ id: '3', status: ERegistrationStatus.REJECTED } as any,
	];

	it('should initialize columns correctly', () => {
		const { result } = renderHook(() => useDragAndDrop({ registrations }));

		expect(result.current.columns).toEqual({
			[ERegistrationStatus.PENDING]: {
				title: 'Pronto para revisar',
				items: [{ id: '1', status: ERegistrationStatus.PENDING }],
			},
			[ERegistrationStatus.APPROVED]: {
				title: 'Aprovado',
				items: [{ id: '2', status: ERegistrationStatus.APPROVED }],
			},
			[ERegistrationStatus.REJECTED]: {
				title: 'Reprovado',
				items: [{ id: '3', status: ERegistrationStatus.REJECTED }],
			},
		});
	});

	it('should handle drag and drop within the same column', () => {
		const { result } = renderHook(() => useDragAndDrop({ registrations }));

		const dropResult: any = {
			source: { droppableId: ERegistrationStatus.PENDING, index: 0 },
			destination: { droppableId: ERegistrationStatus.PENDING, index: 0 },
			draggableId: '1',
			type: 'DEFAULT',
			reason: 'DROP',
			mode: 'FLUID',
		};

		act(() => {
			result.current.onDragEnd(dropResult);
		});

		expect(result.current.columns?.[ERegistrationStatus.PENDING].items).toEqual(
			[{ id: '1', status: ERegistrationStatus.PENDING }],
		);

		expect(mockUpdateStatusMutation).toHaveBeenCalledWith({
			id: '1',
			newStatus: ERegistrationStatus.PENDING,
		});
	});

	it('should handle drag and drop between different columns', () => {
		const { result } = renderHook(() => useDragAndDrop({ registrations }));

		const dropResult: any = {
			source: { droppableId: ERegistrationStatus.PENDING, index: 0 },
			destination: { droppableId: ERegistrationStatus.APPROVED, index: 0 },
			draggableId: '1',
			type: 'DEFAULT',
			reason: 'DROP',
			mode: 'FLUID',
		};

		act(() => {
			result.current.onDragEnd(dropResult);
		});

		expect(result.current.columns?.[ERegistrationStatus.PENDING].items).toEqual(
			[],
		);
		expect(
			result.current.columns?.[ERegistrationStatus.APPROVED].items,
		).toEqual([
			{ id: '1', status: ERegistrationStatus.PENDING },
			{ id: '2', status: ERegistrationStatus.APPROVED },
		]);

		expect(mockUpdateStatusMutation).toHaveBeenCalledWith({
			id: '1',
			newStatus: ERegistrationStatus.APPROVED,
		});
	});

	it('should do nothing if there is no destination', () => {
		const { result } = renderHook(() => useDragAndDrop({ registrations }));

		const dropResult: any = {
			source: { droppableId: ERegistrationStatus.PENDING, index: 0 },
			destination: null,
			draggableId: '1',
			type: 'DEFAULT',
			reason: 'DROP',
			mode: 'FLUID',
		};

		act(() => {
			result.current.onDragEnd(dropResult);
		});

		expect(result.current.columns).toEqual({
			[ERegistrationStatus.PENDING]: {
				title: 'Pronto para revisar',
				items: [{ id: '1', status: ERegistrationStatus.PENDING }],
			},
			[ERegistrationStatus.APPROVED]: {
				title: 'Aprovado',
				items: [{ id: '2', status: ERegistrationStatus.APPROVED }],
			},
			[ERegistrationStatus.REJECTED]: {
				title: 'Reprovado',
				items: [{ id: '3', status: ERegistrationStatus.REJECTED }],
			},
		});

		expect(mockUpdateStatusMutation).not.toHaveBeenCalled();
	});
});
