#!/usr/bin/env node

import { spawn, ChildProcess } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the project root directory (one level up from server/)
const projectRoot = path.resolve(__dirname, '..');

console.log(`🚀 Starting Next.js on port 5000`);

// Run Next.js dev server with correct port
const nextProcess: ChildProcess = spawn('npx', ['next', 'dev', '-p', '5000'], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: { ...process.env, PORT: '5000' }
});

nextProcess.on('error', (error) => {
  console.error('Failed to start Next.js:', error);
  process.exit(1);
});

nextProcess.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
  process.exit(code || 0);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Next.js server...');
  nextProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down Next.js server...');
  nextProcess.kill('SIGTERM');
});