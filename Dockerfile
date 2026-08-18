FROM node:20-slim

WORKDIR /app

COPY package.json ./
COPY index.js ./

RUN chmod +x index.js

ENV FINSEC_MCP_URL=https://finsec.caleralabs.com/mcp
ENV FINSEC_LICENSE_KEY=clabs_live_pilot_review

ENTRYPOINT ["node", "index.js"]
