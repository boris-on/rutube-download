#!/bin/sh
# Server mode configs
#------------------------------------------

PRPL="\033[35m"
YLLW="\033[33m"
GRN="\033[32m"
DF="\033[0m"

N="\n     "
TP=const

SERVER_CONFIG_DIR=configs/config.js
CLIENT_CONFIG_DIR=routing/js/config.js

PROT=http://
if [ -n "$1" ]
    then
        HOST=$1
    else
        HOST=rutubeto.ru
fi
PORT=80

SHOST=0.0.0.0

BDPORT=8081

LINK=$PROT$HOST:$PORT
VQL=$LINK/video-quality-list?url=
DL=$LINK/download?url=

#------------------------------------------

echo "$PRPL\n[${YLLW}INIT_DEBUG_CONFIGS$PRPL]$DF"
echo "$TP PROT = '$PROT',$N SHOST = '$SHOST',$N HOST = '$HOST',$N PORT = $PORT;" > $SERVER_CONFIG_DIR
echo "$TP VQL = '$VQL',$N DL  = '$DL';" > $CLIENT_CONFIG_DIR
echo "$PRPL|\n+-->[${GRN}DEBUG_CONFIGS_INITED$PRPL]$DF\n"
