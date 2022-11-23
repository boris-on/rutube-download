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

debug-docker: debug-docker-conf-init put-exports front-run

debug-docker-conf-init:
	sh configs/debug.sh "0.0.0.0"
#------------------------------------------

put-exports:
	sh configs/export.sh

front-run:
	sh configs/server.sh

back-run:
	cd ../rutubeto-backend/cmd && go run main.go 

#------------------------------------------