#!/usr/bin/env node

/**
 * Test Suite for @caleralabs/finsec-mcp stdio interface and Unified Credential Bridge
 */

import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { resolveFinsecKey, API_ENDPOINT } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CALERA_CONFIG_DIR = path.join(os.homedir(), '.calera');
const CALERA_ENV_FILE = path.join(CALERA_CONFIG_DIR, 'icx.env');

console.log('Testing @caleralabs/finsec-mcp Unified Credential Bridge...\n');

// Backup existing ~/.calera/icx.env if present
let originalEnvContent = null;
if (fs.existsSync(CALERA_ENV_FILE)) {
  originalEnvContent = fs.readFileSync(CALERA_ENV_FILE, 'utf8');
}

const savedEnv = {
  FINSEC_LICENSE_KEY: process.env.FINSEC_LICENSE_KEY,
  CALERA_API_KEY: process.env.CALERA_API_KEY,
  ICX_API_KEY: process.env.ICX_API_KEY,
  X_LICENSE_KEY: process.env.X_LICENSE_KEY
};

try {
  // Clear env vars
  delete process.env.FINSEC_LICENSE_KEY;
  delete process.env.CALERA_API_KEY;
  delete process.env.ICX_API_KEY;
  delete process.env.X_LICENSE_KEY;

  // Test 1: Config file resolution
  fs.mkdirSync(CALERA_CONFIG_DIR, { recursive: true });
  const testKey = 'clabs_pilot_finsec_unified_test_key_123';
  fs.writeFileSync(CALERA_ENV_FILE, `ICX_API_KEY=${testKey}\n`, 'utf8');

  const resolved = resolveFinsecKey();
  if (resolved !== testKey) {
    throw new Error(`Test 1 Failed: expected ${testKey}, got ${resolved}`);
  }
  console.log('✓ Test 1 Passed: resolveFinsecKey successfully reads ICX_API_KEY from ~/.calera/icx.env');

  // Test 2: FINSEC_LICENSE_KEY takes precedence in env
  process.env.FINSEC_LICENSE_KEY = 'custom_finsec_override_key';
  const resolvedOverride = resolveFinsecKey();
  if (resolvedOverride !== 'custom_finsec_override_key') {
    throw new Error(`Test 2 Failed: expected custom_finsec_override_key, got ${resolvedOverride}`);
  }
  console.log('✓ Test 2 Passed: process.env.FINSEC_LICENSE_KEY takes precedence');
  delete process.env.FINSEC_LICENSE_KEY;

  // Test 3: Fallback when nothing is present
  if (fs.existsSync(CALERA_ENV_FILE)) fs.unlinkSync(CALERA_ENV_FILE);
  const fallbackKey = resolveFinsecKey();
  if (fallbackKey !== 'clabs_live_pilot_review') {
    throw new Error(`Test 3 Failed: expected clabs_live_pilot_review, got ${fallbackKey}`);
  }
  console.log('✓ Test 3 Passed: Fallback to clabs_live_pilot_review works correctly');

  // Test 4: Endpoint verification
  if (!API_ENDPOINT || !API_ENDPOINT.includes('finsec.caleralabs.com')) {
    throw new Error(`Test 4 Failed: invalid API_ENDPOINT ${API_ENDPOINT}`);
  }
  console.log('✓ Test 4 Passed: API_ENDPOINT is correctly configured');

  console.log('\nAll @caleralabs/finsec-mcp bridge tests passed successfully!');
} finally {
  // Restore original state
  if (originalEnvContent !== null) {
    fs.writeFileSync(CALERA_ENV_FILE, originalEnvContent, 'utf8');
  } else if (fs.existsSync(CALERA_ENV_FILE)) {
    fs.unlinkSync(CALERA_ENV_FILE);
  }

  for (const [k, v] of Object.entries(savedEnv)) {
    if (v !== undefined) process.env[k] = v;
    else delete process.env[k];
  }
}
