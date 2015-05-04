MAKE= make --no-print-directory

default: test

test:
	npm install -g jshint
	@$(MAKE) jshint
