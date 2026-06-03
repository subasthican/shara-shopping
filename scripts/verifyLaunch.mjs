import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const root = process.cwd();
const failures = [];

const requiredFiles = [
  '.github/workflows/verify.yml',
  'backend/.env.example',
  'backend/Dockerfile',
  'backend/package.json',
  'docker-compose.yml',
  'docs/DEPLOYMENT.md',
  'docs/PROJECT_COMPLETION.md',
  'frontend/.env.example',
  'frontend/Dockerfile',
  'frontend/nginx.conf',
  'frontend/package.json',
];

const backendEnvKeys = [
  'NODE_ENV',
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'CLIENT_URL',
  'ADMIN_EMAIL',
  'SEED_ADMIN_NAME',
  'SEED_ADMIN_EMAIL',
  'SEED_ADMIN_PASSWORD',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];

const frontendEnvKeys = ['VITE_API_URL'];

function absolutePath(filePath) {
  return resolve(root, filePath);
}

function markPassed(label) {
  console.log(`OK ${label}`);
}

function markFailed(label) {
  failures.push(label);
  console.error(`FAIL ${label}`);
}

function requireFile(filePath) {
  if (existsSync(absolutePath(filePath))) {
    markPassed(`${filePath} exists`);
    return;
  }

  markFailed(`${filePath} is missing`);
}

function requireEnvKeys(filePath, keys) {
  if (!existsSync(absolutePath(filePath))) {
    markFailed(`${filePath} is missing`);
    return;
  }

  const content = readFileSync(absolutePath(filePath), 'utf8');
  const missingKeys = keys.filter((key) => !new RegExp(`^${key}=`, 'm').test(content));

  if (missingKeys.length === 0) {
    markPassed(`${filePath} contains required launch keys`);
    return;
  }

  markFailed(`${filePath} missing keys: ${missingKeys.join(', ')}`);
}

function requirePackageScripts(filePath, scripts) {
  if (!existsSync(absolutePath(filePath))) {
    markFailed(`${filePath} is missing`);
    return;
  }

  const packageJson = JSON.parse(readFileSync(absolutePath(filePath), 'utf8'));
  const missingScripts = scripts.filter((scriptName) => !packageJson.scripts?.[scriptName]);

  if (missingScripts.length === 0) {
    markPassed(`${filePath} contains required scripts`);
    return;
  }

  markFailed(`${filePath} missing scripts: ${missingScripts.join(', ')}`);
}

function requireText(filePath, expectedText) {
  if (!existsSync(absolutePath(filePath))) {
    markFailed(`${filePath} is missing`);
    return;
  }

  const content = readFileSync(absolutePath(filePath), 'utf8');

  if (content.includes(expectedText)) {
    markPassed(`${filePath} mentions ${expectedText}`);
    return;
  }

  markFailed(`${filePath} does not mention ${expectedText}`);
}

console.log('Shara Shopping launch verification');
console.log('');

requiredFiles.forEach(requireFile);
requireEnvKeys('backend/.env.example', backendEnvKeys);
requireEnvKeys('frontend/.env.example', frontendEnvKeys);
requirePackageScripts('backend/package.json', ['start', 'test', 'smoke']);
requirePackageScripts('frontend/package.json', ['build', 'test']);
requireText('docs/PROJECT_COMPLETION.md', 'feature/*');
requireText('docs/DEPLOYMENT.md', 'GET /api/health');
requireText('.github/workflows/verify.yml', 'feature/**');
requireText('.github/workflows/verify.yml', 'VITE_API_URL');
requireText('frontend/vite.config.js', 'VITE_API_URL');
requireText('frontend/Dockerfile', 'ARG VITE_API_URL');
requireText('docker-compose.yml', 'VITE_API_URL');
requireText('backend/src/server.js', 'registerGracefulShutdown');

console.log('');

if (failures.length > 0) {
  console.error(`Launch verification failed with ${failures.length} issue(s).`);
  process.exit(1);
}

console.log('Launch verification passed.');
