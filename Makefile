PROJECT= "norris-nrti: "
REPORTS= gh-pages/reports
ROOT= $(shell pwd)

MAKE= make --no-print-directory
NPM= npm

JSHINT= ./node_modules/.bin/jshint
JSHINT_OPTS= --config .jshintrc


PLATO= ./node_modules/.bin/plato
PLATO_OPTS= --jshint .jshintrc --title Norris-nrti

CR= ./node_modules/.bin/cr
CR_OPTS= 

MOCHA= ./node_modules/.bin/mocha
MOCHA_OPTS= --check-leaks --colors

ISTANBUL= ./node_modules/.bin/istanbul
ISTANBUL_INSTRUMENT_OPTS= --no-compact

JS_FILES= $(shell find . -maxdepth 1 -name '*.js') $(shell find lib -name '*.js') $(shell find test -name '*.js')
TEST_FILES= $(shell find test -name '*.js')
INSTRUMENTED_TEST_FILES= $(shell find $(REPORTS)/instrumented/test -name '*.js')


default: test

test:
	@$(MAKE) jshint
	@$(MAKE) mocha
	$(MAKE) test-report

test-report:
	@$(MAKE) jshint-report
	@$(MAKE) plato-report
	@$(MAKE) complexity-report
	@$(MAKE) mocha-report
	@$(MAKE) istanbul


# Static analysis
jshint:
	@echo "$(PROJECT)Executing JSHint..."
	@$(JSHINT) $(JSHINT_OPTS) $(JS_FILES)

jshint-report:
	@echo "$(PROJECT)Executing JSHint Report..."
	-@$(JSHINT) --reporter checkstyle $(JSHINT_OPTS) $(JS_FILES) > $(REPORTS)/checkstyle-result.xml

plato-report:
	@echo "$(PROJECT)Executing Plato..."
	-@$(PLATO) $(PLATO_OPTS) -d $(REPORTS)/metrics $(JS_FILES)

complexity-report:
	@echo "$(PROJECT)Executing Complexity Report..."
	-@$(CR) $(CR_OPTS) --format json --output $(REPORTS)/complexity-report.json --filepattern ".*\.js" lib/
	-@$(CR) $(CR_OPTS) --format plain --output $(REPORTS)/complexity-report.txt --filepattern ".*\.js" lib/

# Unit test
mocha:
	@echo "$(PROJECT)Executing Mocha..."
	./node_modules/istanbul/lib/cli.js cover ./node_modules/mocha/bin/_mocha -- -R spec $(MOCHA_OPTS) $(TEST_FILES)

mocha-report: istanbul-instrument
	@echo "$(PROJECT)Executing Mocha Report..."
	-@XUNIT_FILE=$(REPORTS)/test-result.xml NODE_ENV=development $(MOCHA) --reporter xunit-file $(MOCHA_OPTS) $(TEST_FILES)  > /dev/null

# Code coverage
istanbul: istanbul-instrument
	@echo "$(PROJECT)Executing Istanbul..."
	-@ISTANBUL_REPORTERS=html,text,text-summary $(MOCHA) --reporter mocha-istanbul $(MOCHA_OPTS) $(INSTRUMENTED_TEST_FILES)
	-@cp -T -r html-report $(REPORTS)/coverage
	-@rm -rf html-report

istanbul-instrument:
	@echo "$(PROJECT)Executing Istanbul Instrument..."
	@$(ISTANBUL) instrument $(ISTANBUL_INSTRUMENT_OPTS) --output $(REPORTS)/instrumented/lib lib
	@$(ISTANBUL) instrument $(ISTANBUL_INSTRUMENT_OPTS) --output $(REPORTS)/instrumented/index.js norris-nrti.js
	@cp -r test $(REPORTS)/instrumented/
	@cp package.json $(REPORTS)/instrumented/