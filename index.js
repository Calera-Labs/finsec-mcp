#!/usr/bin/env node
/**
 * Official Calera FINSEC MCP Gateway Client
 * Transparently bridges stdio JSON-RPC 2.0 to Calera Episteme-1 Cloud Run endpoint.
 */

import readline from 'readline';
import fs from 'fs';
import path from 'path';
import os from 'os';

const CALERA_CONFIG_DIR = path.join(os.homedir(), '.calera');
const CALERA_ENV_FILE = path.join(CALERA_CONFIG_DIR, 'icx.env');
const API_ENDPOINT = process.env.FINSEC_MCP_URL || 'https://finsec.caleralabs.com/mcp';

function resolveFinsecKey() {
  if (process.env.FINSEC_LICENSE_KEY && process.env.FINSEC_LICENSE_KEY.trim()) return process.env.FINSEC_LICENSE_KEY.trim();
  if (process.env.CALERA_API_KEY && process.env.CALERA_API_KEY.trim()) return process.env.CALERA_API_KEY.trim();
  if (process.env.ICX_API_KEY && process.env.ICX_API_KEY.trim()) return process.env.ICX_API_KEY.trim();
  if (process.env.X_LICENSE_KEY && process.env.X_LICENSE_KEY.trim()) return process.env.X_LICENSE_KEY.trim();
  if (fs.existsSync(CALERA_ENV_FILE)) {
    try {
      const content = fs.readFileSync(CALERA_ENV_FILE, 'utf8');
      const match = content.match(/(?:FINSEC_LICENSE_KEY|ICX_API_KEY|ICX_LICENSE_KEY|CALERA_API_KEY)=([^\s#]+)/);
      if (match && match[1]) return match[1].trim();
    } catch (e) {}
  }
  const localEnv = path.join(process.cwd(), '.env');
  if (fs.existsSync(localEnv)) {
    try {
      const content = fs.readFileSync(localEnv, 'utf8');
      const match = content.match(/(?:FINSEC_LICENSE_KEY|ICX_API_KEY|ICX_LICENSE_KEY|CALERA_API_KEY)=([^\s#]+)/);
      if (match && match[1]) return match[1].trim();
    } catch (e) {}
  }
  return 'clabs_live_pilot_review';
}

import { fileURLToPath } from 'url';

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', async (line) => {
  if (!line.trim()) return;

  try {
    const payload = JSON.parse(line);
    const headers = {
      'Content-Type': 'application/json',
      'X-License-Key': resolveFinsecKey(),
      'MCP-Protocol-Version': '2026-07-28',
      'User-Agent': 'Calera-FINSEC-MCP-Node/1.2.2'
    };

    if (payload && payload.method) {
      headers['Mcp-Method'] = String(payload.method);
      if (payload.params && payload.params.name) {
        headers['Mcp-Name'] = String(payload.params.name);
      }
    }

    // Forward JSON-RPC request to Calera FINSEC endpoint
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    process.stdout.write(JSON.stringify(data) + '\n');
  } catch (err) {
    const errorResponse = {
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32603,
        message: 'Internal Gateway Error: ' + (err.message || String(err))
      }
    };
    process.stdout.write(JSON.stringify(errorResponse) + '\n');
  }
});
}

export { resolveFinsecKey, API_ENDPOINT };
