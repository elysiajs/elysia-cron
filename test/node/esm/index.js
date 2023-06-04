if ('Bun' in globalThis) {
  throw new Error('❌ Use Node.js to run this test!');
}

import { cron } from '@elysiajs/cron';

if (typeof cron !== 'function') {
  throw new Error('❌ ESM Node.js failed');
}

console.log('✅ ESM Node.js works!');
