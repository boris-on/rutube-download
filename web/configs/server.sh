#!/bin/sh
# Run server script
#------------------------------------------

PRPL="\033[35m"
YLLW="\033[33m"
GRN="\033[32m"
DF="\033[0m"

FLSHNG="\033[5m"
STATIC="\033[25m"

#------------------------------------------

echo "$PRPL\n[${YLLW}INIT_SERVER$PRPL]$DF"
echo "$PRPL|\n+-->[$FLSHNG${GRN}SERVER_IS_RUNNING$STATIC$PRPL]\n|\n*$DF"

node server.js
