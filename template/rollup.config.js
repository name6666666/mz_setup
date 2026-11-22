import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/main.ts',
  external: ["rmmz"],
  output: {
    file: 'dist/{{PLUGIN_NAME}}.js',
    format: 'iife',
    name: '{{PLUGIN_NAME}}',
    globals: { rmmz: "window" }
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript()
  ]
};