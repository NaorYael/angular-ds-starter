#!/usr/bin/env node

/**
 * Copy angular-ds-starter to a new folder (no git history, no node_modules).
 *
 * Usage:
 *   npm run new -- my-take-home
 *   node tools/new-project.mjs ../clients/acme-dashboard
 */

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const starterRoot = resolve(__dirname, '..');

const destinationArg = process.argv[2];

if (!destinationArg) {
  console.error('Usage: npm run new -- <destination-folder>');
  console.error('');
  console.error('Examples:');
  console.error('  npm run new -- ../my-take-home');
  console.error('  npm run new -- ../clients/acme-dashboard');
  process.exit(1);
}

const destination = resolve(process.cwd(), destinationArg);
const projectName = basename(destination).replace(/\s+/g, '-').toLowerCase();

if (existsSync(destination)) {
  console.error(`Destination already exists: ${destination}`);
  process.exit(1);
}

const destinationInsideStarter = destination.startsWith(`${starterRoot}/`) || destination === starterRoot;

if (destinationInsideStarter) {
  console.error('Create the copy outside the starter repo to avoid nested projects.');
  console.error('');
  console.error('Example:');
  console.error('  npm run new -- ../my-take-home');
  process.exit(1);
}

const excluded = new Set(['node_modules', 'dist', '.git', '.angular', '.nx', 'tmp', 'my-project', 'my-take-home']);

function shouldSkip(relativePath) {
  const parts = relativePath.split(/[/\\]/);

  if (parts.some((part) => excluded.has(part))) {
    return true;
  }

  if (relativePath.startsWith('libs/common')) return true;
  if (relativePath.startsWith('libs/core')) return true;

  return false;
}

function copyStarter(source, target, relative = '') {
  mkdirSync(target, { recursive: true });

  for (const entry of readdirSync(source, { withFileTypes: true })) {
    const sourcePath = join(source, entry.name);
    const nextRelative = relative ? `${relative}/${entry.name}` : entry.name;

    if (shouldSkip(nextRelative)) {
      continue;
    }

    const targetPath = join(target, entry.name);

    if (entry.isDirectory()) {
      copyStarter(sourcePath, targetPath, nextRelative);
    } else if (entry.isFile()) {
      cpSync(sourcePath, targetPath);
    }
  }
}

console.log(`Copying starter to: ${destination}`);

copyStarter(starterRoot, destination);

const packageJsonPath = join(destination, 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
packageJson.name = `@ds/${projectName}`;
writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

const readmePath = join(destination, 'README.md');
if (existsSync(readmePath)) {
  const readme = readFileSync(readmePath, 'utf8');
  writeFileSync(
    readmePath,
    readme.replace(
      '# Angular DS Starter',
      `# ${projectName}\n\n> Created from [angular-ds-starter](https://github.com/NaorYael/angular-ds-starter).`,
    ),
  );
}

try {
  execSync('git init', { cwd: destination, stdio: 'inherit' });
} catch {
  console.warn('Warning: git init failed. You can run it manually later.');
}

console.log('');
console.log('Done. Next steps:');
console.log(`  cd ${destination}`);
console.log('  npm install');
console.log('  npm start');
console.log('');
console.log('Tips:');
console.log('  - Build features in apps/starter or add a new Nx app later.');
console.log('  - Keep @ds/design-system and @ds/grid imports as-is.');
console.log('  - Delete demo pages in apps/starter when you start your assignment.');
