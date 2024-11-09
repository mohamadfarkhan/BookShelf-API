import globals from "globals";
import pluginJs from "@eslint/js";
<<<<<<< HEAD
import daStyle from "eslint-config-dicodingacademy";
=======
import daStyle from 'eslint-config-dicodingacademy';
>>>>>>> origin/main


/** @type {import('eslint').Linter.Config[]} */
export default [
  daStyle,
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
];