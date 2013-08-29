REPORTER = dot
MOCHA_PATH = ./node_modules/.bin/mocha

install:
	@npm install

test:
	@NODE_ENV=test $(MOCHA_PATH) \
		--reporter $(REPORTER)

test-w:
	@NODE_ENV=test $(MOCHA_PATH) \
		--reporter $(REPORTER) \
		--growl \
		--watch

.PHONY: install
.PHONY: test test-w
