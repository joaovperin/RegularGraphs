#!/usr/bin/sh

http-server . 2>/dev/null
if [[ $? -ne 0 ]] ; then
    echo "Failed to start server. Please ensure you have http-server installed or try installing it: npm install -g http-server@latest"
fi

