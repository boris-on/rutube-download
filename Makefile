front-run:
	node front/server.js

checkpoint:
	git add .
	git commit -m "save changes"
	git push

front-save:
	git add front
	git commit -m "$(filter-out $@,$(MAKECMDGOALS))"
	git push

setup:
	export PATH=$PATH:/usr/local/go/bin