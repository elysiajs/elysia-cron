if ('Bun' in globalThis) {
  throw new Error('❌ Use Node.js to run this test!');
}

const { cron } = require('@elysia/cron');

if (typeof cron !== 'function') {
  throw new Error('❌ CommonJS Node.js failed');
}

console.log('✅ CommonJS Node.js works!');
