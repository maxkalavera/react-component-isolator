import resolve from '@rollup/plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import commonjs from 'rollup-plugin-commonjs';
//import json from 'rollup-plugin-json';
import filesize from 'rollup-plugin-filesize';
//import visualizer from 'rollup-plugin-visualizer';
//import typescript from "@rollup/plugin-typescript";
import typescript from 'rollup-plugin-typescript2';
import autoprefixer from 'autoprefixer';
//import postcss from 'rollup-plugin-postcss';
import postcss from 'rollup-plugin-postcss-modules';
import { terser } from 'rollup-plugin-terser';
//import external from 'rollup-plugin-peer-deps-external';
import { cleandir } from "rollup-plugin-cleandir";
import includePaths from 'rollup-plugin-includepaths';

export default {
  preserveModules: true,
  input: 'src/main.tsx',
  output: {
    dir: 'dist',
    format: 'cjs',
    name: 'react-component-isolator',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true,
    exports: 'auto'
  },
  plugins: [
    cleandir(),
    progress(),
    includePaths({ paths: ["./"] }),
    resolve({
      moduleDirectories: ['node_modules']
    }),
    commonjs(),
    typescript({ 
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: 'dist',
    }),
		postcss({
      plugins: [autoprefixer()],
      sourceMap: true,
      extract: true,
      minimize: true
    }),
    terser(),
    filesize()
  ],
  external: ['react', 'react-dom'],
};