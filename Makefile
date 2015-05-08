PROJECT= "norris-nrti: "
MAKE= make --no-print-directory
JSHINT= ./node_modules/.bin/jshint
JSHINT_OPTS= --config .jshintrc

JS_FILES= $(shell find . -maxdepth 1 -name '*.js') $(shell find lib -name '*.js') $(shell find test -name '*.js')


default: test

test:
	@echo "$(PROJECT)Executing JSHint..."
	@$(JSHINT) $(JSHINT_OPTS) $(JS_FILES)
	istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage