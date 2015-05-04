PROJECT= "norris-nrti: "
MAKE= make --no-print-directory
JSHINT= ./node_modules/.bin/jshint
JSHINT_OPTS= --config .jshintrc

JS_FILES= $(shell find . -maxdepth 1 -name '*.js') $(shell find lib -name '*.js') $(shell find test -name '*.js')


default: test

test:
	npm install -g jshint
	@$(MAKE) jshint

	
# Static analysis
jshint:
	@echo "$(PROJECT)Executing JSHint..."
	@$(JSHINT) $(JSHINT_OPTS) $(JS_FILES)