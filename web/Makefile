
BR=" "
N=\n$(BR)$(BR)$(BR)$(BR)$(BR)$(BR)
DN=\n\n
TP=const

PROT=http://
HOST=rutubeto.ru
PORT=80

SHOST=0.0.0.0

DPROT=http://
DHOST=localhost
DPORT=8080

BDPORT=8081

LINK=$(PROT)$(HOST):$(PORT)
VQL=$(LINK)/video-quality-list?url=
DL=$(LINK)/download?url=

DLINK=$(DPROT)$(DHOST):$(BDPORT)
DVQL=$(DLINK)/video-quality-list?url=
DDL=$(DLINK)/download?url=

#------------------------------------------

run: conf-init put-exports front-run

conf-init:
	echo "$(TP) PROT = '$(PROT)',$(N)BDPORT = $(BDPORT),$(N)SHOST = '$(SHOST)',$(N)HOST = '$(HOST)',$(N)PORT = $(PORT);$(DN)$(TP) LINK = '$(LINK)';" > ./config.js
	echo "$(TP) VQL = '$(VQL)',$(N)DL  = '$(DL)';" > routing/js/config.js

#------------------------------------------

debug: debug-conf-init put-exports front-run

debug-conf-init:
	echo "$(TP) PROT = '$(DPROT)',$(N)BDPORT = $(BDPORT),$(N)SHOST = '$(DHOST)',$(N)HOST = '$(DHOST)',$(N)PORT = $(DPORT);$(DN)$(TP) LINK = '$(DLINK)';" > ./config.js
	echo "$(TP) VQL = '$(DVQL)',$(N)DL  = '$(DDL)';" > routing/js/config.js

#------------------------------------------

put-exports:
	echo "\n\nexports.SHOST = SHOST;\nexports.BDPORT = BDPORT;\nexports.PROT = PROT;\nexports.HOST = HOST;\nexports.PORT = PORT;\nexports.LINK = LINK;" >> ./config.js
	echo "\n\nexport { VQL, DL };" >> routing/js/config.js

front-run:
	node server.js

back-run:
	cd ../rutubeto-backend/cmd && go run main.go 

#------------------------------------------