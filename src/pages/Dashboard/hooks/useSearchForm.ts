import { useFormContext } from 'react-hook-form';

import { TSearchSchema } from '..';

function useSearchForm() {
	const methods = useFormContext<TSearchSchema>();

	return {
		...methods,
	};
}

export { useSearchForm };
