#!/bin/sh
# Debug mode configs
#------------------------------------------

PRPL="\033[35m"
YLLW="\033[33m"
GRN="\033[32m"
DF="\033[0m"

N="\n     "
TP=const

SERVER_CONFIG_DIR=configs/config.js
CLIENT_CONFIG_DIR=routing/js/config.js

DPROT=http://
if [ -n "$1" ]
    then
        DHOST=$1
    else
        DHOST=localhost
fi
DPORT=8080
BDPORT=8081

DLINK=$DPROT$DHOST:$BDPORT
DVQL=$DLINK/video-quality-list?url=
DDL=$DLINK/download?url=

#------------------------------------------

echo "$PRPL\n[${YLLW}INIT_DEBUG_CONFIGS$PRPL]$DF"
echo "$TP PROT = '$DPROT',$N SHOST = '$DHOST',$N HOST = '$DHOST',$N PORT = $DPORT;" > $SERVER_CONFIG_DIR
echo "$TP VQL = '$DVQL',$N DL  = '$DDL';" > $CLIENT_CONFIG_DIR
echo "$PRPL|\n+-->[${GRN}DEBUG_CONFIGS_INITED$PRPL]$DF\n"
