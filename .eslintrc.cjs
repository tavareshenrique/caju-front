module.exports = {
	extends: ['eslint-config-henrique/react'],
	plugins: ['simple-import-sort'],
	rules: {
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
	},
};
