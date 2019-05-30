@echo off

http-server www 2>NUL
if not "%ERRORLEVEL%"=="0" (
   echo "Failed to start server. Please ensure you have http-server installed or try installing it: npm install -g http-server@latest"
)

