PROJECT= "Frontend: "
REPORTS= ../gh-pages/reports-frontend
ROOT= $(shell pwd)

MAKE= make --no-print-directory

JSHINT= jshint
JSHINT_CLIENT_OPTS= --config .jshintrc-client
JSHINT_SERVER_OPTS= --config .jshintrc-server

CR= ./node_modules/.bin/cr
CR_OPTS= 

PLATO= ./node_modules/.bin/plato
PLATO_OPTS= --title Frontend

KARMA= karma

JS_CLIENT_FILES= $(shell find app/Model -name '*.js') $(shell find app/Controller -name '*.js') $(shell find app/View -name '*.js')
JS_SERVER_FILES= $(shell find . -maxdepth 1 -name '*.js') $(shell find test -name '*.js')
TEST_FILES= $(shell find test -name '*.js')


default:	test

test:
	pwd
	@$(MAKE) jshint-client
	@$(MAKE) jshint-server
	@$(MAKE) karma
	@$(MAKE) test-report

test-report:
	@$(MAKE) jshint-client-report
	@$(MAKE) jshint-server-report
	@$(MAKE) plato-report
	@$(MAKE) complexity-report
	@$(MAKE) karma-report


# Static analysis

jshint-client:
	@echo "$(PROJECT)Executing JSHint Client..."
	@$(JSHINT) $(JSHINT_CLIENT_OPTS) $(JS_CLIENT_FILES)

jshint-server:
	@echo "$(PROJECT)Executing JSHint Server..."
	@$(JSHINT) $(JSHINT_SERVER_OPTS) $(JS_SERVER_FILES)

jshint-client-report:
	@echo "$(PROJECT)Executing JSHint Client Report..."
	-@$(JSHINT) --reporter checkstyle $(JSHINT_CLIENT_OPTS) $(JS_CLIENT_FILES) > $(REPORTS)/checkstyle-client-result.xml

jshint-server-report:
	@echo "$(PROJECT)Executing JSHint Server Report..."
	-@$(JSHINT) --reporter checkstyle $(JSHINT_SERVER_OPTS) $(JS_SERVER_FILES) > $(REPORTS)/checkstyle-server-result.xml

plato-report:
	@echo "$(PROJECT)Executing Plato..."
	-@$(PLATO) $(PLATO_OPTS) -d $(REPORTS)/metrics $(JS_CLIENT_FILES) $(JS_SERVER_FILES)

complexity-report:
	@echo "$(PROJECT)Executing Complexity Report..."
	-@$(CR) $(CR_OPTS) --format json --output $(REPORTS)/complexity-report.json --excludepattern "bower_components" --filepattern ".*\.js" app/
	-@$(CR) $(CR_OPTS) --format plain --output $(REPORTS)/complexity-report.txt --excludepattern "bower_components" --filepattern ".*\.js" app/

# Unit test
karma:
	@echo "$(PROJECT)Executing Karma..."
	@$(KARMA) start
	pwd
	cp -r app ../app

karma-report:
	#@echo "$(PROJECT)Executing Karma..."
	#-@$(KARMA) start
