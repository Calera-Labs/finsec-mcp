# FINSEC — Certified SEC Memory MCP Server

[![MCP Registry](https://img.shields.io/badge/MCP-Registry_Indexed-blue.svg)](https://registry.modelcontextprotocol.io)
[![smithery badge](https://smithery.ai/badge/calera-labs/finsec)](https://smithery.ai/servers/calera-labs/finsec)
[![Glama MCP](https://glama.ai/mcp/servers/Calera-Labs/finsec-mcp/badge)](https://glama.ai/mcp/servers/Calera-Labs/finsec-mcp)
[![Glama MCP Score](https://glama.ai/mcp/servers/Calera-Labs/finsec-mcp/badges/score.svg)](https://glama.ai/mcp/servers/Calera-Labs/finsec-mcp)
[![License](https://img.shields.io/badge/License-Apache_2.0-green.svg)](LICENSE)
[![Facts](https://img.shields.io/badge/SEC_Facts-4.06M_Certified-emerald.svg)](https://finsec.caleralabs.com)
[![Zero Hallucination](https://img.shields.io/badge/Hallucination_Rate-0.00%25_(∂²=0)-purple.svg)](https://finsec.caleralabs.com)

Official **Model Context Protocol (MCP)** connector for **Calera Labs FINSEC**. Connects AI agents (Claude Desktop, Cursor, Zed, VS Code, and custom autonomous swarms) directly to **4.06M certified SEC EDGAR facts** powered by the **Calera Episteme-1 Engine**.

> **"Frontier Models Reason — The Calera Lattice Supplies Ground Truth."**

---

## ⚡ Key Guarantees

* **0.00% Statistical Hallucination:** Fact recall is deterministic and geometric ($A_4$ Pentatope lattice memory). No language model exists in the fact retrieval path.
* **2026-07-28 Stateless Protocol Core:** Fully compliant with the 2026-07-28 Stateless MCP Specification (SEP-2243, SEP-2575, SEP-2549) with sub-5ms zero-handshake direct tool calls and intelligent caching (`ttlMs: 86400000`).
* **Cryptographic Provenance:** Every returned financial metric includes exact SEC filing accessions, dates, concepts, and SHA-256 audit hashes.
* **Honest Refusal (`SAFE_REFUSAL`):** If a metric is not present in official SEC filings or is ambiguous, the engine returns an honest safe refusal rather than confabulating numbers.
* **Ultra-Low Latency & High Gross Margins:** Sub-25ms response serialization with low token footprint mode.

---

## 🚀 1-Click Quickstart Integrations

### 1. Cursor IDE

Add the following to your project's `.cursor/mcp.json` (or global Cursor Settings → Features → MCP):

```json
{
  "mcpServers": {
    "finsec": {
      "url": "https://finsec.caleralabs.com/mcp",
      "headers": {
        "X-License-Key": "clabs_live_YOUR_KEY"
      }
    }
  }
}
```
*(Get your free API key at [dashboard.caleralabs.com](https://dashboard.caleralabs.com))*

---

### 2. Claude Desktop

Add to your `claude_desktop_config.json`:
* **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
* **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
* **Linux:** `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "finsec": {
      "url": "https://finsec.caleralabs.com/mcp",
      "headers": {
        "X-License-Key": "clabs_live_YOUR_KEY"
      }
    }
  }
}
```

---

### 3. Smithery CLI (1-Click Terminal Command)

Install automatically across Claude or Cursor using Smithery ([smithery.ai/servers/calera-labs/finsec](https://smithery.ai/servers/calera-labs/finsec)):

```bash
# For Claude Desktop
npx -y @smithery/cli install financesec-mcp --client claude

# For Cursor
npx -y @smithery/cli install financesec-mcp --client cursor
```

---

### 4. Zed Editor

Add to `~/.config/zed/settings.json`:

```json
{
  "experimental.context_servers": {
    "finsec": {
      "command": {
        "url": "https://finsec.caleralabs.com/mcp",
        "headers": {
          "X-License-Key": "clabs_live_YOUR_KEY"
        }
      }
    }
  }
}
```

---

## 🛠️ Certified Tools Surface Area

The FINSEC MCP server exposes **7 certified tools**:

| Tool Name | Description |
|---|---|
| `query_financial_sec` | Natural-language query over 4.06M certified SEC EDGAR facts with provenance or honest `SAFE_REFUSAL`. |
| `valuation_inputs` | 12 Certified Valuation Packs (DCF inputs, FCF, Altman Z', Beneish M, DuPont 5-step, Piotroski F). |
| `query_sec_metric_exact` | Exact single-cell EDGAR metric recall for company + period + concept. |
| `compute_sec_cagr` | Exact compound annual growth rate (CAGR) calculation over verified SEC filing facts with zero confabulation. |
| `lattice_arith_evaluate` | Deterministic zero-error algebraic solver (`cagr`, `ratio`, `multiply`, `divide`, `yoy_series`, `product_chain`). |
| `vln_capabilities_overview` | Dynamic scope overview and capability boundaries. |
| `query_sec_sector_peers` | Multi-company sector & industry financial comparisons. |

---

## 💡 Example Queries for Your Agent

Once connected, simply ask your agent in plain English:

* *"What was Apple's FY2023 total revenue and gross margin in USD?"*
* *"Compare Microsoft and Alphabet Q3 2024 operating income."*
* *"Calculate Nvidia's 3-year revenue CAGR from FY2021 to FY2024."*
* *"Pull the DuPont 5-step analysis inputs for Tesla in 2023."*

---

## 🏎️ Low-Token Mode for High-QPS Agent Swarms

To eliminate context exhaustion in multi-turn reasoning agents, pass `"low_tokens": true` in your queries for a **71.7% token reduction**:

```json
{
  "id": "q112",
  "st": "OK",
  "val": 383285000000,
  "cur": "USD",
  "concept": "us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax",
  "per": "FY2023",
  "hash": "5ce23625"
}
```

---

## 🔑 Authentication & API Keys

Generate your free or enterprise API key on the **Universal Dashboard**:  
👉 **[https://dashboard.caleralabs.com](https://dashboard.caleralabs.com)**

---

## 🛡️ Security & Provenance Policy

* **No Language Model in the Fact Path:** All returned numbers originate from XBRL/EDGAR filing tables verified against SEC accessions.
* **IP Cloud Boundary:** Substrate algorithms and $A_4$ Pentatope lattice weights operate inside Calera Labs secure cloud runtimes. Public clients receive only verified outputs and schema responses.

---

## 💬 Customer Support & Immediate Slack Pipeline

Have a question, encountered an edge case, or need a quota increase for your team?

We have a 3-tier Slack customer response pipeline wired directly into our engineering and executive teams:

### 1. Directly in Your AI Assistant (Claude, Cursor, Zed, Cline)
Use the built-in MCP tool `submit_support_ticket`:
```json
{
  "title": "Need 50k req/min quota for quant backtesting cluster",
  "description": "We are running systematic macro backtests across 500 tickers simultaneously.",
  "inquiry_type": "quota_increase",
  "priority": "high",
  "contact_email": "quant-lead@firm.com"
}
```

### 2. Live Web Portal & Slack Escalation Center
Submit tickets, questions, or feature requests directly from the Universal Dashboard:
👉 **[https://dashboard.caleralabs.com/dashboard#customer_service](https://dashboard.caleralabs.com/dashboard#customer_service)**

### 3. Response SLAs
| Tier | Responder | SLA Guarantee |
| :--- | :--- | :--- |
| **Tier 1 (Normal)** | Customer Success Manager (`@manager_oncall`) | < 4 Hours |
| **Tier 2 (High / Quota)** | Operations Owner (`@owner_oncall`) | < 2 Hours |
| **Tier 3 (Critical / VIP)** | Founder & CEO Casey (`@casey`) | < 1 Hour |

---

## 🔗 Related Calera MCP Servers

* **[Calera Infinite Context (ICX) MCP](https://github.com/Calera-Labs/icx-mcp):** Persistent epistemic memory and sub-5ms associative recall on the Volumetric Lattice Network for AI agents ([Glama Hub](https://glama.ai/mcp/servers/Calera-Labs/icx-mcp) · [Smithery](https://smithery.ai/servers/calera-labs/icx-mcp)).

---

## 📄 License & Attribution

* Connector specification and client schemas are licensed under the [Apache-2.0 License](LICENSE).
* Powered by **Calera Episteme-1** / **Calera Labs** (DBA of Pyrotope Inc., Subsidiary of Calera Computing, Inc.).
