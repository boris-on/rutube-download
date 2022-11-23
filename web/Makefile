# 
# Configs setup
#------------------------------------------

run: conf-init put-exports front-run

conf-init:
	sh configs/config.sh

#------------------------------------------

debug: debug-conf-init put-exports front-run

debug-conf-init:
	sh configs/debug.sh

#------------------------------------------

put-exports:
	sh configs/export.sh

front-run:
	sh configs/server.sh

back-run:
	cd ../rutubeto-backend/cmd && go run main.go 

#------------------------------------------