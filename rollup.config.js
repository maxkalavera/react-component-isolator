import resolve from '@rollup/plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript2';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import { cleandir } from "rollup-plugin-cleandir";
import includePaths from 'rollup-plugin-includepaths';
import svg from 'rollup-plugin-svg';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import generatePackageJson from 'rollup-plugin-generate-package-json';

export default (() => {
  switch(process.env.NODE_ENV) {
    // Production settings
    case 'production':
      return {
        preserveModules: true,
        input: 'src/main.tsx',
        output: {
          dir: './dist',
          format: 'cjs',
          name: 'react-component-isolator',
          preserveModules: true,
          preserveModulesRoot: 'src',
          sourcemap: true,
          exports: 'named'
        },
        plugins: [
          peerDepsExternal(),
          cleandir(),
          progress(),
          includePaths({ paths: ["./"] }),
          resolve({
            moduleDirectories: ['node_modules']
          }),
          commonjs(),
          //terser(),
          svg({ base64: true }),
          typescript({ 
            tsconfig: "./tsconfig.json",
            declaration: true,
            declarationDir: './dist',
          }),
          postcss({
            plugins: [autoprefixer()],
            sourceMap: true,
            minimize: true,
            modules: true
          }),
          filesize(),
          generatePackageJson({
            baseContents: (pkg) => ({
              name: pkg.name,
              main: 'main.js',
              types: 'main.d.ts',
              version: pkg.version,
              license: pkg.license,
              peerDependencies: pkg.peerDependencies,
              dependencies: {},
            })
          })
        ],
      };

    // Development settings
    default:
      return {
        preserveModules: true,
        input: 'src/main.tsx',
        output: {
          dir: './example_project/externals/react-isolator',
          format: 'cjs',
          name: 'react-component-isolator',
          preserveModules: true,
          preserveModulesRoot: 'src',
          sourcemap: true,
          exports: 'named'
        },
        plugins: [
          peerDepsExternal(),
          cleandir(),
          progress(),
          includePaths({ paths: ["./"] }),
          resolve({
            moduleDirectories: ['node_modules']
          }),
          commonjs(),
          //terser(),
          svg({ base64: true }),
          typescript({ 
            tsconfig: "./tsconfig.json",
            declaration: true,
            declarationDir: './example_project/externals/react-isolator',
          }),
          postcss({
            plugins: [autoprefixer()],
            sourceMap: true,
            minimize: true,
            modules: true
          }),
          filesize(),
          generatePackageJson({
            baseContents: (pkg) => ({
              name: pkg.name,
              main: 'main.js',
              types: 'main.d.ts',
              version: pkg.version,
              license: pkg.license,
              peerDependencies: pkg.peerDependencies,
              dependencies: {},
              browser: pkg.browser
            })
          })
        ],
      };
  };
})();