#!/bin/bash
export NODE_OPTIONS="--tls-cipher-list=TLS_AES_128_GCM_SHA256,TLS_AES_256_GCM_SHA384,TLS_CHACHA20_POLY1305_SHA256"
npm install
NODE_ENV=production node index.js
