
COMMIT=save_changes

git-push:
	git add .
	git commit -m "$(COMMIT)"
	git push