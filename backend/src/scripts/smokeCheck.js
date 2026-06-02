const baseUrl = process.env.API_BASE_URL || `http://127.0.0.1:${process.env.PORT || 5001}/api`;

const checks = [
  ['Health', '/health'],
  ['Products', '/products'],
  ['Categories', '/categories'],
];

async function runCheck([label, path]) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${label} failed with ${response.status} ${response.statusText}`);
  }

  console.log(`OK ${label}: ${response.status}`);
}

async function main() {
  console.log(`Running Shara Shopping API smoke checks against ${baseUrl}`);

  for (const check of checks) {
    await runCheck(check);
  }

  console.log('Smoke checks passed.');
}

main().catch((error) => {
  console.error(`Smoke checks failed: ${error.message}`);
  process.exit(1);
});
