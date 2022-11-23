#!/bin/sh
# Make configs exportable
#------------------------------------------

PRPL="\033[35m"
YLLW="\033[33m"
GRN="\033[32m"
DF="\033[0m"

SERVER_CONFIG_DIR=configs/config.js
CLIENT_CONFIG_DIR=routing/js/config.js

#------------------------------------------

echo "$PRPL\n[${YLLW}ADDING_CONFIGS_EXPORT$PRPL]$DF"
echo "\n\nexports.SHOST = SHOST;\nexports.PROT = PROT;\nexports.HOST = HOST;\nexports.PORT = PORT;" >> $SERVER_CONFIG_DIR
echo "\n\nexport { VQL, DL };" >> $CLIENT_CONFIG_DIR
echo "$PRPL|\n+-->[${GRN}ADDED_CONFIGS_EXPORT$PRPL]$DF\n"
