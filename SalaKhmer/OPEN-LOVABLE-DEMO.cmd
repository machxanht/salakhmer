@echo off
title SalaKhmer - Lovable UI Demo
cd /d "%~dp0.reference\khmer-blossom-path"
call npx.cmd wrangler dev --config .output\server\wrangler.json --port 8093 --ip 127.0.0.1 --local
