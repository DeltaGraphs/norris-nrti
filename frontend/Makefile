PROJECT= "Scaffold: "
REPORTS= reports
ROOT= $(shell pwd)

MAKE= make --no-print-directory
NPM= npm
BOWER= ./node_modules/.bin/bower

JSHINT= ./node_modules/.bin/jshint
JSHINT_CLIENT_OPTS= --config .jshintrc-client
JSHINT_SERVER_OPTS= --config .jshintrc-server

CR= ./node_modules/.bin/cr
CR_OPTS= 

PLATO= ./node_modules/.bin/plato
PLATO_OPTS= --title Scaffold

KARMA= ./node_modules/karma/bin/karma

JS_CLIENT_FILES= $(shell find app/scripts -name '*.js')
JS_SERVER_FILES= $(shell find . -maxdepth 1 -name '*.js') $(shell find test -name '*.js')
TEST_FILES= $(shell find test -name '*.js')


default: 
	pwd
	test

test:
	@echo "FRONTEND BUILDING..."
	pwd
	npm install
	# Static analysis
	### @$(MAKE) jshint-client
	##### jshint-client:
	@echo "$(PROJECT)Executing JSHint Client..."
	@$(JSHINT) $(JSHINT_CLIENT_OPTS) $(JS_CLIENT_FILES)
	### @$(MAKE) jshint-server
	##### jshint-server:
	@echo "$(PROJECT)Executing JSHint Server..."
	@$(JSHINT) $(JSHINT_SERVER_OPTS) $(JS_SERVER_FILES)
	# Unit test
	### @$(MAKE) karma
	##### karma:
	@echo "$(PROJECT)Executing Karma..."
	@$(KARMA) start
	#test-report:
	### @$(MAKE) jshint-client-report
	##### jshint-client-report:
	@echo "$(PROJECT)Executing JSHint Client Report..."
	-@$(JSHINT) --reporter checkstyle $(JSHINT_CLIENT_OPTS) $(JS_CLIENT_FILES) > $(REPORTS)/checkstyle-client-result.xml
	### @$(MAKE) jshint-server-report
	##### jshint-server-report:
	@echo "$(PROJECT)Executing JSHint Server Report..."
	-@$(JSHINT) --reporter checkstyle $(JSHINT_SERVER_OPTS) $(JS_SERVER_FILES) > $(REPORTS)/checkstyle-server-result.xml
	### @$(MAKE) plato-report
	##### plato-report:
	@echo "$(PROJECT)Executing Plato..."
	-@$(PLATO) $(PLATO_OPTS) -d $(REPORTS)/metrics $(JS_CLIENT_FILES) $(JS_SERVER_FILES)
	### @$(MAKE) complexity-report
	##### complexity-report:
	@echo "$(PROJECT)Executing Complexity Report..."
	-@$(CR) $(CR_OPTS) --format json --output $(REPORTS)/complexity-report.json --filepattern ".*\.js" app/scripts/
	-@$(CR) $(CR_OPTS) --format plain --output $(REPORTS)/complexity-report.txt --filepattern ".*\.js" app/scripts/
	### @$(MAKE) karma-report
	##### karma-report:
	@echo "$(PROJECT)Executing Karma..."
	-@$(KARMA) start