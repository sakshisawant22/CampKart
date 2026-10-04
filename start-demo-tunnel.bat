@echo off
title CampusKart Live Demo & Cloudflare Tunnel Launcher
echo ==========================================================
echo        CampusKart - "Buy. Sell. Swap. Right on Campus."
echo               Starting Live Demo + Public Tunnel
echo ==========================================================
echo.
echo Starting Vite Development Server on http://localhost:5173 ...
start "CampusKart Vite Server" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Cloudflare Public Tunnel ...
start "Cloudflare Tunnel" cmd /k ""%USERPROFILE%\.gemini\antigravity\cloudflared.exe" tunnel --url http://localhost:5173"

echo.
echo ==========================================================
echo Both servers are now running in separate windows!
echo Check the Cloudflare Tunnel window for your public HTTPS URL.
echo ==========================================================
pause
