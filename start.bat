@echo off
setlocal

set "PORT=3000"
set "URL=http://localhost:%PORT%"

echo Starting Bokhyllan on %URL%
echo.

start "" "%URL%"
npm.cmd run dev -- -p %PORT%

endlocal
