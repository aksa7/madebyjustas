// @ts-check
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default defineConfig(globalIgnores(['dist/**', '.astro/**', 'node_modules/**']), {
	extends: [tseslint.configs.recommended, eslintPluginAstro.configs['flat/recommended']],
	rules: {
		'no-console': 'warn',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
	},
});
