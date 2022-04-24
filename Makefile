front-run:
	node front/server.js

front-keep:
	git add front
	git commit -m "save changes"
	git push

front-save:
	git add front
	git commit -m "$(filter-out $@,$(MAKECMDGOALS))"
	git push