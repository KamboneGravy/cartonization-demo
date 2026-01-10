// build.js - Bundle cartonization service for browser
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['cartonization.js'],
  bundle: true,
  outfile: 'cartonization.bundle.js',
  format: 'iife',
  platform: 'browser',
  target: 'es2018',
  minify: false, // Keep readable for debugging
}).then(() => {
  console.log('✅ Built cartonization.bundle.js');
}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
