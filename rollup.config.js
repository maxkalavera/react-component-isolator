import { nodeResolve } from "@rollup/plugin-node-resolve";
import progress from "rollup-plugin-progress";
import commonjs from "rollup-plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import typescript from "rollup-plugin-typescript2";
import autoprefixer from "autoprefixer";
import postcss from "rollup-plugin-postcss";
import { cleandir } from "rollup-plugin-cleandir";
import includePaths from "rollup-plugin-includepaths";
import svg from "rollup-plugin-svg";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import generatePackageJson from "rollup-plugin-generate-package-json";

export default (() => {
  let outputDir = "";
  switch (process.env.NODE_ENV) {
    // Production settings
    case "production":
      outputDir = "./dist";
      return {
        input: "src/main.tsx",
        output: {
          dir: outputDir,
          format: "cjs",
          name: "react-isolator",
          exports: "named",
        },
        plugins: [
          peerDepsExternal(),
          cleandir(),
          progress(),
          includePaths({ paths: ["./"] }),
          nodeResolve({
            moduleDirectories: ["node_modules"],
          }),
          commonjs(),
          //terser(),
          svg({ base64: true }),
          typescript({
            tsconfig: "./tsconfig.json",
            declaration: true,
            declarationDir: outputDir,
          }),
          postcss({
            plugins: [autoprefixer()],
            sourceMap: true,
            minimize: true,
            modules: true,
          }),
          filesize(),
          generatePackageJson({
            baseContents: (pkg) => ({
              main: "main.js",
              types: "src/main.d.ts",
              name: pkg.name,
              version: pkg.version,
              license: pkg.license,
              description: pkg.description,
              repository: pkg.repository,
              keywords: pkg.keywords,
              bugs: pkg.bugs,
              contributors: pkg.contributors,
              peerDependencies: pkg.peerDependencies,
              dependencies: pkg.dependencies,
              browser: pkg.browser,
            }),
          }),
        ],
      };

    // Development settings
    default:
      outputDir = "./example_project/externals/react-isolator";
      return {
        preserveModules: true,
        input: "src/main.tsx",
        output: {
          dir: outputDir,
          format: "cjs",
          name: "react-isolator",
          preserveModules: true,
          preserveModulesRoot: "src",
          sourcemap: true,
          exports: "named",
        },
        plugins: [
          peerDepsExternal(),
          cleandir(),
          progress(),
          includePaths({ paths: ["./"] }),
          resolve({
            moduleDirectories: ["node_modules"],
          }),
          commonjs(),
          //terser(),
          svg({ base64: true }),
          typescript({
            tsconfig: "./tsconfig.json",
            declaration: true,
            declarationDir: outputDir,
          }),
          postcss({
            plugins: [autoprefixer()],
            sourceMap: true,
            minimize: true,
            modules: true,
          }),
          filesize(),
          generatePackageJson({
            baseContents: (pkg) => ({
              name: pkg.name,
              main: "main.js",
              types: "main.d.ts",
              version: pkg.version,
              license: pkg.license,
              peerDependencies: pkg.peerDependencies,
              dependencies: {},
              browser: pkg.browser,
            }),
          }),
        ],
      };
  }
})();
