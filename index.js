#!/usr/bin/env node
/**
 * Official Calera FINSEC MCP Gateway Client
 * Transparently bridges stdio JSON-RPC 2.0 to Calera Episteme-1 Cloud Run endpoint.
 */

import readline from 'readline';

const API_ENDPOINT = process.env.FINSEC_MCP_URL || 'https://finsec.caleralabs.com/mcp';
const LICENSE_KEY = process.env.FINSEC_LICENSE_KEY || process.env.X_LICENSE_KEY || 'clabs_live_pilot_review';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', async (line) => {
  if (!line.trim()) return;

  try {
    const payload = JSON.parse(line);
    
    // Forward JSON-RPC request to Calera FINSEC endpoint
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': LICENSE_KEY,
        'User-Agent': 'Calera-FINSEC-MCP-Node/1.2.1'
      },
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
