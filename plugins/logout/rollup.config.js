// link: https://hackernoon.com/building-and-publishing-a-module-with-typescript-and-rollup-js-faa778c85396
import angular from 'rollup-plugin-angular';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [{
   input: 'src/main.ts',
   output: {
     file: '../../core-app/src/assets/plugins/logout.es.bundle.js',
     format: 'es',
     name: 'plugin-logout',
},
   plugins: [
     angular(),
     resolve({
        jsnext: true,
        main: true,
        // pass custom options to the resolve plugin
        customResolveOptions: {
           moduleDirectory: 'node_modules'
        }
     }),
     typescript({
       typescript: require('typescript')
     }),
     commonjs()
   ],
   external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
     '@angular/core',
     '@angular/common'
   ]
}]