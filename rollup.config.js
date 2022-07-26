import resolve from '@rollup/plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript2';
import autoprefixer from 'autoprefixer';
//import postcss from 'rollup-plugin-postcss-modules';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import { cleandir } from "rollup-plugin-cleandir";
import includePaths from 'rollup-plugin-includepaths';
import svg from 'rollup-plugin-svg';

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
		postcss({
      plugins: [autoprefixer()],
      writeDefinitions: true,
      sourceMap: true,
      minimize: true,
      modules: true
    }),
    terser(),
    svg({ base64: true }),
    typescript({ 
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: 'dist',
    }),
    filesize()
  ],
  external: ['react', 'react-dom', 'tslib']
};